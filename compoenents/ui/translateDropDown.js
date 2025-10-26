"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiTranslate } from "@mdi/js";
import Link from "next/link";
import translations from "locales/translation";

export default function TranslateDropdown({ translatedArticles }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timerRef = useRef(null);

  // Fermer automatiquement après 10s
  const startAutoClose = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 10_000);
  };

  const cancelAutoClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Fermer si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Démarrer ou annuler le timer quand menu ouvert
  useEffect(() => {
    if (isOpen) {
      startAutoClose();
    } else {
      cancelAutoClose();
    }
    return cancelAutoClose;
  }, [isOpen]);
  if (translatedArticles?.length > 0) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center text-gray-700 hover:text-blue-600 "
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Partager l'article"
        >
          <span className="block sm:hidden">
            <Icon path={mdiTranslate} size={0.7} style={{ color: "#1D589F" }} />
          </span>
          <span className="hidden sm:block">
            <Icon path={mdiTranslate} size={1} style={{ color: "#1D589F" }} />
          </span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
        </button>

        {isOpen && (
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 transition-all duration-200 ease-out z-50 ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
            role="menu"
            aria-orientation="vertical"
            tabIndex={0}
            onBlur={() => setIsOpen(false)}
            onMouseEnter={cancelAutoClose}
            onMouseLeave={startAutoClose}
            onFocus={cancelAutoClose}
          >
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
              {/* Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Icon
                    path={mdiTranslate}
                    size={0.8}
                    className="text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {translations?.chooseLanguage}
                  </span>
                </div>
              </div>

              {/* Languages List */}
              <div className="py-2">
                {translatedArticles.map((obj) => (
                  <Link
                    key={obj?.lang?.code}
                    href={`${obj?.url}`}
                    replace
                    target="_blank"
                    className="group flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-[#1D589F] transition-all duration-150 ease-in-out"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-150">
                        {obj.lang?.label}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r bg-[#1D589F] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overlay mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
}
