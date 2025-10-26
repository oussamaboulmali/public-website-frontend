import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import translations from "../../locales/translation";

const SearchForm = ({ dir, isMobile }) => {
  const router = useRouter();
  const isRtl = dir === "rtl";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const formRef = useRef(null);

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

  const handleIconClick = () => {
    if (!isMobile) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Utiliser le router Next.js qui gère automatiquement le basePath
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Version mobile
  if (isMobile) {
    return (
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center rounded-md px-3 py-2 bg-gray-500/20 w-[80%] mx-auto my-2 ${
          isRtl ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Icon
          path={mdiMagnify}
          size={1}
          className={`text-gray-500 ${isRtl ? "ml-2" : "mr-2"}`}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={translations?.Search}
          className="bg-transparent w-full text-sm focus:outline-none text-gray-500 placeholder-gray-500"
          dir={dir}
        />
      </form>
    );
  }

  // Version desktop avec dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Icône clickable pour desktop */}
      <button
        type="button"
        onClick={handleIconClick}
        className="cursor-pointer text-[#1D589F] flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 border-1 border-[#1D589F]"
      >
        <Icon
          path={mdiMagnify}
          size={0.9}
          className="text-[#1D589F]"
          style={{ color: "#1D589F" }}
        />
        pppppp
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="fixed top-[185px] left-0 w-screen z-50 bg-[#1D589F] border-t border-b border-gray-200 shadow-md py-6">
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
