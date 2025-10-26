"use client";
import Link from "next/link";
import Image from "next/image";
import translations from "../../locales/translation";
import { useState, useEffect, useRef } from "react";
import { mdiChevronLeft, mdiChevronRight, mdiTrendingNeutral } from "@mdi/js";
import Icon from "@mdi/react";
import ReadMore from "../ui/readMore";

const Dossier = ({ block, envConfig, dir }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  const desktopTimerRef = useRef(null);
  const mobileTimerRef = useRef(null);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(block?.length / itemsPerPage);

  // Navigation desktop
  const nextPage = () => {
    setCurrentPageIndex((prevIndex) =>
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPage = () => {
    setCurrentPageIndex((prevIndex) => {
      return prevIndex - 1 < 0 ? totalPages - 1 : prevIndex - 1;
    });
  };

  // Navigation mobile
  const nextMobileSlide = () => {
    setCurrentMobileIndex((prevIndex) =>
      prevIndex === block?.length - 1 ? 0 : prevIndex + 1
    );
  };

  /*  const prevMobileSlide = () => {
    setCurrentMobileIndex((prevIndex) => {
      return prevIndex - 1 < 0 ? block?.length - 1 : prevIndex - 1;
    });
  }; */

  // Défilement automatique desktop
  useEffect(() => {
    if (totalPages > 1) {
      desktopTimerRef.current = setInterval(() => {
        nextPage();
      }, 5000);
    }

    return () => {
      if (desktopTimerRef.current) {
        clearInterval(desktopTimerRef.current);
      }
    };
  }, [totalPages]);

  // Défilement automatique mobile
  useEffect(() => {
    if (block?.length > 1) {
      mobileTimerRef.current = setInterval(() => {
        nextMobileSlide();
      }, 5000);
    }

    return () => {
      if (mobileTimerRef.current) {
        clearInterval(mobileTimerRef.current);
      }
    };
  }, [block?.length]);

  // Réinitialiser le timer desktop quand on change manuellement
  const handleManualDesktopChange = (callback) => {
    if (desktopTimerRef.current) {
      clearInterval(desktopTimerRef.current);
    }
    callback();
    if (totalPages > 1) {
      desktopTimerRef.current = setInterval(() => {
        nextPage();
      }, 5000);
    }
  };

  // Réinitialiser le timer mobile quand on change manuellement
  const handleManualMobileChange = (callback) => {
    if (mobileTimerRef.current) {
      clearInterval(mobileTimerRef.current);
    }
    callback();
    if (block?.length > 1) {
      mobileTimerRef.current = setInterval(() => {
        nextMobileSlide();
      }, 5000);
    }
  };

  if (!block || block?.length <= 0) {
    return <div>Pas assez </div>;
  }

  return (
    <div>
      {/* Design desktop */}
      <div className="hidden w-[90%] 2xl:w-[80%] mx-auto h-fit md:block">
        <div className="relative w-full px-0">
          <div className="absolute bottom-0 left-0 w-full border-b-1 border-[#393939]" />

          <span className="relative z-10 inline-block text-[28px] font-bold text-[#00326A] border-b-3 border-[#00326A] pb-1">
            {translations?.dossier}
          </span>
        </div>

        <div className="relative w-[95%] mx-auto p-4 flex-col">
          <div className="overflow-hidden relative">
            {/*les fléshes de navigations slider*/}
            {totalPages > 1 && (
              <>
                <button
                  onClick={() => handleManualDesktopChange(prevPage)}
                  className={`absolute top-1/2 -translate-y-1/2 z-10 bg-gray-100 rounded-full p-2 shadow-md cursor-pointer ${
                    dir === "rtl" ? "right-0" : "left-0"
                  }`}
                  aria-label="Précédent"
                >
                  <Icon
                    path={dir === "rtl" ? mdiChevronRight : mdiChevronLeft}
                    size={1.5}
                    className="text-[#00326A]"
                  />
                </button>

                <button
                  onClick={() => handleManualDesktopChange(nextPage)}
                  className={`absolute top-1/2 -translate-y-1/2 z-10 bg-gray-100 rounded-full p-2 shadow-md cursor-pointer ${
                    dir === "rtl" ? "left-0" : "right-0"
                  }`}
                  aria-label="Suivant"
                >
                  <Icon
                    path={dir === "rtl" ? mdiChevronLeft : mdiChevronRight}
                    size={1.5}
                    className="text-[#00326A]"
                  />
                </button>
              </>
            )}

            {/* Contenu du slider */}
            <div
              className="transition-transform duration-500 ease-in-out flex"
              style={{
                transform:
                  dir === "rtl"
                    ? `translateX(${currentPageIndex * 100}%)`
                    : `translateX(-${currentPageIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={`page-${pageIndex}`}
                  className="w-full flex-shrink-0 flex gap-2 justify-center"
                >
                  {block
                    .slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage
                    )
                    .map((dossier, index) => (
                      <div
                        key={dossier.id_dossier || index}
                        className="w-[22%] flex-shrink-0"
                      >
                        <Link
                          href={`/dossier/${dossier.alias}`}
                          className="block"
                          prefetch={false}
                        >
                          <div className="relative h-80 overflow-hidden rounded-lg">
                            <Image
                              src={`/${envConfig?.lang}/api/image/${dossier.image.url}`}
                              alt={dossier.name}
                              width={300}
                              height={300}
                              className="w-full h-full  transition-transform hover:scale-105 duration-300"
                              loading="lazy"
                            />
                            <div
                              className="absolute bottom-0 left-0 right-0 p-6 "
                              style={{
                                background:
                                  "linear-gradient(0deg, #F8F9FA 65%, rgba(248, 249, 250, 0.98) 75%, rgba(248, 249, 250, 0.7) 86%, rgba(248, 249, 250, 0.04) 100%)",
                              }}
                            >
                              <h2 className="text-black text-base font-bold line-clamp-2 mb-1">
                                {dossier.name}
                              </h2>
                              <p className="text-gray-400 text-xs">
                                {dossier.formattedDate
                                  ?.split(" ")
                                  .slice(0, 4)
                                  .join(" ")}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    currentPageIndex === index
                      ? "w-6 bg-[#00326A]"
                      : "w-2 bg-gray-300"
                  }`}
                  onClick={() =>
                    handleManualDesktopChange(() => setCurrentPageIndex(index))
                  }
                  aria-label={`Aller à la page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        <ReadMore url={"/dossier"} dir={dir} changeDesign={true} />
      </div>

      {/* Design mobile */}
      <div className="block md:hidden">
        <div className="w-[94%] mx-auto bg-white p-2 rounded-[5px] shadow-lg flex flex-col space-y-4">
          <div className="relative w-full px-0">
            <div className="absolute bottom-0 left-0 w-full border-b-1 border-[#393939]" />

            <span className="relative z-10 inline-block text-[26px] font-bold text-[#00326A] border-b-3 border-[#00326A] pb-1">
              {translations?.dossier}
            </span>
          </div>

          {/* Slider */}
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-in-out flex"
              style={{
                transform:
                  dir === "rtl"
                    ? `translateX(${currentMobileIndex * 100}%)`
                    : `translateX(-${currentMobileIndex * 100}%)`,
              }}
            >
              {block.map((dossier, index) => (
                <div
                  key={dossier.id_dossier || index}
                  className="w-full flex-shrink-0"
                >
                  <Link
                    href={`/dossier/${dossier.alias}`}
                    className="block"
                    prefetch={false}
                  >
                    <div className="relative h-80 overflow-hidden rounded-lg">
                      <Image
                        src={`/${envConfig?.lang}/api/image/${dossier.image.url}`}
                        alt={dossier?.image?.description}
                        width={1200}
                        height={600}
                        className="w-full h-full  transition-transform hover:scale-105 duration-300"
                        loading="lazy"
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 p-6 "
                        style={{
                          background:
                            "linear-gradient(0deg, #F8F9FA 65%, rgba(248, 249, 250, 0.98) 75%, rgba(248, 249, 250, 0.7) 86%, rgba(248, 249, 250, 0.04) 100%)",
                        }}
                      >
                        <h2 className="text-black text-2xl font-bold line-clamp-2 mb-2">
                          {dossier.name}
                        </h2>
                        <p className="text-gray-400 text-sm">
                          {dossier.formattedDate
                            ?.split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs */}
          {block?.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {block?.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    currentMobileIndex === index
                      ? "w-6 bg-[#00326A]"
                      : "w-2 bg-gray-300"
                  }`}
                  onClick={() =>
                    handleManualMobileChange(() => setCurrentMobileIndex(index))
                  }
                  aria-label={`Aller au dossier ${index + 1}`}
                />
              ))}
            </div>
          )}
          {/*Boutton Voir Plus*/}
          <ReadMore url={"/dossier"} dir={dir} />
        </div>
      </div>
    </div>
  );
};

export default Dossier;
