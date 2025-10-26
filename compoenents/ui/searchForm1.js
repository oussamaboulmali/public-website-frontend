import { mdiMagnify, mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useState, useRef, useEffect } from "react";
import translations from "../../locales/translation";

const SearchForm = ({ dir, isMobile }) => {
  const isRtl = dir === "rtl";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const formRef = useRef(null);
  const mobileInputRef = useRef(null);

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus automatique sur l'input mobile quand il s'ouvre
  useEffect(() => {
    if (isMobileSearchOpen && mobileInputRef.current) {
      setTimeout(() => {
        mobileInputRef.current.focus();
      }, 300); // Délai pour permettre à l'animation de se terminer
    }
  }, [isMobileSearchOpen]);

  const handleIconClick = () => {
    if (isMobile) {
      setIsMobileSearchOpen(true);
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigation côté serveur avec les paramètres GET
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsMobileSearchOpen(false);
      // Petit délai pour l'animation avant la navigation
      setTimeout(() => {
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      }, 200);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleMobileSubmit(e);
    }
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearchQuery("");
  };

  // Version mobile avec transition depuis la gauche
  if (isMobile) {
    return (
      <>
        {/* Icône de recherche mobile */}
        <button
          type="button"
          onClick={handleIconClick}
          className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100/20"
        >
          <Icon path={mdiMagnify} size={1.1} className="text-white" />
        </button>

        {/* Overlay et composant de recherche mobile */}
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
            isMobileSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Overlay sombre */}
          <div
            className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileSearchOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMobileSearch}
          />

          {/* Panel de recherche */}
          <div
            className={`absolute top-0 left-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
              isMobileSearchOpen
                ? "translate-x-0"
                : isRtl
                ? "translate-x-full"
                : "-translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-[#1D589F] to-[#2c6bb3]">
              <h3 className="text-lg font-semibold text-white">
                {translations?.Search || "Recherche"}
              </h3>
              <button
                onClick={closeMobileSearch}
                className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <Icon path={mdiClose} size={1} className="text-white" />
              </button>
            </div>

            {/* Formulaire de recherche */}
            <div className="p-6">
              <form onSubmit={handleMobileSubmit}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Icon
                      path={mdiMagnify}
                      size={0.9}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    ref={mobileInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={translations?.Search || "Rechercher..."}
                    className="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#1D589F] focus:ring-4 focus:ring-[#1D589F]/10 transition-all duration-200 bg-gray-50 hover:bg-white hover:border-gray-300"
                    dir={dir}
                  />

                  {/* Bouton de recherche intégré */}
                  {searchQuery.trim() && (
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-[#1D589F] text-white rounded-xl hover:bg-[#2c6bb3] transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
                    >
                      Aller
                    </button>
                  )}
                </div>
              </form>

              {/* Suggestions ou contenu additionnel */}
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3">
                  Recherches populaires
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Actualités", "Sports", "Technologie", "Culture"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSearchQuery(tag);
                          setTimeout(
                            () =>
                              handleMobileSubmit({ preventDefault: () => {} }),
                            100
                          );
                        }}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Version desktop avec dropdown (inchangée)
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Icône clickable pour desktop */}
      <button
        type="button"
        onClick={handleIconClick}
        className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 border-1 border-white"
      >
        <Icon path={mdiMagnify} size={1} className="text-white" />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="fixed top-[185px] left-0 w-screen z-50 bg-white border-t border-b border-gray-200 shadow-md py-6">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto px-4"
          >
            <div
              className={`flex items-center gap-2 ${
                isRtl ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={translations?.Search}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D589F] focus:border-transparent text-gray-900 placeholder-gray-500"
                  dir={dir}
                  autoFocus
                />
              </div>
              <button
                type="button"
                onClick={handleSearchButtonClick}
                disabled={!searchQuery.trim()}
                className="px-4 py-2 bg-[#1D589F] text-white rounded-md hover:bg-[#5a7fb0] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {translations?.Search}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
