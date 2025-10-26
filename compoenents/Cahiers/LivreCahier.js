"use Client";
import { useState, useEffect } from "react";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiBookOpen,
  mdiClose,
  mdiArrowExpandAll,
  mdiBookOpenPageVariant,
  mdiBookOpenPageVariantOutline,
  mdiMagnifyMinusOutline,
  mdiMagnifyPlusOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import ImageWithFallback from "compoenents/ui/imagewithFallback";
import translations from "locales/translation";

export default function LivreCahier({ cahier, envConfig, dir }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState("next");
  const [zoomLevel, setZoomLevel] = useState(1);

  // Effet de keyboard pour naviguer avec les flèches
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowLeft") {
        if (currentPageIndex > 0 && !isTransitioning) {
          goToPreviousPage();
        }
      } else if (e.key === "ArrowRight") {
        if (currentPageIndex < totalPages - 1 && !isTransitioning) {
          goToNextPage();
        }
      } else if (e.key === "Escape") {
        closeBook();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPageIndex, isTransitioning]);

  const hasImage = cahier?.featuredImage?.url;
  const imageUrl = hasImage
    ? "/" + envConfig?.lang + "/api/image/" + cahier?.featuredImage?.url
    : "";

  // Si pas de cahier, on affiche un placeholder
  if (!cahier) {
    return (
      <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center">
        <Icon
          path={mdiBookOpenPageVariant}
          size={2}
          className="text-blue-300 mx-auto mb-4"
        />
        <p>Cahier non disponible</p>
      </div>
    );
  }

  // On crée un tableau avec toutes les images, en mettant la couverture en premier
  /* const allImages = [
    {
      url: cahier.featuredImage?.url || "",
      description:
        cahier.featuredImage?.description || cahier.title || "Couverture",
    },
    ...(cahier.images || []).map((img) => ({
      url: img.url || "",
      description: img.description || "Page du cahier",
    })),
  ]; */
  const allImages = cahier?.images;
  const totalPages = allImages.length;
  const currentImage = allImages[currentPageIndex];

  const goToPreviousPage = () => {
    if (currentPageIndex > 0 && !isTransitioning) {
      setTransitionDirection("prev");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPageIndex((prev) => prev - 1);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 150);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1 && !isTransitioning) {
      setTransitionDirection("next");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPageIndex((prev) => prev + 1);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 150);
    }
  };

  const openBook = () => {
    setIsOpen(true);
    setCurrentPageIndex(0);
    setZoomLevel(1);
  };

  const closeBook = () => {
    setIsOpen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Style dynamique pour l'animation de page
  const pageStyle = {
    transition: "all 0.5s ease-in-out",

    opacity: isTransitioning ? 0.7 : 1,
    transform: `scale(${zoomLevel})`,
  };

  // Gestion du zoom
  const zoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.25);
    }
  };

  const zoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.25);
    }
  };

  return (
    <div className="relative">
      {/* Aperçu du cahier (visible quand la popup est fermée) */}
      <div className="relative">
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-8 flex justify-center  shadow-lg overflow-hidden">
          <div className="relative transform hover:scale-105 transition-transform duration-300 shadow-xl">
            <ImageWithFallback
              src={imageUrl}
              alt={cahier}
              className="h-64 w-auto rounded"
              lang={envConfig?.lang}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded flex items-end justify-center">
              <div className="p-4 text-white text-center">
                <p className="font-bold">{cahier.name}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={openBook}
          className="absolute top-0 md:top-3 right-3 bg-[#1D589F] text-white rounded-full p-2 shadow-lg flex gap-2 cursor-pointer items-center transform transition hover:scale-105 hover:bg-[#1D589F]"
        >
          <Icon path={mdiBookOpenPageVariantOutline} size={1} />
          <span className="hidden md:block ml-1 mr-1 text-sm">
            {translations?.browse}
          </span>
        </button>
      </div>

      {/* Popup de livre */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 bg-opacity-80 overflow-hidden">
          <div
            className={`h-fit bg-gradient-to-b from-gray-50 to-gray-100 rounded-[2px] overflow-hidden transition-all duration-300 ${
              isFullscreen
                ? "w-full h-full rounded-none"
                : "w-4/5 max-w-4xl mx-4"
            }`}
          >
            {/* Barre supérieure */}
            <div className="bg-[#1D589F] text-white px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              {/* Titre + numéro de page */}
              <div className="hidden md:flex items-center gap-2 flex-wrap">
                <Icon path={mdiBookOpenPageVariantOutline} size={1} />
                <h3 className="font-medium truncate max-w-[140px] sm:max-w-none">
                  {cahier.name}
                </h3>
                {isFullscreen && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full flex items-center justify-center">
                    {currentPageIndex + 1}/{totalPages}
                  </span>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="flex items-center flex-wrap gap-1 justify-end">
                <button
                  onClick={zoomOut}
                  disabled={zoomLevel <= 0.5}
                  className={`p-1.5 ${
                    zoomLevel <= 0.5 ? "opacity-50" : "hover:bg-white/10"
                  } rounded-full transition-colors`}
                  title={translations.zoomOut}
                >
                  <Icon path={mdiMagnifyMinusOutline} size={0.8} />
                </button>

                <div className="text-xs">{zoomLevel * 100 + "%"}</div>

                <button
                  onClick={zoomIn}
                  disabled={zoomLevel >= 2}
                  className={`p-1.5 ${
                    zoomLevel >= 2 ? "opacity-50" : "hover:bg-white/10"
                  } rounded-full transition-colors`}
                  title={translations.zoomIn}
                >
                  <Icon path={mdiMagnifyPlusOutline} size={0.8} />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1 hover:bg-blue-800/30 rounded-full transition-colors"
                  title="Plein écran"
                >
                  <Icon path={mdiArrowExpandAll} size={0.8} />
                </button>

                <button
                  onClick={closeBook}
                  className="p-1 hover:bg-blue-800/30 rounded-full transition-colors"
                  title="Fermer"
                >
                  <Icon path={mdiClose} size={0.8} />
                </button>
              </div>
            </div>

            {/* Contenu du livre */}
            <div className={`flex flex-col ${isFullscreen ? "h-full" : ""}`}>
              {/* Zone de l'image */}
              <div
                className={`flex-grow relative ${
                  isFullscreen ? "overflow-auto" : "max-h-[70vh] overflow-auto"
                }`}
              >
                {/* Boutons de navigation flottants sur les côtés */}
                <div className="absolute inset-y-0 left-0 flex items-center z-10">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPageIndex === 0 || isTransitioning}
                    className={`h-full px-4 flex items-center justify-center ${
                      currentPageIndex === 0 || isTransitioning
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-blue-600 "
                    } transition-colors`}
                  >
                    <div className="bg-white/80 p-2 rounded-full shadow-lg">
                      <Icon path={mdiChevronLeft} size={1} />
                    </div>
                  </button>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                  <button
                    onClick={goToNextPage}
                    disabled={
                      currentPageIndex === totalPages - 1 || isTransitioning
                    }
                    className={`h-full px-4 flex items-center justify-center ${
                      currentPageIndex === totalPages - 1 || isTransitioning
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-blue-600 "
                    } transition-colors`}
                  >
                    <div className="bg-white/80 p-2 rounded-full shadow-lg">
                      <Icon path={mdiChevronRight} size={1} />
                    </div>
                  </button>
                </div>

                {/* Livre centré avec effet 3D */}
                <div className="py-6 px-4 flex justify-center items-center h-full perspective">
                  <div
                    style={pageStyle}
                    className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-lg mx-auto transform transition-all duration-500"
                  >
                    <div
                      className={`${
                        currentPageIndex === 0 ? "" : "bg-white"
                      } p-2 rounded-t-lg`}
                    >
                      <div className="overflow-hidden rounded-lg">
                        <ImageWithFallback
                          src={
                            "/" +
                            envConfig?.lang +
                            "/api/image/" +
                            currentImage.url
                          }
                          alt={currentImage.description}
                          className={`${
                            isFullscreen
                              ? "max-h-screen"
                              : "h-64 sm:h-80 md:h-96"
                          } w-full object-contain transform hover:scale-105 transition-transform duration-300`}
                          lang={envConfig?.lang}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation en bas */}
              <div
                className="p-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center cursor-pointer"
                dir={dir}
              >
                <div className="flex items-center">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPageIndex === 0 || isTransitioning}
                    className={`flex items-center px-3 py-1 rounded-full  ${
                      currentPageIndex === 0 || isTransitioning
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-blue-600 hover:bg-blue-50"
                    } transition-colors`}
                  >
                    <Icon
                      path={dir === "rtl" ? mdiChevronRight : mdiChevronLeft}
                      size={0.7}
                    />
                    <span className="ml-1 hidden sm:inline">
                      {translations?.previous}
                    </span>
                  </button>
                </div>

                <div className="text-sm font-medium text-gray-500">
                  {translations?.cahierPage} {currentPageIndex + 1}{" "}
                  {translations?.of} {totalPages}
                </div>

                <div className="flex items-center">
                  <button
                    onClick={goToNextPage}
                    disabled={
                      currentPageIndex === totalPages - 1 || isTransitioning
                    }
                    className={`flex items-center px-3 py-1 rounded-full ${
                      currentPageIndex === totalPages - 1 || isTransitioning
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-blue-600 hover:bg-blue-50"
                    } transition-colors`}
                  >
                    <span className="mr-1 hidden sm:inline">
                      {translations?.next}
                    </span>
                    <Icon
                      path={dir === "rtl" ? mdiChevronLeft : mdiChevronRight}
                      size={0.7}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
