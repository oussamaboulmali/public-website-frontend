"use client";
import { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, paginate, dir }) => {
  const pageNumbers = [];
  const isMobile = useIsMobile();

  // Logique pour mobile
  if (isMobile) {
    if (totalPages <= 3) {
      // Si 3 pages ou moins, afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage === 1) {
        pageNumbers.push(1, 2, "...", totalPages);
      } else if (currentPage === totalPages) {
        pageNumbers.push(1, "...", totalPages - 1, totalPages);
      } else if (currentPage === 2) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage === totalPages - 1) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...", currentPage, "...", totalPages);
      }
    }
  } else {
    // Logique existante pour les écrans plus grands
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pageNumbers.push(i);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pageNumbers.push(i);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
  }

  return (
    <div className="flex justify-center mt-8 md:mt-12">
      <nav className="flex items-center">
        {/* Bouton précédent */}
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        >
          {dir === "rtl" ? String.fromCharCode(187) : String.fromCharCode(171)}
        </button>

        {/* Numéros de page */}
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => (number !== "..." ? paginate(number) : null)}
            className={`mx-1 px-3 py-1 rounded ${
              number === currentPage
                ? "bg-[#003979] text-white"
                : number === "..."
                ? "cursor-default"
                : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}

        {/* Bouton suivant */}
        <button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="mx-1 px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        >
          {dir === "rtl" ? String.fromCharCode(171) : String.fromCharCode(187)}
        </button>
      </nav>
    </div>
  );
};

// Fonction pour détecter si l'appareil est mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Vérifie si l'écran est petit (largeur < 640px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Vérifie au chargement
    checkMobile();

    // Ajoute un listener pour les changements de taille d'écran
    window.addEventListener("resize", checkMobile);

    // Nettoie le listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

export default Pagination;
