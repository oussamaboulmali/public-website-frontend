"use client";

import {
  useState,
  useEffect,
  useRef,
  useActionState,
  startTransition,
} from "react";
import { mdiCheck, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import translations from "../../../locales/translation";
import { loginOTPAction } from "src/app/actions/actions-server";
import { saveAuthCookie } from "src/app/actions/saveAuthCookie";
import { encryptData } from "utils/crypto";

const OTPLogin = ({ envConfig, onBackToLogin, userId }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes en secondes
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);
  const formOtpRef = useRef(null);
  const [stateOtp, formActionOtp] = useActionState(loginOTPAction, null);
  const [stateSaveCookie, SaveCookieAction] = useActionState(
    saveAuthCookie,
    null
  );

  // Effet pour le minuteur
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Rediriger vers le formulaire de login après expiration
          onBackToLogin();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onBackToLogin]);

  // Formatage du temps restant
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Pourcentage de temps écoulé pour la barre de progression
  const timePercentage = (timeLeft / (10 * 60)) * 100;

  // Gestion du focus automatique sur les champs OTP
  useEffect(() => {
    inputRefs.current[activeOtpIndex]?.focus();
  }, [activeOtpIndex]);

  // Gestion de la saisie OTP
  const handleChange = (e, index) => {
    const { value } = e.target;

    // N'accepter que les chiffres
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Remplacer le caractère ou le vider
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);

    // Si une valeur est entrée et qu'on n'est pas au dernier champ, passer au champ suivant
    if (value && index < 5) {
      setActiveOtpIndex(index + 1);
    }
  };

  // Coller un code OTP complet
  /*  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Vérifier si le contenu collé est numérique et de longueur appropriée
    if (/^\d+$/.test(pastedData) && pastedData.length === 6) {
      const digits = pastedData.split("");
      setOtp(digits);
      setActiveOtpIndex(5);
    }
  }; */

  useEffect(() => {
    if (stateSaveCookie && stateSaveCookie?.success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000); // un delay de 3 secondes
    }
  }, [stateSaveCookie]);

  useEffect(() => {
    if (stateOtp?.error) {
      setIsVerifying(false);
      setError(translations?.errorOtp);
    }
  }, [stateOtp]);

  useEffect(() => {
    if (stateOtp?.data?.success) {
      setIsVerifying(false);
      setIsVerified(true);
      const storedArray = [
        { islogged: "true" },
        { username: stateOtp.data.data?.username },
        {
          subscriber:
            stateOtp.data.data?.userFirstName +
            " " +
            stateOtp.data.data?.userLastName,
        },
      ];
      sessionStorage?.setItem("aorm", encryptData(JSON.stringify(storedArray)));

      const formData = new FormData();
      if (stateOtp?.cookies) {
        formData.append(envConfig.cookiesName, stateOtp.cookies);

        startTransition(() => {
          saveAuthCookie(formData);
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [stateOtp]);

  // Vérification du code OTP
  const verifyOtp = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setError("");
    setIsVerifying(true);

    const form = formOtpRef.current;
    const formData = new FormData(form);
    const otpValues = [];
    // Vérifie la direction (rtl ou ltr)
    const dir = document?.documentElement?.dir || "ltr";

    if (dir === "rtl") {
      // Lecture de droite à gauche : otp5 -> otp0
      for (let i = 5; i >= 0; i--) {
        otpValues.push(formData.get(`otp${i}`) || "");
      }
    } else {
      // Lecture normale : otp0 -> otp5
      for (let i = 0; i < 6; i++) {
        otpValues.push(formData.get(`otp${i}`) || "");
      }
    }

    const otpJoined = otpValues.join("");

    formData.append("otpKey", otpJoined);
    formData.append("userId", parseInt(userId));

    for (let i = 0; i < 6; i++) {
      formData.delete(`otp${i}`);
    }

    startTransition(() => {
      formActionOtp(formData);
    });
  };

  return (
    <div className="w-1/2 p-8 flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-2 text-center text-black">
        {translations?.otpTitle}
      </h1>

      <p className="text-[17px] font-normal mb-8 text-center text-gray-500">
        {translations?.otpDescription}
      </p>

      {/* Minuteur avec barre de progression */}
      <div className="mb-6 w-[75%] mx-auto">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-medium text-gray-700">
            {translations?.timeRemaining}
          </p>
          <p
            className={`text-sm font-medium ${
              timeLeft < 60 ? "text-red-500" : "text-gray-700"
            }`}
          >
            {formatTime(timeLeft)}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              timeLeft < 60
                ? "bg-red-500"
                : timeLeft < 3 * 60
                ? "bg-amber-500"
                : "bg-blue-600"
            }`}
            style={{ width: `${timePercentage}%` }}
          />
        </div>
      </div>

      {/* Champs OTP */}
      <form
        onSubmit={verifyOtp}
        ref={formOtpRef}
        className="flex flex-col gap-5 w-[75%] mx-auto"
      >
        {/* Champs OTP */}
        <div className="flex justify-center gap-2 md:gap-4 mb-4 text-black">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="tel"
              maxLength={1}
              name={`otp${index}`} // <-- nécessaire pour que FormData capture chaque chiffre
              defaultValue={digit}
              onChange={(e) => handleChange(e, index)}
              //onPaste={index === 0 ? handlePaste : null}
              onFocus={() => setActiveOtpIndex(index)}
              className={`w-12 h-14 text-center text-xl font-bold rounded-md 
          ${
            activeOtpIndex === index
              ? "border-2 border-blue-600"
              : "border border-gray-300"
          }
          bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-blue-600
          transition-all`}
            />
          ))}
        </div>

        {/* Bouton de vérification */}
        <button
          type="submit"
          disabled={otp.some((digit) => digit === "")}
          className={`btn w-full text-white bg-[#1D589F] hover:bg-[#1D589F]/80 border-[#1D589F]
      ${
        otp.some((digit) => digit === "") ? "opacity-70 cursor-not-allowed" : ""
      }
      transition-all duration-300`}
        >
          {isVerifying ? (
            <>
              <Icon
                path={mdiLoading}
                size={1}
                className={`text-white animate-spin`}
              />
              {translations?.verifying}
            </>
          ) : isVerified ? (
            <span className="flex items-center justify-center">
              <Icon path={mdiCheck} size={0.8} className="mr-2" />
              {translations?.verified}
            </span>
          ) : (
            translations?.verifyOtp
          )}
        </button>
        <button
          type="button"
          onClick={onBackToLogin}
          className="btn w-full text-[#1D589F] bg-white hover:bg-gray-100 border border-[#1D589F] transition-all duration-300 mt-2"
        >
          {translations?.resendOtp}
        </button>
        {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default OTPLogin;
