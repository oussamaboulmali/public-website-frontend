"use client";
import { useState, useEffect } from "react";
import translations from "../../locales/translation";
import Icon from "@mdi/react";
import { mdiFacebook, mdiLinkedin, mdiYoutube } from "@mdi/js";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";

export default function Maintenance({ dir, envConfig }) {
  const [countdown, setCountdown] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const isRTL = dir === "rtl";
  const autoResetInterval = 3600000;

  // Fonction pour calculer le temps restant entre maintenant et endTime
  const calculateTimeRemaining = (endTime) => {
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  // Fonction pour réinitialiser le countdown
  const resetCountdown = () => {
    Cookies.remove("countdownEndTime");
    const now = new Date().getTime();
    const newEndTime = now + 1 * 60 * 60 * 1000;
    Cookies.set("countdownEndTime", newEndTime, {
      secure: true,
      sameSite: "Strict",
      expires: 1,
    });

    setCountdown({ hours: 1, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    // Vérifier si un cookie endTime existe déjà
    let endTime = Cookies.get("countdownEndTime");

    // Si le cookie n'existe pas, on crée une nouvelle date de fin
    if (!endTime) {
      const now = new Date().getTime();
      endTime =
        now +
        countdown?.hours * 60 * 60 * 1000 +
        countdown?.minutes * 60 * 1000 +
        countdown?.seconds * 1000;
      Cookies.set("countdownEndTime", endTime, {
        secure: true,
        sameSite: "Strict",
        expires: 1,
      });
    } else {
      endTime = parseInt(endTime);
      const remaining = calculateTimeRemaining(endTime);
      setCountdown(remaining);
    }

    const animationInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);

    // Décompte basé sur la date de fin
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(endTime);

      if (
        remaining?.hours === 0 &&
        remaining?.minutes === 0 &&
        remaining?.seconds === 0
      ) {
        // Quand le countdown atteint zéro, on réinitialise
        resetCountdown();
      } else {
        setCountdown(remaining);
      }
    }, 1000);

    // Créer un intervalle pour réinitialiser automatiquement le countdown
    const autoResetTimer = setInterval(() => {
      resetCountdown();
    }, autoResetInterval);

    return () => {
      clearInterval(animationInterval);
      clearInterval(timer);
      clearInterval(autoResetTimer);
    };
  }, [autoResetInterval]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-auto">
      <div
        className="flex items-center justify-center h-screen place-content-center bg-white px-4 relative z-50 "
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="w-full max-w-2xl px-6 py-10 text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#1D589F] mb-2 sm: mt-10">
              {translations.mainTitle}
            </h1>
            <p className="text-[#1D589FCC] text-xl">{translations.subtitle}</p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <p className="text-[#1D589F] mb-6">{translations.mainMessage}</p>

            {/* une petite illustration */}
            <div
              className="relative h-16 mb-8 w-full max-w-md mx-auto"
              dir={dir}
            >
              <div className="absolute w-full h-1.5 bg-[#1D589FCC] top-1/2 transform -translate-y-1/2"></div>

              {/* Connecteur gauche */}
              <div
                className={`absolute ${
                  !isRTL ? "left-0" : "right-0"
                } top-1/2 transform -translate-y-1/2 ${
                  isAnimating
                    ? isRTL
                      ? "-translate-x-10"
                      : "translate-x-10"
                    : "translate-x-0"
                } transition-transform duration-1000`}
              >
                <div className="flex items-center">
                  <div className="h-10 w-16 rounded-l-lg border-2 border-[#1D589F] bg-blue-200"></div>
                  <div className="h-14 w-5 rounded-r-sm border-2 border-[#1D589F] bg-blue-200 flex flex-col justify-center">
                    <div className="h-3 w-1 bg-[#1D589F] rounded-full mx-auto"></div>
                    <div className="h-3 w-1 bg-[#1D589F] rounded-full mx-auto mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Connecteur droit */}
              <div
                className={`absolute ${
                  !isRTL ? "right-0" : "left-0"
                }  top-1/2 transform -translate-y-1/2 ${
                  isAnimating
                    ? isRTL
                      ? "translate-x-10"
                      : "-translate-x-10"
                    : "translate-x-0"
                } transition-transform duration-1000`}
              >
                <div className="flex items-center">
                  <div className="h-14 w-5 rounded-l-sm border-2 border-[#1D589F] bg-blue-200 flex flex-col justify-center">
                    <div className="h-3 w-1 bg-[#1D589F] rounded-full mx-auto"></div>
                    <div className="h-3 w-1 bg-[#1D589F] rounded-full mx-auto mt-1"></div>
                  </div>
                  <div className="h-10 w-16 rounded-r-lg border-2 border-[#1D589F] bg-blue-200"></div>
                </div>
              </div>
            </div>

            {/* Compteur de décompte */}
            {/* <div className="text-center">
              <p className="text-[#1D589F] mb-2">
                {translations.countdownLabel}
              </p>
              <div className="flex justify-center gap-4">
                <div className="bg-[#1D589FCC] text-white rounded-lg p-2 w-16">
                  <div className="text-2xl font-bold">
                    {countdown?.hours?.toString().padStart(2, "0")
                      ? countdown?.hours?.toString().padStart(2, "0")
                      : "--"}
                  </div>
                  <div className="text-xs">{translations.hoursLabel}</div>
                </div>
                <div className="bg-[#1D589FCC] text-white rounded-lg p-2 w-16">
                  <div className="text-2xl font-bold">
                    {countdown?.minutes?.toString().padStart(2, "0")
                      ? countdown?.minutes?.toString().padStart(2, "0")
                      : "--"}
                  </div>
                  <div className="text-xs">{translations.minutesLabel}</div>
                </div>
                <div className="bg-[#1D589FCC] text-white rounded-lg p-2 w-16">
                  <div className="text-2xl font-bold">
                    {countdown?.seconds?.toString().padStart(2, "0")
                      ? countdown?.seconds?.toString().padStart(2, "0")
                      : "--"}
                  </div>
                  <div className="text-xs">{translations.secondsLabel}</div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Section d'informations de contact */}
          <div className="border-t border-gray-200 pt-6 max-w-lg mx-auto">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div
                className={`text-center ${
                  isRTL ? "md:text-right" : "md:text-left"
                }`}
              >
                <h3 className="font-medium text-gray-800 mb-1">
                  {translations.supportTitle}
                </h3>
                <p className="text-gray-600">
                  {translations.support + translations.contact}
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <h3 className="font-medium text-gray-800 mb-1">
                  {translations.followUsTitle}
                </h3>
                <div className={`flex justify-center md:justify-end space-x-4`}>
                  <Link
                    href={envConfig?.ApsX}
                    target="_blank"
                    className="flex justify-center items-center group"
                    style={{
                      "--icon-color": "#1D589FCC",
                      "--icon-hover-color": "#1e40af",
                    }}
                    prefetch={false}
                  >
                    <span className="sr-only">{translations.twitterLabel}</span>
                    <Image
                      src={`/${envConfig?.lang}/x-2.svg`}
                      alt="twitter"
                      width={17}
                      height={17}
                      className="h-[18px] transition-all duration-200"
                      style={{
                        filter: `
                        brightness(0) 
                        saturate(100%) 
                        invert(21%) 
                        sepia(95%) 
                        saturate(1352%) 
                        hue-rotate(195deg) 
                        brightness(91%) 
                        contrast(106%)
                      `,
                      }}
                    />
                  </Link>
                  <Link
                    href={envConfig?.ApsFb}
                    target="_blank"
                    className="text-[#1D589FCC] hover:text-blue-800"
                    prefetch={false}
                  >
                    <span className="sr-only">
                      {translations.facebookLabel}
                    </span>
                    <Icon path={mdiFacebook} size={1.5} />
                  </Link>
                  <Link
                    href={envConfig?.ApsYtb}
                    target="_blank"
                    className="text-[#1D589FCC] hover:text-blue-800"
                    prefetch={false}
                  >
                    <span className="sr-only">{translations.YoutubeLabel}</span>
                    <Icon path={mdiYoutube} size={1.5} />
                  </Link>
                  <Link
                    href={envConfig?.ApsLinkedIn}
                    target="_blank"
                    className="text-[#1D589FCC] hover:text-blue-800"
                    prefetch={false}
                  >
                    <span className="sr-only">
                      {translations.linkedinLabel}
                    </span>
                    <Icon path={mdiLinkedin} size={1.5} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500 mt-6">
            {translations.copyright.replace("{year}", new Date().getFullYear())}
          </div>
        </div>
      </div>
    </div>
  );
}
