"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight, mdiClose } from "@mdi/js";

const Post_Galerie = ({ block, envConfig, dir }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const desktopTimerRef = useRef(null);
  const mobileTimerRef = useRef(null);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(block?.images?.length / itemsPerPage);

  // Navigation desktop
  const nextPage = () => {
    setCurrentPageIndex((prevIndex) =>
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigation mobile
  const nextMobileSlide = () => {
    setCurrentMobileIndex((prevIndex) =>
      prevIndex === block?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigation dans le modal
  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === block?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? block?.images?.length - 1 : prevIndex - 1
    );
  };

  // Fonction pour ouvrir le dialog
  const openImageDialog = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsDialogOpen(true);
    // Pause les timers quand le dialog est ouvert
    if (desktopTimerRef.current) clearInterval(desktopTimerRef.current);
    if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
  };

  // Fonction pour fermer le dialog
  const closeImageDialog = () => {
    setIsDialogOpen(false);
    setSelectedImageIndex(null);
    // Redémarre les timers après fermeture du dialog
    restartTimers();
  };

  // Fonction pour redémarrer les timers
  const restartTimers = () => {
    if (totalPages > 1) {
      desktopTimerRef.current = setInterval(() => {
        nextPage();
      }, 5000);
    }
    if (block?.images?.length > 1) {
      mobileTimerRef.current = setInterval(() => {
        nextMobileSlide();
      }, 5000);
    }
  };

  // Défilement automatique desktop
  useEffect(() => {
    if (totalPages > 1 && !isDialogOpen) {
      desktopTimerRef.current = setInterval(() => {
        nextPage();
      }, 5000);
    }

    return () => {
      if (desktopTimerRef.current) {
        clearInterval(desktopTimerRef.current);
      }
    };
  }, [totalPages, isDialogOpen]);

  // Défilement automatique mobile
  useEffect(() => {
    if (block?.images?.length > 1 && !isDialogOpen) {
      mobileTimerRef.current = setInterval(() => {
        nextMobileSlide();
      }, 5000);
    }

    return () => {
      if (mobileTimerRef.current) {
        clearInterval(mobileTimerRef.current);
      }
    };
  }, [block?.images?.length, isDialogOpen]);

  // Réinitialiser le timer desktop quand on change manuellement
  const handleManualDesktopChange = (callback) => {
    if (desktopTimerRef.current) {
      clearInterval(desktopTimerRef.current);
    }
    callback();
    if (totalPages > 1 && !isDialogOpen) {
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
    if (block?.images?.length > 1 && !isDialogOpen) {
      mobileTimerRef.current = setInterval(() => {
        nextMobileSlide();
      }, 5000);
    }
  };

  // Gérer les touches du clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isDialogOpen) return;

      switch (e.key) {
        case "Escape":
          closeImageDialog();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextImage();
          break;
      }
    };

    if (isDialogOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Empêcher le scroll du body quand le dialog est ouvert
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isDialogOpen]);

  // Fonction utilitaire pour obtenir l'index global d'une image
  const getGlobalImageIndex = (pageIndex, localIndex) => {
    return pageIndex * itemsPerPage + localIndex;
  };

  return (
    <div>
      {/* Design desktop */}
      <div className="hidden md:block w-full">
        <article className="flex flex-col space-y-2 w-full md:max-w-[1800px] mx-auto bg-white p-2 sm:p-4">
          <div className="relative w-[95%] mx-auto p-4">
            <div className="overflow-hidden relative">
              {totalPages > 1 && (
                <>
                  <button
                    onClick={() =>
                      handleManualDesktopChange(() =>
                        setCurrentPageIndex(
                          currentPageIndex === 0
                            ? totalPages - 1
                            : currentPageIndex - 1
                        )
                      )
                    }
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
                    onClick={() =>
                      handleManualDesktopChange(() =>
                        setCurrentPageIndex(
                          currentPageIndex === totalPages - 1
                            ? 0
                            : currentPageIndex + 1
                        )
                      )
                    }
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
                        ? `translateX(${currentPageIndex * 100}%)`
                        : `translateX(-${currentPageIndex * 100}%)`,
                  }}
                >
                  {Array.from({ length: totalPages }).map((_, pageIndex) => {
                    const imagesOnPage = block?.images?.slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage
                    );

                    const justifyClass =
                      imagesOnPage?.length < 4
                        ? "justify-start"
                        : "justify-center";

                    return (
                      <div
                        key={`page-${pageIndex}`}
                        className={`w-full flex-shrink-0 flex gap-2 ${justifyClass}`}
                      >
                        {imagesOnPage?.map((image, localIndex) => {
                          const globalIndex = getGlobalImageIndex(
                            pageIndex,
                            localIndex
                          );
                          return (
                            <div
                              key={localIndex}
                              className="md:w-[22%] w-full flex-shrink-0"
                            >
                              <div
                                className="relative h-70 2xl:h-80 overflow-hidden rounded-lg cursor-pointer"
                                onClick={() => openImageDialog(globalIndex)}
                              >
                                <Image
                                  src={`/${envConfig?.lang}/api/image/${image.url}`}
                                  alt={block.name || block?.description}
                                  width={800}
                                  height={600}
                                  className="w-full h-full transition-transform hover:scale-105 duration-300"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
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
                    onClick={() => setCurrentPageIndex(index)}
                    aria-label={`Aller à la page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </article>
      </div>

      {/* Design mobile */}
      <div className="block md:hidden">
        <div className="overflow-hidden relative group">
          {/* Boutons de navigation mobile */}
          {block?.images?.length > 1 && (
            <>
              <button
                onClick={() =>
                  handleManualMobileChange(() =>
                    setCurrentMobileIndex(
                      currentMobileIndex === 0
                        ? block?.images?.length - 1
                        : currentMobileIndex - 1
                    )
                  )
                }
                className={`absolute top-1/2 -translate-y-1/2 z-10 bg-gray-100 rounded-full p-2 shadow-md cursor-pointer ${
                  dir === "rtl" ? "right-2" : "left-2"
                }`}
                aria-label="Image précédente"
              >
                <Icon
                  path={dir === "rtl" ? mdiChevronRight : mdiChevronLeft}
                  size={1.5}
                  className="text-[#00326A]"
                />
              </button>
              <button
                onClick={() =>
                  handleManualMobileChange(() =>
                    setCurrentMobileIndex(
                      currentMobileIndex === block?.images?.length - 1
                        ? 0
                        : currentMobileIndex + 1
                    )
                  )
                }
                className={`absolute top-1/2 -translate-y-1/2 z-10 bg-gray-100 rounded-full p-2 shadow-md cursor-pointer ${
                  dir === "rtl" ? "left-2" : "right-2"
                }`}
                aria-label="Image suivante"
              >
                <Icon
                  path={dir === "rtl" ? mdiChevronLeft : mdiChevronRight}
                  size={1.5}
                  className="text-[#00326A]"
                />
              </button>
            </>
          )}

          <div
            className="transition-transform duration-500 ease-in-out flex"
            style={{
              transform:
                dir === "rtl"
                  ? `translateX(${currentMobileIndex * 100}%)`
                  : `translateX(-${currentMobileIndex * 100}%)`,
            }}
          >
            {block?.images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div
                  className="relative h-70 2xl:h-80 overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openImageDialog(index)}
                >
                  <Image
                    src={`/${envConfig?.lang}/api/image/${image.url}`}
                    alt={block?.name || block?.description}
                    width={1200}
                    height={600}
                    className="w-full h-full transition-transform hover:scale-105 duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicateurs mobile */}
        {block?.images?.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {block?.images?.map((_, index) => (
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
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal pour afficher les images en grand */}
      {isDialogOpen &&
        selectedImageIndex !== null &&
        block?.images?.[selectedImageIndex] && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 z-2222250 flex items-center justify-center p-4"
            onClick={closeImageDialog}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
              {/* Bouton fermer */}
              <button
                onClick={closeImageDialog}
                className="absolute top-4 right-4 bg-white/50 bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 z-10 transition-all"
                aria-label="Fermer"
              >
                <Icon path={mdiClose} size={1.5} className="text-black" />
              </button>

              {/* Navigation précédente */}
              {block?.images?.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className={`absolute top-1/2 -translate-y-1/2 bg-white/50 bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 z-10 transition-all ${
                    dir === "rtl" ? "right-4" : "left-4"
                  }`}
                  aria-label="Image précédente"
                >
                  <Icon
                    path={dir === "rtl" ? mdiChevronRight : mdiChevronLeft}
                    size={1.5}
                    className="text-black"
                  />
                </button>
              )}

              {/* Navigation suivante */}
              {block?.images?.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className={`absolute top-1/2 -translate-y-1/2 bg-white/50 bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 z-10 transition-all ${
                    dir === "rtl" ? "left-4" : "right-4"
                  }`}
                  aria-label="Image suivante"
                >
                  <Icon
                    path={dir === "rtl" ? mdiChevronLeft : mdiChevronRight}
                    size={1.5}
                    className="text-black"
                  />
                </button>
              )}

              {/* Image principale */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={`/${envConfig?.lang}/api/image/${block?.images?.[selectedImageIndex]?.url}`}
                  alt={block?.name || block?.description}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  loading="lazy"
                />

                {/* Compteur d'images */}
                {block?.images?.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1} / {block?.images?.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Post_Galerie;
