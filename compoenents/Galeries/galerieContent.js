"use client";
import ImageWithFallback from "../ui/imagewithFallback";
import FormattedDate from "../ui/formattedDate";
import Image from "next/image";
import Icon from "@mdi/react";
import { useState, useEffect } from "react";
import { mdiChevronLeft, mdiChevronRight, mdiClose } from "@mdi/js";
import Galerie_RelatedArticle from "./galerieRelatedArticles";
import ShareButtons from "../ui/shareButtons";
import ViewCounter from "compoenents/ui/viewsNombre";

export default function DossierContent({ galerie, envConfig, dir, alias }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);

  const hasImage = galerie?.featuredImage?.url;
  const imageUrl = hasImage
    ? "/" + envConfig?.lang + "/api/image/" + galerie?.featuredImage?.url
    : "";

  // Calculer le nombre total de pages en fonction du nombre d'éléments par page
  const totalPages = Math.ceil(galerie?.images?.length / itemsPerPage);

  // Fonction pour ouvrir le modal avec l'image sélectionnée
  const openModal = (imageIndex) => {
    setCurrentModalIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Empêcher le scroll du body
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Restaurer le scroll du body
  };

  // Navigation dans le modal
  const nextModalImage = () => {
    setCurrentModalIndex((prev) =>
      prev === galerie.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevModalImage = () => {
    setCurrentModalIndex((prev) =>
      prev === 0 ? galerie.images.length - 1 : prev - 1
    );
  };

  // Gérer les touches du clavier dans le modal
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          prevModalImage();
          break;
        case "ArrowRight":
          nextModalImage();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  // Nettoyer le style du body au démontage du composant
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Détecter la taille de l'écran et ajuster le nombre d'éléments par page
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setItemsPerPage(isMobile ? 1 : 4);

      // Ajuster l'index de page actuel si nécessaire pour éviter les pages vides
      const newTotalPages = Math.ceil(
        galerie?.images?.length / (isMobile ? 1 : 4)
      );
      if (currentPageIndex >= newTotalPages) {
        setCurrentPageIndex(Math.max(0, newTotalPages - 1));
      }
    };

    // Initialiser au chargement
    handleResize();

    // Ajouter l'écouteur d'événement
    window.addEventListener("resize", handleResize);

    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener("resize", handleResize);
  }, [galerie?.images?.length, currentPageIndex]);

  // Calculer la page suivante
  const nextPage = () => {
    return (currentPageIndex + 1) % totalPages;
  };

  // Calculer la page précédente
  const prevPage = () => {
    return (currentPageIndex - 1 + totalPages) % totalPages;
  };

  // Fonction pour changer de page
  const handleManualDesktopChange = (newIndex) => {
    if (typeof newIndex === "function") {
      setCurrentPageIndex(newIndex());
    } else {
      setCurrentPageIndex(newIndex);
    }
  };

  return (
    <>
      <article className="flex flex-col space-y-2 w-full md:max-w-[1800px] mx-auto min-h-screen bg-white p-2 sm:p-4">
        {/* Title*/}
        <h1 className="text-3xl font-bold text-gray-900">{galerie?.name}</h1>

        {/* Date */}
        <div className="flex items-center justify-between py-3 border-b-2 border-blue-500">
          <div className="flex items-center justify-center gap-4">
            <FormattedDate date={galerie?.formattedDate} />
            {galerie.views !== null && (
              <ViewCounter initialViews={galerie.views} />
            )}
          </div>

          <ShareButtons
            articleTitle={galerie?.name}
            dir={dir}
            envConfig={envConfig}
          />
        </div>

        {/* Image container with bg color */}
        <div className="bg-blue-50 py-8 flex flex-col items-center">
          <ImageWithFallback
            src={imageUrl}
            alt={galerie?.featuredImage?.description || galerie?.title}
            color="text-gray-400"
            lang={envConfig?.lang}
          />

          {galerie?.featuredImage?.credit && (
            <div
              className="w-[80%] mx-auto mt-5 text-[14px] text-gray-500 italic prose prose-sm sm:prose max-w-none line-clamp-1"
              title={galerie.featuredImage.credit}
            >
              {galerie.featuredImage.credit}
            </div>
          )}
        </div>

        <div className="relative w-[95%] mx-auto p-4">
          <div className="overflow-hidden relative">
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
                  const imagesOnPage = galerie?.images?.slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage
                  );

                  const justifyClass =
                    imagesOnPage.length < 4
                      ? "justify-start"
                      : "justify-center";

                  return (
                    <div
                      key={`page-${pageIndex}`}
                      className={`w-full flex-shrink-0 flex gap-2 ${justifyClass}`}
                    >
                      {imagesOnPage.map((el, index) => {
                        const globalIndex = pageIndex * itemsPerPage + index;
                        return (
                          <div
                            key={index}
                            className="md:w-[22%] w-full flex-shrink-0"
                          >
                            <div
                              className="relative h-70 2xl:h-80 overflow-hidden rounded-lg cursor-pointer"
                              onClick={() => openModal(globalIndex)}
                            >
                              <Image
                                src={`/${envConfig?.lang}/api/image/${el?.url}`}
                                alt={el?.name}
                                width={300}
                                height={300}
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
                  onClick={() => {
                    setCurrentPageIndex(index);
                  }}
                  aria-label={`Aller à la page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Intro text */}
        <div
          className="py-4 text-lg leading-12"
          style={{ textIndent: "1.5rem" }}
        >
          <p>{galerie?.description}</p>
        </div>

        <div className="mt-6 md:mt-10">
          {galerie?.relatedGalleries.length > 0 && (
            <Galerie_RelatedArticle
              block={galerie?.relatedGalleries}
              envConfig={envConfig}
              dir={dir}
            />
          )}
        </div>
      </article>

      {/* Modal pour afficher les images en grand */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-2222250 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/50 bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 z-10 transition-all"
              aria-label="Fermer"
            >
              <Icon path={mdiClose} size={1.5} className="text-black" />
            </button>

            {/* Navigation précédente */}
            {galerie.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevModalImage();
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
            {galerie.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextModalImage();
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
                src={`/${envConfig?.lang}/api/image/${galerie.images[currentModalIndex]?.url}`}
                alt={galerie.images[currentModalIndex]?.name}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                loading="lazy"
              />

              {/* Compteur d'images */}
              {galerie.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentModalIndex + 1} / {galerie.images.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
