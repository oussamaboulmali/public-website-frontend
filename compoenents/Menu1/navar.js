"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "@mdi/react";
import Image from "next/image";
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiClock,
  mdiHome,
  mdiMagnify,
} from "@mdi/js";
import SearchForm from "../ui/searchForm";
import MediaSwitcher from "../ui/SwitchMédias";
import translations from "../../locales/translation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Navbar = ({ menuData, envConfig, dir, scrollPosition }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();
  const isRtl = dir === "rtl";
  const catStoreCookies = menuData?.data?.data.map((el) => {
    return el.name;
  });

  useEffect(() => {
    const handleScroll = () => {
      setOpenMenu(false);
    };

    window.addEventListener("scroll", handleScroll);

    // Nettoyage à la destruction du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setOpenMenu]);

  Cookies.set("array", JSON.stringify(catStoreCookies), {
    secure: true,
    sameSite: "Strict",
  });

  return (
    <nav className="w-full h-[60px] bg-[#1D589F] shadow-xl flex items-center">
      <div className="w-[85%] mx-auto flex items-center h-full">
        {/* Menu de navigation à gauche */}
        <div className="flex items-center space-x-1 lg:space-x-2 xl:space-x-4 overflow-x-auto hide-scrollbar h-full">
          <Link
            href="/"
            className="flex items-center h-full px-2 text-white hover:text-[#14416B] transition-colors duration-200"
          >
            <Icon
              path={mdiHome}
              size={1.2}
              className={`${pathname.length === 1 && "text-[#0a2342]"}`}
            />
          </Link>

          {menuData?.data?.data?.map((category, index) => {
            const isActive = pathname?.includes(category.alias);
            return (
              <div
                key={category.id_categorie}
                className="relative group h-full"
                onMouseEnter={() => setOpenMenu(category.id_categorie)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {category.subCategorie?.length === 0 ? (
                  <Link
                    href={`/${encodeURIComponent(category.alias)}`}
                    className={`flex items-center space-x-2 h-full px-3 cursor-pointer text-white 
              hover:text-[#14416B]  rounded transition-all duration-200 border-b-2 border-transparent`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        isActive ? "text-[#0a2342] font-bold" : ""
                      }`}
                    >
                      {category.name}
                    </div>
                  </Link>
                ) : (
                  <>
                    <div className="h-full flex items-center space-x-2 px-3 cursor-pointer text-white hover:text-[#1a146b] rounded transition-all duration-200">
                      <div
                        className={`h-full flex items-center text-sm font-medium ${
                          isActive ? "text-[#0a2342] font-bold" : ""
                        }`}
                      >
                        {category.name}
                      </div>
                      <Icon
                        path={mdiChevronDown}
                        size={0.8}
                        className={`ml-1 ${
                          openMenu === category.id_categorie
                            ? "hidden"
                            : "inline"
                        } ${isActive ? "text-[#0a2342] " : ""}`}
                      />
                      <Icon
                        path={mdiChevronUp}
                        size={0.8}
                        className={`ml-1 ${
                          openMenu === category.id_categorie
                            ? "inline"
                            : "hidden"
                        } ${isActive ? "text-[#0a2342] " : ""}`}
                      />
                    </div>

                    {/* Mega Menu */}
                    <div
                      className={`fixed p-6 ${
                        scrollPosition ? "top-16" : "top-[150px]"
                      } ${
                        isRtl
                          ? "right-1/2 translate-x-1/2"
                          : "left-1/2 -translate-x-1/2"
                      } w-full max-w-[1200px] bg-[#FFFFFE] shadow-lg border border-[#faf9f8] z-50 ${
                        openMenu === category.id_categorie ? "block" : "hidden"
                      }`}
                      dir={isRtl ? "rtl" : "ltr"}
                    >
                      <div className="max-w-[1200px] mx-auto grid grid-cols-[30%_auto] gap-20">
                        <div>
                          <h3 className="bg-[#1D589F] text-lg font-bold text-center text-white mb-5">
                            {category.name?.toUpperCase() +
                              " " +
                              translations?.category}
                          </h3>
                          <ul>
                            {category.subCategorie.map((subCat) => (
                              <li
                                key={subCat.id_subCategorie}
                                className="mb-1 text-sm font-bold border-b border-gray-200 w-[280px] text-start p-2"
                              >
                                <Link
                                  href={`/${encodeURIComponent(
                                    category.alias
                                  )}/${encodeURIComponent(subCat.alias)}`}
                                  className="text-[#1D589F] hover:text-[#14416B] hover:bg-[#FFFFFE] block rounded transition-all duration-200"
                                  onClick={() => setOpenMenu(null)}
                                >
                                  {subCat?.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="bg-[#1D589F] text-lg w-fit min-w-[350px] font-bold text-center text-white mb-5">
                            {translations?.lastInfo?.toUpperCase() +
                              " " +
                              category?.name?.toUpperCase()}
                          </h3>

                          <div className="col-span-3 grid grid-cols-4 gap-4">
                            {category?.articles?.length > 0 ? (
                              category.articles.map((article, index) => (
                                <div
                                  key={article?.id_article || index}
                                  className="border border-gray-200 rounded-lg hover:bg-[#FFFFFE] hover:shadow-md transition-all duration-200 p-2"
                                >
                                  <Image
                                    src={envConfig.imageUrl + article?.url}
                                    alt={article?.title}
                                    width={90}
                                    height={90}
                                    className="w-full h-20 object-cover rounded"
                                    loading="lazy"
                                  />
                                  <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                                    <Icon
                                      path={mdiClock}
                                      size={0.7}
                                      className="text-gray-500"
                                    />
                                    {article.formattedDate
                                      ?.split(" ")
                                      .slice(0, 4)
                                      .join(" ")}
                                  </p>
                                  <Link
                                    href={`/${article?.alias?.replace(
                                      /^\/+/,
                                      ""
                                    )}`}
                                    className="font-bold text-[#1D589F] hover:text-[#14416B] block mt-1 transition-colors duration-200 text-sm"
                                    title={article.title}
                                    onClick={() => setOpenMenu(null)}
                                  >
                                    {article.title.length > 80
                                      ? article.title.slice(
                                          0,
                                          article.title
                                            .slice(0, 60)
                                            .lastIndexOf(" ")
                                        ) + "..."
                                      : article.title}
                                  </Link>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-3 text-center text-gray-500 flex items-center justify-center">
                                {translations?.noArticleMenu}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bannière publicitaire */}
                      <Link
                        href={category?.banner?.click_url || ""}
                        className="block w-[90%] mx-auto my-4"
                        onClick={() => setOpenMenu(null)}
                      >
                        <div className="bg-center bg-cover flex items-center justify-center bg-[#FFFFFE] border border-gray-200 rounded p-4">
                          <Image
                            src={
                              category?.banner?.url !== undefined
                                ? envConfig.imageUrl + category.banner.url
                                : "/pub.png"
                            }
                            width={
                              category?.banner?.url !== undefined ? 350 : 750
                            }
                            height={85}
                            alt={"catégorie " + category?.name}
                            loading="lazy"
                          />
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Spacer pour pousser le contenu à droite */}
        <div className="flex-1"></div>

        {/* Section Multimedia + Recherche à droite */}
        <div className="flex items-center space-x-2 lg:space-x-3 h-full">
          <MediaSwitcher />
          <SearchForm lang={envConfig?.lang} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
