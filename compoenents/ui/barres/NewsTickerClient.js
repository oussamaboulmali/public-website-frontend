"use client";
import { useState, useEffect, useRef } from "react";
import translations from "../../../locales/translation";
import { mdiChevronLeft, mdiChevronRight, mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import News_Feed from "./news-feed";
import Link from "next/link";

export default function NewsTickerWrapper({
  dir,
  envConfig,
  initialEmergencies,
}) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [emergencies] = useState(initialEmergencies || []);
  const [currentEmergencyIndex, setCurrentEmergencyIndex] = useState(0);
  const [showEmergencies, setShowEmergencies] = useState(
    initialEmergencies?.length > 0
  );
  const [isLoading, setIsLoading] = useState(initialEmergencies?.length === 0);
  const tickerRef = useRef(null);

  // Animation pour le défilement vertical
  useEffect(() => {
    if (!isAnimating) return;

    const emergencyInterval =
      emergencies.length > 0
        ? setInterval(() => {
            setCurrentEmergencyIndex((prev) => (prev + 1) % emergencies.length);
          }, 5000)
        : null;

    return () => {
      if (emergencyInterval) clearInterval(emergencyInterval);
    };
  }, [isAnimating, emergencies.length]);

  const handleMouseEnter = () => setIsAnimating(false);
  const handleMouseLeave = () => setIsAnimating(true);

  const handleCloseEmergencies = () => {
    setShowEmergencies(false);
    setIsLoading(true);
  };

  return (
    <>
      {emergencies.length > 0 && showEmergencies ? (
        <div
          className="fixed bottom-0 left-0 w-full bg-red-600 text-black shadow-lg z-[9999] h-[50px] 2xl:h-[68px]"
          dir={dir}
        >
          <div className={`h-full flex  flex-row `}>
            {/* Label URGENCE */}
            <div className="flex-shrink-0 text-[15px] md:text-[24px] text-white font-bold flex flex-row items-center gap-2 xl:gap-3 px-3 xl:px-4 bg-red-600 z-10">
              <span>
                {initialEmergencies[0]?.type
                  ? translations?.urgence
                  : translations?.important}
              </span>
              <Icon
                path={dir === "rtl" ? mdiChevronLeft : mdiChevronRight}
                size={1.2}
                className="xl:w-6 xl:h-6"
              />
            </div>

            {/* Contenu défilant */}
            <div className="flex-1 overflow-hidden relative h-full">
              <style jsx>{`
                @keyframes scroll-rtl {
                  0% {
                    transform: translateX(-100%);
                  }
                  100% {
                    transform: translateX(100%);
                  }
                }
                @keyframes scroll-ltr {
                  0% {
                    transform: translateX(100%);
                  }
                  100% {
                    transform: translateX(0%);
                  }
                }
                .scroll-container {
                  animation: ${dir === "rtl" ? "scroll-rtl" : "scroll-ltr"}
                    ${emergencies.length * 10}s linear infinite;
                }
                .scroll-container:hover {
                  animation-play-state: paused;
                }
              `}</style>

              <div className="scroll-container h-full flex items-center whitespace-nowrap">
                {emergencies.map((item, index) => (
                  <Link
                    key={index}
                    href={
                      item?.url
                        ? `${item?.click_url?.replace(/^\/+/, "")}`
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                    className="inline-flex items-center text-white h-full px-4  transition-colors"
                  >
                    <span className="text-base xl:text-lg font-semibold">
                      {item.title}
                    </span>
                    <span className="inline-block w-6"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bouton fermer (toujours à la fin) */}
            <div
              className="flex-shrink-0 flex items-center px-3 cursor-pointer"
              onClick={handleCloseEmergencies}
            >
              <Icon
                path={mdiClose}
                size={1}
                className="text-white hover:text-gray-400 transition-colors"
              />
            </div>
          </div>
        </div>
      ) : (
        isLoading && (
          <News_Feed
            dir={dir}
            envConfig={envConfig}
            shouldReplaceBanner={false}
          />
        )
      )}
    </>
  );
}
