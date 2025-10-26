"use client";
import { useState, useEffect } from "react";
import { mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";

export default function GoToTop({ dir = "ltr" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Fonction pour détecter quand montrer le bouton et si on est en bas de page
  useEffect(() => {
    const toggleVisibility = () => {
      // Montrer le bouton quand on scroll plus bas que 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Vérifier si on est proche du bas de la page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Considérer qu'on est en bas si on est à moins de 50px du bas
      const isBottom = windowHeight + scrollTop >= documentHeight - 50;
      setIsAtBottom(isBottom);
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", toggleVisibility);

    // Appeler la fonction au chargement pour initialiser l'état
    toggleVisibility();

    // Nettoyer l'écouteur quand le composant est démonté
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Déterminer la position en fonction de la direction
  const positionClass = dir === "rtl" ? "left-8" : "right-8";

  // Déterminer le style en fonction de la position de défilement
  const buttonStyle = isAtBottom
    ? "bg-white text-[#1D589F] border-3 border-[#1D589F]"
    : "bg-[#1D589F] text-white";

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-10 md:bottom-40 ${positionClass} p-3 rounded-full ${buttonStyle} shadow-lg hover:opacity-90 transition-all duration-300 z-50`}
          aria-label="Retourner en haut de la page"
        >
          <Icon path={mdiChevronUp} size={1} />
        </button>
      )}
    </>
  );
}
