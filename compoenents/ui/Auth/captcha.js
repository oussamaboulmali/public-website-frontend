"use client";
import { mdiRefresh, mdiShieldKey } from "@mdi/js";
import Icon from "@mdi/react";
import translations from "locales/translation";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

// Fonction pour générer un texte CAPTCHA plus simple et lisible
const generateCaptchaText = (length = 6) => {
  // Utiliser seulement des caractères facilement distinguables
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0123456789#@";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Fonctions pour générer des transformations aléatoires (réduites)
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomColor = () => {
  const colors = [
    "rgb(40, 40, 40)", // noir
    "rgb(60, 60, 60)", // gris foncé
    "rgb(80, 30, 30)", // rouge foncé
    "rgb(30, 60, 80)", // bleu foncé
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const COOKIE_EXPIRATION_MINUTES = 10;
const SESSION_STORAGE_KEY = "captcha_reset_count";
const SESSION_TIMESTAMP_KEY = "captcha_timestamp";

export default function Captcha({
  handleGetCaptchValue,
  compareCaseSensitive,
  onCaptchaError,
  OnClearCaptchaError,
}) {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [resetCount, setResetCount] = useState(0);
  const [error, setError] = useState(null);
  const [errorCaptcha, setErrorCaptcha] = useState(false);
  const maxResets = 10;
  const canvasRef = useRef(null);

  const generateNewCaptchaOnError = () => {
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptcha(newCaptcha);
  };

  // Exposer la fonction via callback au montage
  useEffect(() => {
    if (onCaptchaError) {
      generateNewCaptchaOnError();
      OnClearCaptchaError();
    }
  }, [onCaptchaError]);

  // Fonction pour dessiner le CAPTCHA avec moins de complexité
  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Fond clair
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillRect(0, 0, width, height);

    // Réduire le bruit de fond
    const noiseDensity = 0.03; // Réduit de 0.1 à 0.03
    const totalPixels = width * height * noiseDensity;

    for (let i = 0; i < totalPixels; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const gray = Math.floor(Math.random() * 100) + 150; // Plus clair
      ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, 0.3)`; // Plus transparent
      ctx.fillRect(x, y, 1, 1);
    }

    // Réduire les lignes de confusion
    for (let i = 0; i < 10; i++) {
      ctx.strokeStyle = `rgba(150, 150, 150, ${Math.random() * 0.3 + 0.8})`; // Plus transparent
      ctx.lineWidth = Math.random() * 2 + 1; // Plus fin
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Dessiner chaque caractère avec moins de distorsion
    const textLength = text.length;
    const charWidth = width / (textLength + 1);

    for (let i = 0; i < textLength; i++) {
      const char = text.charAt(i);

      // Position avec moins de variation
      const x = charWidth * (i + 0.5) + getRandomInt(-3, 3); // Réduit de -5,5 à -3,3
      const y = height / 2 + getRandomInt(-5, 5); // Réduit de -8,8 à -5,5

      // Rotation moins prononcée
      const rotation = getRandomInt(-15, 15) * (Math.PI / 180); // Réduit de -25,25 à -15,15

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Style de texte plus uniforme
      const fontSize = getRandomInt(24, 28); // Taille plus uniforme
      ctx.font = `bold ${fontSize}px Arial`; // Police unique et en gras
      ctx.fillStyle = getRandomColor();

      // Ombre légère pour tous les caractères
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 1;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      ctx.fillText(char, -fontSize / 4, fontSize / 3);
      ctx.restore();
    }

    // Réduire les formes distrayantes
    for (let i = 0; i < 2; i++) {
      ctx.beginPath();
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = getRandomInt(1, 3);

      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 180, 180, ${Math.random() * 0.1})`;
      ctx.fill();
    }
  };

  // Fonction hybride pour gérer les compteurs (cookies + sessionStorage)
  const getResetCount = () => {
    // Essayer d'abord les cookies
    const cookieCount = Cookies.get("restCount");
    const cookieTimestamp = Cookies.get("restCountTimestamp");

    // Si les cookies existent et ne sont pas expirés
    if (cookieCount && cookieTimestamp) {
      const timestampExpiry =
        parseInt(cookieTimestamp, 10) + COOKIE_EXPIRATION_MINUTES * 60 * 1000;
      if (Date.now() <= timestampExpiry) {
        return parseInt(cookieCount, 10);
      }
    }

    // Sinon, utiliser sessionStorage comme fallback
    const sessionCount = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const sessionTimestamp = sessionStorage.getItem(SESSION_TIMESTAMP_KEY);

    if (sessionCount && sessionTimestamp) {
      const timestampExpiry =
        parseInt(sessionTimestamp, 10) + COOKIE_EXPIRATION_MINUTES * 60 * 1000;
      if (Date.now() <= timestampExpiry) {
        return parseInt(sessionCount, 10);
      }
    }

    return 0;
  };

  const setResetCountStorage = (count) => {
    const timestamp = Date.now().toString();

    // Essayer de stocker dans les cookies
    try {
      Cookies.set("restCount", count.toString(), {
        path: "/",
        sameSite: "strict",
        secure: true,
      });
      Cookies.set("restCountTimestamp", timestamp, {
        path: "/",
        sameSite: "strict",
        secure: true,
      });
    } catch (e) {}

    // Toujours utiliser sessionStorage comme backup
    sessionStorage.setItem(SESSION_STORAGE_KEY, count.toString());
    sessionStorage.setItem(SESSION_TIMESTAMP_KEY, timestamp);
  };

  const clearResetCountStorage = () => {
    Cookies.remove("restCount");
    Cookies.remove("restCountTimestamp");
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_TIMESTAMP_KEY);
  };

  // Fonction pour vérifier si les données ont expiré
  const checkExpiration = () => {
    const cookieTimestamp = Cookies.get("restCountTimestamp");
    const sessionTimestamp = sessionStorage.getItem(SESSION_TIMESTAMP_KEY);

    const timestamp = cookieTimestamp || sessionTimestamp;

    if (!timestamp) return true;

    const timestampExpiry =
      parseInt(timestamp, 10) + COOKIE_EXPIRATION_MINUTES * 60 * 1000;
    return Date.now() > timestampExpiry;
  };

  // Génération du CAPTCHA au chargement initial
  useEffect(() => {
    if (checkExpiration()) {
      clearResetCountStorage();
      setResetCount(0);
      setError(null);
    }

    const initializeCaptcha = () => {
      const captcha = generateCaptchaText();
      setCaptchaText(captcha);

      const currentResetCount = getResetCount();
      setResetCount(currentResetCount);

      setTimeout(() => drawCaptcha(captcha), 50);
    };

    initializeCaptcha();
  }, []);

  // Surveiller périodiquement l'expiration
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (checkExpiration()) {
        clearResetCountStorage();
        setResetCount(0);
        setError(null);
      }
    }, 30000);

    return () => clearInterval(checkInterval);
  }, []);

  // Fonction pour réinitialiser le CAPTCHA
  const resetCaptcha = () => {
    if (checkExpiration()) {
      clearResetCountStorage();
      setResetCount(0);
      setError(null);
    }

    const currentResetCount = getResetCount();
    if (currentResetCount >= maxResets) {
      setError(translations?.captchAttempts);
      return;
    }

    const captcha = generateCaptchaText();
    setCaptchaText(captcha);
    setUserInput("");

    const newResetCount = currentResetCount + 1;
    setResetCountStorage(newResetCount);
    setResetCount(newResetCount);

    setTimeout(() => drawCaptcha(captcha), 50);
  };

  // Fonction de comparaison moins stricte
  const compareCaptchaText = (input, captcha) => {
    if (compareCaseSensitive) {
      return input === captcha;
    }

    // Comparaison insensible à la casse et suppression des espaces
    const normalizedInput = input.trim().toUpperCase();
    const normalizedCaptcha = captcha.trim().toUpperCase();

    // Tolérance pour quelques caractères similaires
    const similarChars = {
      0: "O",
      O: "0",
      1: "I",
      I: "1",
      2: "Z",
      Z: "2",
      5: "S",
      S: "5",
      6: "G",
      G: "6",
      8: "B",
      B: "8",
    };

    if (normalizedInput === normalizedCaptcha) {
      return true;
    }

    // Vérifier avec les caractères similaires
    let adjustedInput = normalizedInput;
    for (const [original, replacement] of Object.entries(similarChars)) {
      adjustedInput = adjustedInput.replace(
        new RegExp(original, "g"),
        replacement
      );
    }

    return adjustedInput === normalizedCaptcha;
  };

  // Vérifier la saisie contre le captcha
  const verifyCaptcha = () => {
    if (!compareCaptchaText(userInput, captchaText)) {
      setErrorCaptcha(true);
      // Générer un nouveau CAPTCHA après une erreur
      setTimeout(() => {
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
        setUserInput("");
        setTimeout(() => drawCaptcha(newCaptcha), 50);
      }, 1000); // Délai d'1 seconde pour que l'utilisateur voie l'erreur
    } else {
      setErrorCaptcha(false);
      handleGetCaptchValue(userInput, captchaText);
    }
  };

  const isBlocked = resetCount >= maxResets;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full max-w-[350px] flex flex-row items-center mx-auto">
        {/* Captcha canvas */}
        <div className="relative bg-gray-50 rounded-md overflow-hidden flex-1">
          <canvas
            ref={canvasRef}
            width="380"
            height="80"
            className="w-full h-20"
          />
          {/* Bouton de rafraîchissement - repositionné pour éviter de masquer le contenu */}
          <button
            onClick={resetCaptcha}
            className="absolute top-0.5 right-0.5 bg-white/80 hover:bg-white rounded p-1 transition-colors"
            aria-label="Rafraîchir le captcha"
            disabled={isBlocked}
          >
            <Icon
              path={mdiRefresh}
              size={0.8}
              className={`${
                isBlocked
                  ? "text-gray-400"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Champ de saisie */}
      <div className="relative w-full">
        {/* Icône à gauche */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <Icon path={mdiShieldKey} size={1} />
        </div>

        {/* Input captcha */}
        <input
          id="captchaInput"
          type="text"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            if (errorCaptcha) {
              setErrorCaptcha(false);
            }
          }}
          maxLength={6}
          onBlur={verifyCaptcha}
          disabled={isBlocked}
          className={`bg-gray-100 rounded-[5px] p-3 w-full pl-10 pr-10 placeholder-gray-500 text-black border border-gray-300 ${
            isBlocked ? "opacity-70 cursor-not-allowed" : ""
          } ${errorCaptcha ? "border-2 border-red-600" : "border-gray-300"}`}
          placeholder={translations?.captchaLabel}
        />
      </div>

      {/* Message d'erreur */}
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </div>
  );
}
