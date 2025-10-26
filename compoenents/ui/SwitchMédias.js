"use client";
import { Fragment, useRef, useState } from "react";
import {
  mdiChartLine,
  mdiChevronDown,
  mdiChevronUp,
  mdiFileDocument,
  mdiFolder,
  mdiHistory,
  mdiImageMultiple,
  mdiVideo,
} from "@mdi/js";
import Icon from "@mdi/react";
import translations from "../../locales/translation";
import Link from "next/link";

const MediaSwitcher = ({ isMobile, dir, lang }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const closeTimeoutRef = useRef(null);

  // Mappage des icônes pour chaque élément du menu
  const iconMap = {
    galeriesPhotos: mdiImageMultiple,
    videos: mdiVideo,
    infographie: mdiChartLine,
    cahiersMultimedias: mdiFileDocument,
    dossier: mdiFolder,
    archives: mdiHistory,
  };

  // Configuration des items du menu avec leur ordre et urls
  const MediaItems = [
    { key: "galeriesPhotos", url: "/galeries-photos" },
    { key: "videos", url: "/video" },
    { key: "infographie", url: "/infographie" },
    { key: "cahiersMultimedias", url: "/cahier-multimedia" },
    { key: "dossier", url: "/dossier" },
    { key: "archives", url: "/archive" },
  ];

  const toggleExpanded = () => {
    setExpanded(!expanded); // Inverse l'état d'expansion
  };

  return (
    <div className="relative mx-2">
      {/* Design sur les grands écrans */}
      {!isMobile && (
        <div
          className="relative h-full min-h-[91px] flex items-center"
          onClick={() => setIsHovered(!isHovered)}
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
          {/* Titre et bouton d'ouverture avec hover */}
          <summary className="bg-[#0B53A3] p-2 rounded-[3px] flex justify-center items-center cursor-pointer space-x-2 text-white hover:text-white">
            <div className="text-white">{translations.multimedia}</div>
            <Icon
              path={isHovered ? mdiChevronUp : mdiChevronDown}
              size={1}
              className="ml-2 transition-transform duration-200"
            />
          </summary>

          {/* Dropdown visible au survol */}
          {isHovered && (
            <div className="absolute top-[61px] left-1/2 transform -translate-x-1/2 w-fit 2xl:w-[260px] max-w-[90vw] mt-2 bg-white/100 border border-gray-300 rounded shadow-lg z-50 text-black pointer-events-none">
              <div className="py-2">
                {MediaItems?.map((item) => (
                  <Fragment key={item.key}>
                    <Link
                      href={item.url}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-150 pointer-events-auto"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center me-4 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
                        <Icon
                          path={iconMap[item.key]}
                          size={0.8}
                          className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                        />
                      </div>

                      {/* Texte avec typographie moderne */}
                      <div className="flex-1">
                        <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
                          {translations[item.key]}
                        </span>
                      </div>

                      {/* Flèche indicatrice */}
                      <div className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  </Fragment>
                ))}
              </div>
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
            <span className="font-800">{translations.multimedia}</span>
            <Icon
              path={expanded ? mdiChevronUp : mdiChevronDown}
              size={1}
              className="ml-2 text-gray-500"
            />
          </div>

          {/* Affichage des langues sous le titre si la section est ouverte */}
          {expanded && (
            <div className="mt-2 z-50 text-gray-800 w-full">
              {MediaItems?.map((item) => (
                <Link
                  href={item.url}
                  key={item.key}
                  className="flex items-center px-4 py-2"
                >
                  {translations[item.key]}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaSwitcher;
