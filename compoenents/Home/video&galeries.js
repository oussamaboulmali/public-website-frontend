"use client";
import { useEffect, useRef, useState } from "react";
import translations from "../../locales/translation";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiClockTimeEight,
  mdiImageMultiple,
} from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import Link from "next/link";
import ReadMore from "../ui/readMore";

const Video_Galerie = ({ block, block1, envConfig, dir }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingMobile, setIsPlayingMobile] = useState(
    Array(block?.length || 0).fill(false)
  ); // Tableau pour suivre l'état de lecture de chaque vidéo en mode mobile
  const [selectedVideo, setSelectedVideo] = useState(block?.[0] || null);
  const [selectedGallery, setSelectedGallery] = useState(block1?.[0] || null);
  const [tabActif, setTabActif] = useState(translations.video);
  const [youtubeId, setYoutubeId] = useState(null);
  const [youtubeIds, setYoutubeIds] = useState(
    Array(block?.length || 0).fill(null)
  );
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const mobileTimerRef = useRef(null);
  const galleryTimerRef = useRef(null);

  const tabs = [
    { label: translations.video, icon: mdiChevronLeft },
    { label: translations.galerie, icon: mdiChevronRight },
  ];

  // Extraire l'ID de la vidéo YouTube à partir du lien
  const getYoutubeVideoId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleThumbnailClick = () => {
    if (selectedVideo?.lien_video) {
      const id = getYoutubeVideoId(selectedVideo?.lien_video);
      setYoutubeId(id);
      setIsPlaying(true);
    }
  };

  // Navigation mobile vidéos
  const nextMobileSlide = () => {
    setCurrentMobileIndex((prevIndex) =>
      prevIndex === block?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigation mobile galeries
  const nextGallerySlide = () => {
    setCurrentGalleryIndex((prevIndex) =>
      prevIndex === block1?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Réinitialiser et démarrer le timer vidéo
  const startVideoTimer = () => {
    if (mobileTimerRef.current) {
      clearInterval(mobileTimerRef.current);
    }

    if (block?.length > 1) {
      mobileTimerRef.current = setInterval(() => {
        if (!isPlayingMobile.some((playing) => playing)) {
          nextMobileSlide();
        }
      }, 5000);
    }
  };

  // Réinitialiser et démarrer le timer galerie
  const startGalleryTimer = () => {
    if (galleryTimerRef.current) {
      clearInterval(galleryTimerRef.current);
    }

    if (block1?.length > 1) {
      galleryTimerRef.current = setInterval(() => {
        nextGallerySlide();
      }, 5000);
    }
  };

  // Initialiser les timers au chargement
  useEffect(() => {
    if (tabActif === translations.video) {
      startVideoTimer();
    } else {
      startGalleryTimer();
    }

    // Nettoyage des timers au démontage du composant
    return () => {
      if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
      if (galleryTimerRef.current) clearInterval(galleryTimerRef.current);
    };
  }, []);

  // Gérer les changements d'onglets
  useEffect(() => {
    // Arrêter tous les timers
    if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
    if (galleryTimerRef.current) clearInterval(galleryTimerRef.current);

    // Démarrer le timer approprié selon l'onglet actif
    if (tabActif === translations.video) {
      startVideoTimer();
    } else {
      startGalleryTimer();
    }
  }, [tabActif]);

  // Surveiller les changements dans isPlayingMobile
  useEffect(() => {
    if (tabActif === translations.video) {
      // Si une vidéo est en lecture, arrêter le timer
      if (isPlayingMobile.some((playing) => playing)) {
        if (mobileTimerRef.current) {
          clearInterval(mobileTimerRef.current);
        }
      } else {
        // Sinon, redémarrer le timer
        startVideoTimer();
      }
    }
  }, [isPlayingMobile, tabActif]);

  // Gérer les clics manuels sur les indicateurs
  const handleManualMobileChange = (index, isGallery = false) => {
    if (isGallery) {
      setCurrentGalleryIndex(index);
      startGalleryTimer();
    } else {
      setCurrentMobileIndex(index);
      if (!isPlayingMobile.some((playing) => playing)) {
        startVideoTimer();
      }
    }
  };

  // Gérer le clic sur une miniature vidéo en mobile
  const handleThumbnailClickMobile = (index) => {
    const selected = block?.[index];
    if (selected?.lien_video) {
      const id = getYoutubeVideoId(selected?.lien_video);

      // Mettre à jour le tableau de YouTube IDs
      const newYoutubeIds = [...youtubeIds];
      newYoutubeIds[index] = id;
      setYoutubeIds(newYoutubeIds);

      // Mettre à jour l'état de lecture pour cette vidéo spécifique
      const newIsPlayingMobile = [...isPlayingMobile];
      newIsPlayingMobile[index] = true;
      setIsPlayingMobile(newIsPlayingMobile);

      // Arrêter le carrousel automatique quand une vidéo est en lecture
      if (mobileTimerRef.current) {
        clearInterval(mobileTimerRef.current);
      }
    }
  };

  // Définir la galerie sélectionnée pour l'affichage desktop
  useEffect(() => {
    if (block1 && block1?.length > 0) {
      setSelectedGallery(block1[0]);
    }
  }, [block1]);

  return (
    <div>
      {/* Design desktop */}
      <div className="hidden w-full min-h-screen  bg-[#2F3648] items-center text-white p-6 m-auto md:block ">
        <div className="w-[90%] 2xl:w-[80%] mx-auto pt-6 ">
          {/* Onglets */}
          <div className="flex justify-between items-end w-full border-b-2 border-gray-300/40">
            <div className="relative flex space-x-6 ">
              {tabs.map((tab) => (
                <button
                  key={tab?.label}
                  onClick={() => setTabActif(tab.label)}
                  className={`relative z-10 text-[28px] font-bold pb-1 transition-colors duration-300 cursor-pointer ${
                    tabActif === tab.label
                      ? "text-[#7DB0D5] border-b-3 border-[#7DB0D5]"
                      : "text-white"
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
                  className={`cursor-pointer relative z-10 transition-colors duration-300  ${
                    tabActif === tab.label ? "text-[#7DB0D5]" : "text-white"
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

          {/* Contenu des tabs */}
          <div className="p-6">
            {tabActif === translations.video ? (
              <div className="flex flex-col space-y-6">
                {/*  Vidéo principale à jouer */}
                <div className="w-full h-[350px] 2xl:h-[450px] relative">
                  <div className="w-full h-full grid grid-cols-[55%_40%] gap-8">
                    <div className=" h-full relative">
                      {!isPlaying ? (
                        <div
                          className="w-full h-full relative cursor-pointer"
                          onClick={handleThumbnailClick}
                        >
                          <div className="absolute inset-0 flex items-center justify-center transition-all">
                            <div className="absolute inset-0">
                              <Image
                                src={
                                  "/" +
                                  envConfig?.lang +
                                  "/api/image/" +
                                  selectedVideo?.image?.url
                                }
                                alt={selectedVideo?.name || "image"}
                                fill
                                loading="lazy"
                              />
                            </div>

                            {/* Bouton de lecture */}
                            <div className="w-16 h-16 rounded-full bg-[#003979] flex items-center justify-center z-10">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="w-12 h-12"
                                style={{ marginLeft: "2px" }}
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                            title={selectedVideo?.name || "Vidéo sélectionnée"}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            frameBorder="5"
                          />
                        </div>
                      )}
                    </div>

                    {/* infos video*/}
                    <div className="flex flex-col space-y-4">
                      <h2 className="text-xl font-bold text-white ">
                        {selectedVideo?.name}
                      </h2>
                      <p className="text-gray-300 text-sm">
                        {selectedVideo?.description ||
                          "Aucune description disponible"}
                      </p>

                      {selectedVideo?.formattedDate && (
                        <div className="flex gap-2 items-center text-gray-400">
                          <Icon path={mdiClockTimeEight} size={0.9} />
                          <p className="text-sm">
                            {selectedVideo?.formattedDate
                              ?.split(" ")
                              .slice(0, 4)
                              .join(" ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Les 4 vidéos */}
                <div className="w-full grid grid-cols-4 gap-2 overflow-x-hidden">
                  {block?.map((video, index) => (
                    <div
                      key={index}
                      className={`h-50 2xl:h-60 relative cursor-pointer flex-shrink-0 rounded-[5px] ${
                        selectedVideo?.id_video === video.id_video
                          ? "border-3 border-[#0B53A3] "
                          : "border-1 border-gray-800"
                      }`}
                      onClick={() => {
                        setSelectedVideo(video);
                        setYoutubeId(getYoutubeVideoId(video.lien_video));
                        setIsPlaying(false);
                      }}
                    >
                      {/* Miniature de la vidéo */}
                      <div className="absolute inset-0">
                        <Image
                          src={
                            "/" +
                            envConfig?.lang +
                            "/api/image/" +
                            video?.image?.url
                          }
                          alt={video.name || `Vidéo ${index + 1}`}
                          fill
                          loading="lazy"
                        />
                      </div>

                      {/* Icône play plus petite pour les miniatures */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#003979]/70 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-5 h-5"
                            style={{ marginLeft: "1px" }}
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="h-[660px] flex gap-4">
                  {/* Image principale */}
                  <Link
                    href={`/galeries-photos/${block1[0]?.alias}`}
                    className="w-[70%] h-full block"
                    prefetch={false}
                  >
                    <div className="relative h-full rounded-[5px] overflow-hidden group">
                      <Image
                        src={
                          "/" +
                          envConfig?.lang +
                          "/api/image/" +
                          block1[0]?.image?.url
                        }
                        alt={block1?.[0]?.name || "Image"}
                        fill
                        className=" rounded-xl z-0 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Badge vignette galerie */}
                      {block1?.[0]?.count > 0 && (
                        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <Icon path={mdiImageMultiple} size={0.9} />
                          <span>{block1[0]?.count}</span>
                        </div>
                      )}

                      {/* Contenu en bas avec dégradé */}
                      <div
                        className="absolute bottom-0 left-0 right-0 p-6 z-10"
                        style={{
                          background: `
        linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.9) 0%,
          rgba(0, 0, 0, 0.6) 40%,
          rgba(0, 0, 0, 0.3) 70%,
          rgba(0, 0, 0, 0) 100%
        )
      `,
                        }}
                      >
                        <h2 className="text-white text-2xl font-bold line-clamp-2 mb-2">
                          {block1[0]?.name}
                        </h2>
                        <div className="flex gap-2 items-center text-gray-300">
                          <Icon path={mdiClockTimeEight} size={0.9} />
                          <p className="text-sm">
                            {block1[0]?.formattedDate
                              ?.split(" ")
                              .slice(0, 4)
                              .join(" ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Les 3 autres images */}
                  <div className="w-[30%] h-full flex flex-col gap-4">
                    {block1?.slice(1).map((gallerie, index) => (
                      <Link
                        key={gallerie.id_home_gallery || index}
                        href={`/galeries-photos/${gallerie?.alias}`}
                        className="relative flex-1 rounded-lg overflow-hidden group"
                        prefetch={false}
                      >
                        <div className="relative w-full h-full min-h-[120px]">
                          <Image
                            src={
                              "/" +
                              envConfig?.lang +
                              "/api/image/" +
                              gallerie?.image?.url
                            }
                            alt={gallerie?.name || "Image"}
                            fill
                            className=" group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {/* Badge vignette galerie */}
                          {gallerie?.count > 0 && (
                            <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                              <Icon path={mdiImageMultiple} size={0.9} />
                              <span>{gallerie?.count}</span>
                            </div>
                          )}

                          <div
                            className="absolute bottom-0 left-0 right-0 p-6"
                            style={{
                              background: `
            linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.9) 0%,
              rgba(0, 0, 0, 0.6) 40%,
              rgba(0, 0, 0, 0.3) 70%,
              rgba(0, 0, 0, 0) 100%
            )
          `,
                            }}
                          >
                            <h2 className="text-white text-[16px] font-bold line-clamp-2 mb-2">
                              {gallerie?.name}
                            </h2>
                            <div className="flex gap-2 text-gray-300 items-center">
                              <Icon path={mdiClockTimeEight} size={0.8} />
                              <p className="text-[12px]">
                                {gallerie?.formattedDate
                                  ?.split(" ")
                                  .slice(0, 4)
                                  .join(" ")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <ReadMore
            url={
              tabActif === translations.video ? "/video" : "/galeries-photos"
            }
            dir={dir}
            changeDesign={false}
          />
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
                  className={`relative z-10 text-[24px] font-bold pb-1 transition-colors duration-300 ${
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

          {/*contenu*/}
          {tabActif === translations.video ? (
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
                {block?.map((video, index) => (
                  <div
                    key={video.id_video || index}
                    className="w-full flex-shrink-0"
                  >
                    {!isPlayingMobile[index] ? (
                      <div
                        className="relative h-80 overflow-hidden rounded-lg"
                        onClick={() => handleThumbnailClickMobile(index)}
                      >
                        <Image
                          src={`/${envConfig?.lang}/api/image/${video?.image?.url}`}
                          alt={video?.image?.description || video?.name}
                          width={1200}
                          height={600}
                          className="w-full h-full  transition-transform hover:scale-105 duration-300"
                          loading="lazy"
                        />
                        {/* Bouton de lecture - maintenant correctement positionné */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-[#003979] flex items-center justify-center z-10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="white"
                              className="w-12 h-12"
                              style={{ marginLeft: "2px" }}
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>

                        <div
                          className="absolute bottom-0 left-0 right-0 p-6 "
                          style={{
                            background:
                              "linear-gradient(0deg, #F8F9FA 65%, rgba(248, 249, 250, 0.98) 75%, rgba(248, 249, 250, 0.7) 86%, rgba(248, 249, 250, 0.04) 100%)",
                          }}
                        >
                          <h2 className="text-black text-2xl font-bold line-clamp-2 mb-2">
                            {video.name}
                          </h2>
                          <p className="text-gray-400 text-sm">
                            {video.formattedDate
                              ?.split(" ")
                              .slice(0, 4)
                              .join(" ")}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-80 bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeIds[index]}?autoplay=1`}
                          title={video?.name || "Vidéo sélectionnée"}
                          className="w-full h-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          frameBorder="0"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Affichage de la galerie avec slider
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out flex"
                style={{
                  transform:
                    dir === "rtl"
                      ? `translateX(${currentGalleryIndex * 100}%)`
                      : `translateX(-${currentGalleryIndex * 100}%)`,
                }}
              >
                {block1?.map((gallery, index) => (
                  <Link
                    key={gallery?.id_home_gallery || index}
                    href={`/galeries-photos/${gallery?.alias}`}
                    className="w-full flex-shrink-0 block"
                    prefetch={false}
                  >
                    <div className="relative h-80 overflow-hidden rounded-lg">
                      <Image
                        src={`/${envConfig?.lang}/api/image/${gallery?.image?.url}`}
                        alt={gallery?.name || "Image"}
                        width={1200}
                        height={600}
                        className="w-full h-full transition-transform hover:scale-105 duration-300"
                        loading="lazy"
                      />

                      {/* Badge vignette galerie */}
                      {gallery?.count > 0 && (
                        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <Icon path={mdiImageMultiple} size={0.9} />
                          <span>{gallery?.count}</span>
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
                          {gallery?.name}
                        </h2>
                        <p className="text-gray-400 text-sm">
                          {gallery?.formattedDate
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
          {tabActif === translations.video && block?.length > 1 && (
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
          {tabActif === translations.galerie && block1?.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {block1?.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    currentGalleryIndex === index
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
              tabActif === translations.video ? "/video" : "/galeries-photos"
            }
            dir={dir}
            changeDesign={false}
          />
        </div>
      </div>
    </div>
  );
};
export default Video_Galerie;
