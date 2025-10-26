"use client";

import { useState } from "react";
import Link from "next/link";
import {
  mdiMenu,
  mdiClose,
  mdiChevronDown,
  mdiChevronUp,
  mdiFacebook,
  mdiYoutube,
  mdiLinkedin,
} from "@mdi/js";
import Icon from "@mdi/react";
import LanguageSwitcher from "../ui/SwitchLangage";
import MediaSwitcher from "../ui/SwitchMédias";
import translations from "../../locales/translation";
import SearchForm from "../ui/searchForm";
import Cookies from "js-cookie";

export default function MobileHeader({
  dir,
  menuData,
  envConfig,
  locales,
  serviceItems,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(null);
  const isRtl = dir === "rtl";

  const catStoreCookies = menuData?.map((el) => {
    return el.name;
  });
  Cookies.set("array", JSON.stringify(catStoreCookies), {
    secure: true,
    sameSite: "Strict",
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setExpandedCategories(null);
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => (prev === categoryId ? null : categoryId));
  };
  return (
    <>
      <button
        onClick={toggleMenu}
        className={`text-white ${isRtl ? "order-last" : "order-first"}`}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <Icon path={mdiMenu} size={1.5} className="text-white" />
      </button>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-white w-full flex flex-col"
        >
          {/* Bouton de fermeture (fixe en haut) */}
          <div className="flex justify-end p-4 shadow-md">
            <button onClick={toggleMenu} className="text-gray-700">
              <Icon path={mdiClose} size={1.2} />
            </button>
          </div>

          {/* Contenu scrollable */}
          <div className="flex-1 overflow-y-auto">
            <hr className="border-gray-300 w-[90%] mx-auto" />

            <SearchForm isMobile={true} lang={envConfig?.lang} />

            {/* Catégories */}
            {[
              { id_categorie: -1, name: translations?.home, alias: "" },
              ...menuData,
            ].map((category) => (
              <div key={category.id_categorie} className="border-b">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => {
                    const hasSubCategories =
                      category.subCategorie && category.subCategorie.length > 0;

                    if (hasSubCategories) {
                      toggleCategory(category.id_categorie);
                    } else {
                      setIsMenuOpen(false);
                      window.location.href = `/${encodeURIComponent(
                        category.alias
                      )}`;
                    }
                  }}
                >
                  <span
                    className={`font-medium ${
                      expandedCategories === category?.id_categorie
                        ? "text-[#1D589F] font-bold"
                        : "text-black"
                    }`}
                  >
                    {category.name}
                  </span>

                  {category?.subCategorie?.length > 0 && (
                    <Icon
                      path={
                        expandedCategories === category?.id_categorie
                          ? mdiChevronUp
                          : mdiChevronDown
                      }
                      size={1}
                      className={`text-gray-500 ${
                        expandedCategories === category?.id_categorie
                          ? "text-[#1D589F]"
                          : ""
                      }`}
                    />
                  )}
                </div>

                {expandedCategories === category?.id_categorie &&
                  category.subCategorie?.length > 0 && (
                    <div className="bg-white px-4 py-2">
                      {category.subCategorie.map((subCat) => (
                        <div key={subCat.id_subCategorie} className="py-2">
                          <Link
                            href={`/${encodeURIComponent(
                              category.alias
                            )}/${encodeURIComponent(subCat.alias)}`}
                            className="block text-gray-800 mx-4"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subCat.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            <hr className="border-gray-300 w-[90%] mx-auto" />
            <div className="px-2 py-6 block space-y-4">
              <LanguageSwitcher
                locales={locales}
                lang={envConfig?.lang}
                isMobile={true}
                isRtl={isRtl}
              />
              <MediaSwitcher isMobile={true} lang={envConfig?.lang} />
            </div>

            <hr className="border-gray-300 w-[90%] mx-auto" />

            {/* Services et Produits */}
            <div className="py-4">
              <div className="px-4 py-2 mb-2 font-medium text-black">
                {translations?.["aps-products"]}
              </div>
              {serviceItems.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    href={item.path}
                    replace
                    target={item.otherTab ? "_blank" : undefined}
                    rel={item.otherTab ? "noopener noreferrer" : undefined}
                    className="block text-[16px] text-black"
                  >
                    {translations[item.label]}
                  </Link>
                </div>
              ))}
            </div>

            <hr className="border-gray-300 w-[90%] mx-auto" />

            {/* Réseaux sociaux */}
            <div className="py-4">
              <div className="px-4 py-1 font-medium text-black">
                {translations.followUsTitle}
              </div>
              <div className="flex justify-center px-4 py-4 space-x-6">
                <Link
                  href={envConfig?.ApsX}
                  target="_blank"
                  className="text-gray-800"
                >
                  <img
                    src={`/${envConfig?.lang}/x-2.svg`}
                    alt="twitter"
                    style={{
                      height: "17px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </Link>
                <Link
                  href={envConfig?.ApsFb}
                  target="_blank"
                  className="text-gray-800"
                >
                  <Icon path={mdiFacebook} size={1.5} />
                </Link>
                <Link
                  href={envConfig?.ApsYtb}
                  target="_blank"
                  className="text-gray-800"
                >
                  <Icon path={mdiYoutube} size={1.5} />
                </Link>
                <Link
                  href={envConfig?.ApsLinkedIn}
                  target="_blank"
                  className="text-gray-800"
                >
                  <Icon path={mdiLinkedin} size={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
