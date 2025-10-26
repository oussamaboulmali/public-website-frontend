"use client";
import { useEffect, useRef, useState } from "react";
import translations from "../../locales/translation";
import { mdiChevronLeft, mdiChevronRight, mdiImageMultiple } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import Link from "next/link";
import ReadMore from "../ui/readMore";

const Infographie_cahier = ({ block, block1, envConfig, dir }) => {
  const [tabActif, setTabActif] = useState(translations.infographie);
  const [currentPageIndexInfographie, setCurrentPageIndexInfographie] =
    useState(0);
  const [currentPageIndexCahier, setCurrentPageIndexCahier] = useState(0);
  const itemsPerPage = 4;
  const totalPagesInfographie = Math.ceil(block?.length / itemsPerPage);
  const totalPagesCahier = Math.ceil(block1?.length / itemsPerPage);
  const tabs = [
    { label: translations.infographie, icon: mdiChevronLeft },
    { label: translations.cahier, icon: mdiChevronRight },
  ];
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [currentCahierIndex, setCurrentCahierIndex] = useState(0);
  const autoplayDelay = 5000; // Délai en 5s

  // Refs pour les timers d'autoplay
  const desktopInfographieTimerRef = useRef(null);
  const desktopCahierTimerRef = useRef(null);
  const mobileTimerRef = useRef(null);
  const cahierTimerRef = useRef(null);

  // Obtenir le nombre total de pages actuel en fonction de l'onglet actif
  const getTotalPages = () => {
    return tabActif === translations.infographie
      ? totalPagesInfographie
      : totalPagesCahier;
  };

  // Obtenir l'index de page actuel en fonction de l'onglet actif
  const getCurrentPageIndex = () => {
    return tabActif === translations.infographie
      ? currentPageIndexInfographie
      : currentPageIndexCahier;
  };

  // Obtenir les données actuelles en fonction de l'onglet actif
  const getCurrentData = () => {
    return tabActif === translations.infographie ? block : block1;
  };

  // Calculer la page suivante
  const nextPage = () => {
    if (tabActif === translations.infographie) {
      return (currentPageIndexInfographie + 1) % totalPagesInfographie;
    } else {
      return (currentPageIndexCahier + 1) % totalPagesCahier;
    }
  };

  // Calculer la page précédente
  const prevPage = () => {
    if (tabActif === translations.infographie) {
      return (
        (currentPageIndexInfographie - 1 + totalPagesInfographie) %
        totalPagesInfographie
      );
    } else {
      return (currentPageIndexCahier - 1 + totalPagesCahier) % totalPagesCahier;
    }
  };

  // Fonction pour changer de page
  const handleManualDesktopChange = (newIndex) => {
    if (tabActif === translations.infographie) {
      if (typeof newIndex === "function") {
        setCurrentPageIndexInfographie(newIndex());
      } else {
        setCurrentPageIndexInfographie(newIndex);
      }
    } else {
      if (typeof newIndex === "function") {
        setCurrentPageIndexCahier(newIndex());
      } else {
        setCurrentPageIndexCahier(newIndex);
      }
    }
  };

  // Fonction pour avancer automatiquement au slide suivant
  const goToNextSlide = () => {
    handleManualDesktopChange(nextPage);
  };

  // Défilement automatique pour l'onglet actif
  useEffect(() => {
    // Nettoyer tout timer existant
    if (desktopInfographieTimerRef.current) {
      clearInterval(desktopInfographieTimerRef.current);
      desktopInfographieTimerRef.current = null;
    }

    if (desktopCahierTimerRef.current) {
      clearInterval(desktopCahierTimerRef.current);
      desktopCahierTimerRef.current = null;
    }

    // Démarrer le timer approprié en fonction de l'onglet actif
    if (tabActif === translations.infographie && totalPagesInfographie > 1) {
      desktopInfographieTimerRef.current = setInterval(
        goToNextSlide,
        autoplayDelay
      );
    } else if (tabActif === translations.cahier && totalPagesCahier > 1) {
      desktopCahierTimerRef.current = setInterval(goToNextSlide, autoplayDelay);
    }

    // Nettoyer les timers lors du démontage du composant
    return () => {
      if (desktopInfographieTimerRef.current) {
        clearInterval(desktopInfographieTimerRef.current);
      }
      if (desktopCahierTimerRef.current) {
        clearInterval(desktopCahierTimerRef.current);
      }
    };
  }, [
    tabActif,
    totalPagesInfographie,
    totalPagesCahier,
    currentPageIndexInfographie,
    currentPageIndexCahier,
  ]);

  // Navigation mobile vidéos
  const nextMobileSlide = () => {
    setCurrentMobileIndex((prevIndex) =>
      prevIndex === block?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigation mobile galeries
  const nextCahierSlide = () => {
    setCurrentCahierIndex((prevIndex) =>
      prevIndex === block1?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Gérer les clics manuels sur les indicateurs
  const handleManualMobileChange = (index, isInfograpgie = false) => {
    if (isInfograpgie) {
      setCurrentCahierIndex(index);
      startCahierTimer();
    } else {
      setCurrentMobileIndex(index);
      startInfographieTimer();
    }
  };

  // Réinitialiser et démarrer le timer vidéo
  const startInfographieTimer = () => {
    if (mobileTimerRef.current) {
      clearInterval(mobileTimerRef.current);
    }

    if (block?.length > 1) {
      mobileTimerRef.current = setInterval(() => {
        nextMobileSlide();
      }, 5000);
    }
  };

  // Réinitialiser et démarrer le timer galerie
  const startCahierTimer = () => {
    if (cahierTimerRef.current) {
      clearInterval(cahierTimerRef.current);
    }

    if (block1.length > 1) {
      cahierTimerRef.current = setInterval(() => {
        nextCahierSlide();
      }, 5000);
    }
  };

  // Initialiser les timers au chargement
  useEffect(() => {
    if (tabActif === translations.infographie) {
      startInfographieTimer();
    } else {
      startCahierTimer();
    }

    // Nettoyage des timers au démontage du composant
    return () => {
      if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
      if (cahierTimerRef.current) clearInterval(cahierTimerRef.current);
    };
  }, [tabActif]);

  return (
    <div>
      {/* Design desktop */}
      <div className="hidden  w-[90%] 2xl:w-[80%] mx-auto h-fit md:block">
        <div className="flex flex-col w-full">
          {/* Onglets de navigation */}
          <div className="flex justify-between items-end w-full border-b-2 border-gray-300/40">
            <div className="relative flex space-x-6 ">
              {tabs.map((tab) => (
                <button
                  key={tab?.label}
                  onClick={() => setTabActif(tab.label)}
                  className={`cursor-pointer relative z-10 text-[28px] font-bold pb-1 transition-colors duration-300 ${
                    tabActif === tab.label
                      ? "text-[#00326A] border-b-3 border-[#00326A]"
                      : "text-[#747474]"
                  }`}
                >
                  {tab?.label}
                </button>
              ))}
            </div>
            <div
              className={`flex  ${
                dir === "rtl" ? "flex-row-reverse space-x-reverse" : "flex-row"
              } space-x-4`}
            >
              {(dir === "rtl" ? [...tabs].reverse() : tabs).map((tab) => (
                <button
                  key={tab?.icon}
                  onClick={() => setTabActif(tab.label)}
                  className={`cursor-pointer relative z-10 transition-colors duration-300 ${
                    tabActif === tab.label ? "text-[#00326A]" : "text-[#747474]"
                  }`}
                >
                  <Icon
                    path={tab.icon}
                    size={1}
                    className={dir === "rtl" ? "transform scale-x-[-1]" : ""}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Contenu selon tab actif */}
          <div className="relative w-[95%] mx-auto p-4">
            <div className="overflow-hidden relative">
              {getTotalPages() > 1 && (
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

              {/* Slider */}
              <div className="overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-in-out flex"
                  style={{
                    transform:
                      dir === "rtl"
                        ? `translateX(${getCurrentPageIndex() * 100}%)`
                        : `translateX(-${getCurrentPageIndex() * 100}%)`,
                  }}
                >
                  {Array.from({ length: getTotalPages() }).map(
                    (_, pageIndex) => (
                      <div
                        key={`page-${pageIndex}`}
                        className="w-full flex-shrink-0 flex gap-2 justify-center"
                      >
                        {getCurrentData()
                          .slice(
                            pageIndex * itemsPerPage,
                            (pageIndex + 1) * itemsPerPage
                          )
                          .map((el, index) => (
                            <div
                              key={
                                tabActif === translations.infographie
                                  ? el.id_infographie || index
                                  : el.id_cahier || index
                              }
                              className="w-[22%] flex-shrink-0"
                            >
                              <Link
                                href={`${
                                  tabActif === translations.infographie
                                    ? "/infographie/" + el.alias
                                    : "/cahier-multimedia/" + el.alias
                                }`}
                                className="block"
                                prefetch={false}
                              >
                                <div className="relative h-80 overflow-hidden rounded-lg">
                                  <Image
                                    src={`/${envConfig?.lang}/api/image/${
                                      tabActif === translations.infographie
                                        ? el?.image?.url
                                        : el?.featuredImage?.url
                                    }`}
                                    alt={el.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                    loading="lazy"
                                  />
                                  <div
                                    className="absolute bottom-0 left-0 right-0 p-6"
                                    style={{
                                      background:
                                        "linear-gradient(0deg, #F8F9FA 65%, rgba(248, 249, 250, 0.98) 75%, rgba(248, 249, 250, 0.7) 86%, rgba(248, 249, 250, 0.04) 100%)",
                                    }}
                                  >
                                    <h2 className="text-black text-base font-bold line-clamp-2 mb-1">
                                      {el.name}
                                    </h2>
                                    <p className="text-gray-400 text-xs">
                                      {el.formattedDate
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
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Indicateurs */}
            {getTotalPages() > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: getTotalPages() }).map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      getCurrentPageIndex() === index
                        ? "w-6 bg-[#00326A]"
                        : "w-2 bg-gray-300"
                    }`}
                    onClick={() => {
                      if (tabActif === translations.infographie) {
                        setCurrentPageIndexInfographie(index);
                      } else {
                        setCurrentPageIndexCahier(index);
                      }
                    }}
                    aria-label={`Aller à la page ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <ReadMore
              url={
                tabActif === translations.cahier
                  ? "/cahier-multimedia/"
                  : "/infographie/"
              }
              dir={dir}
              changeDesign={true}
            />
          </div>
        </div>
      </div>

      {/* Design mobile */}
      <div className="block md:hidden">
        <div className="w-[94%] mx-auto bg-white p-2 rounded-[5px] shadow-lg flex flex-col space-y-4">
          {/* Onglets */}
          <div className="flex justify-between items-end w-full border-b-2 border-gray-300/40">
            <div className="relative flex space-x-6 ">
              {tabs.map((tab) => (
                <button
                  key={tab?.label}
                  onClick={() => setTabActif(tab.label)}
                  className={` relative z-10 text-[24px] font-bold pb-1 transition-colors duration-300 ${
                    tabActif === tab.label
                      ? "text-[#7DB0D5] border-b-3 border-[#7DB0D5]"
                      : "text-gray-800"
                  }`}
                >
                  {tab?.label}
                </button>
              ))}
            </div>
            <div
              className={`flex ${
                dir === "rtl" ? "flex-row-reverse" : ""
              } space-x-0`}
            >
              {(dir === "rtl" ? [...tabs].reverse() : tabs).map((tab) => (
                <button
                  key={tab?.icon}
                  onClick={() => setTabActif(tab.label)}
                  className={`relative z-10 transition-colors duration-300 ${
                    tabActif === tab.label ? "text-[#7DB0D5]" : "text-gray-400"
                  }`}
                >
                  <Icon
                    path={tab.icon}
                    size={1}
                    className={dir === "rtl" ? "transform scale-x-[-1]" : ""}
                  />
                </button>
              ))}
            </div>
          </div>
          {tabActif === translations.infographie ? (
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
                {block?.map((infographie, index) => (
                  <div
                    key={infographie.id_infographie || index}
                    className="w-full flex-shrink-0"
                  >
                    <div className="relative h-80 overflow-hidden rounded-lg">
                      <Image
                        src={`/${envConfig?.lang}/api/image/${infographie.image.url}`}
                        alt={
                          infographie?.image?.description || infographie.name
                        }
                        width={1200}
                        height={600}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
                          {infographie.name}
                        </h2>
                        <p className="text-gray-400 text-sm">
                          {infographie.formattedDate
                            ?.split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Affichage de la cahier avec slider
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out flex"
                style={{
                  transform:
                    dir === "rtl"
                      ? `translateX(${currentCahierIndex * 100}%)`
                      : `translateX(-${currentCahierIndex * 100}%)`,
                }}
              >
                {block1.map((cahier, index) => (
                  <Link
                    key={cahier.id_cahier || index}
                    href={`/cahier-multimedia/${cahier.alias}`}
                    className="w-full flex-shrink-0 block"
                    prefetch={false}
                  >
                    <div className="relative h-80 overflow-hidden rounded-lg">
                      <Image
                        src={`/${envConfig?.lang}/api/image/${cahier?.featuredImage?.url}`}
                        alt={cahier?.name || "Image"}
                        width={1200}
                        height={600}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        loading="lazy"
                      />

                      {/* Badge vignette galerie */}
                      {cahier?.count > 0 && (
                        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <Icon path={mdiImageMultiple} size={0.9} />
                          <span>{cahier.count}</span>
                        </div>
                      )}

                      <div
                        className="absolute bottom-0 left-0 right-0 p-6"
                        style={{
                          background:
                            "linear-gradient(0deg, #F8F9FA 65%, rgba(248, 249, 250, 0.98) 75%, rgba(248, 249, 250, 0.7) 86%, rgba(248, 249, 250, 0.04) 100%)",
                        }}
                      >
                        <h2 className="text-black text-2xl font-bold line-clamp-2 mb-2">
                          {cahier.name}
                        </h2>
                        <p className="text-gray-400 text-sm">
                          {cahier.formattedDate
                            ?.split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* Indicateurs pour les vidéos */}
          {tabActif === translations.infographie && block?.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {block?.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    currentMobileIndex === index
                      ? "w-6 bg-[#00326A]"
                      : "w-2 bg-gray-300"
                  }`}
                  onClick={() => handleManualMobileChange(index)}
                  aria-label={`Aller à la vidéo ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Indicateurs pour les galeries */}
          {tabActif === translations.cahier && block1?.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {block1?.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    currentCahierIndex === index
                      ? "w-6 bg-[#00326A]"
                      : "w-2 bg-gray-300"
                  }`}
                  onClick={() => handleManualMobileChange(index, true)}
                  aria-label={`Aller à la galerie ${index + 1}`}
                />
              ))}
            </div>
          )}
          <ReadMore
            url={
              tabActif === translations.cahier
                ? "/cahier-multimedia/"
                : "/infographie/"
            }
            dir={dir}
            changeDesign={false}
          />
        </div>
      </div>
    </div>
  );
};
export default Infographie_cahier;
