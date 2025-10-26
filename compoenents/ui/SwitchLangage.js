"use client";
import { useRef, useState } from "react";
import { mdiCheck, mdiChevronDown, mdiChevronUp, mdiWeb } from "@mdi/js";
import Icon from "@mdi/react";
import translations from "../../locales/translation";

const LanguageSwitcher = ({ locales, lang, isMobile }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const closeTimeoutRef = useRef(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="relative mx-2">
      {/* Design sur les grands écrans */}
      {!isMobile && (
        <div
          className="relative"
          onMouseLeave={() => {
            closeTimeoutRef.current = setTimeout(() => {
              setIsHovered(false);
            }, 10000);
          }}
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
        >
          {/* Bouton d'ouverture */}
          <summary
            className="flex items-center cursor-pointer space-x-2 text-[#1D589F] font-bold"
            onClick={() => setIsHovered(!isHovered)}
          >
            <Icon path={mdiWeb} size={1} className="ml-2" />
            {locales[lang]?.label || ""}
            <Icon
              path={isHovered ? mdiChevronUp : mdiChevronDown}
              size={1}
              className="ml-2 transition-transform duration-200"
            />
          </summary>

          {/* Dropdown */}
          {isHovered && (
            <div className="w-full max-h-[250px] overflow-auto scrollbar-hide absolute left-0 mt-0.5 bg-white border border-gray-300 rounded shadow-lg z-50 text-black">
              {Object.entries(locales).map(([key, { label, path }], index) => {
                const isCurrent = key === lang;

                // 🟦 Langue active → non cliquable
                if (isCurrent) {
                  return (
                    <div
                      key={key}
                      className={`flex items-center px-4 py-3 bg-blue-50 text-blue-700 cursor-default select-none ${
                        index !== Object.entries(locales).length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      <span className="font-medium text-sm">{label}</span>
                      <Icon
                        path={mdiCheck}
                        size={0.7}
                        className="ml-auto text-blue-500"
                      />
                    </div>
                  );
                }

                // 🟩 Autres langues → lien cliquable normal
                return (
                  <a
                    key={key}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/item flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200 ease-out ${
                      index !== Object.entries(locales).length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <span className="font-medium text-sm group-hover/item:translate-x-1 transition-transform duration-200">
                      {label}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Design pour mobile */}
      {isMobile && (
        <div className="relative">
          {/* Titre Langues expansible avec icône à droite */}
          <div
            className="flex items-center justify-between cursor-pointer space-x-2 text-black"
            onClick={toggleExpanded}
          >
            <span className="font-800">{translations?.langage}</span>
            <Icon
              path={expanded ? mdiChevronUp : mdiChevronDown}
              size={1}
              className="ml-2 text-gray-500"
            />
          </div>

          {/* Affichage des langues sous le titre si la section est ouverte */}
          {expanded && (
            <div className="mt-2 z-50 text-gray-800 w-full">
              {Object.entries(locales).map(([key, { label, path }]) => {
                const isCurrentLang = lang === key;

                return isCurrentLang ? (
                  <span
                    key={key}
                    className="block px-4 py-2 font-semibold text-gray-900 cursor-default"
                  >
                    {label}
                  </span>
                ) : (
                  <a
                    key={key}
                    href={path}
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
