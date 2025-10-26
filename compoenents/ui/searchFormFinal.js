"use client";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useState, useRef, useEffect } from "react";
import translations from "../../locales/translation";

const SearchForm = ({ dir, isMobile, lang }) => {
  const isRtl = dir === "rtl";

  const [showInput, setShowInput] = useState(isMobile);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (!isMobile) {
          setShowInput(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const handleIconClick = () => {
    if (!isMobile) {
      setShowInput((prev) => !prev);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/${lang}/search?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  // Mode mobile : champ toujours visible
  if (isMobile) {
    return (
      <form
        action={`/${lang}/search`}
        method="GET"
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
          name="q"
          placeholder={translations?.Search}
          className="bg-transparent w-full text-sm focus:outline-none text-gray-500 placeholder-gray-500"
          dir={dir}
        />
      </form>
    );
  }

  // Mode desktop
  return (
    <form
      onSubmit={handleSubmit}
      ref={containerRef}
      className={`relative flex items-center justify-center  gap-2 flex-row`}
    >
      {showInput && (
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={translations?.Search}
          dir={dir}
          autoFocus
          className="transition-all duration-200 px-3 py-1.5 rounded-md bg-white text-black w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D589F]"
        />
      )}

      <button
        type="button"
        onClick={handleIconClick}
        title={translations?.Search}
        className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 border-2 border-[#1D589F] hover:bg-white/10"
      >
        <Icon path={mdiMagnify} size={0.9} className="text-[#1D589F]" />
      </button>
    </form>
  );
};

export default SearchForm;
