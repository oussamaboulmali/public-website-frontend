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
//import SearchForm from "../ui/searchForm";
import MediaSwitcher from "../ui/SwitchMédias";
import translations from "../../locales/translation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import FormattedDate from "../ui/formattedDate";

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

  const isCategoryActive = (category, pathname) => {
    if (!pathname) return false;

    // Nettoyer le pathname
    const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
    const pathSegments = cleanPath.split("/");

    // Si le pathname correspond exactement à la catégorie
    if (pathSegments.length >= 1 && pathSegments[0] === category.alias) {
      if (pathSegments.length === 1) {
        return true;
      }

      // Vérifier si c'est catégorie/sous-catégorie (domaine/basepath/categorie/subCategorie)
      if (pathSegments.length === 2 && category.subCategorie?.length > 0) {
        return category.subCategorie.some(
          (subCat) => subCat.alias === pathSegments[1]
        );
      }

      // Vérifier si c'est catégorie/sous-catégorie/slug (domaine/basepath/categorie/subCategorie/slug)
      if (pathSegments.length === 3 && category.subCategorie?.length > 0) {
        return category.subCategorie.some(
          (subCat) => subCat.alias === pathSegments[1]
        );
      }

      // Si pas de sous-catégories, accepter catégorie/slug (domaine/basepath/categorie/slug)
      if (
        pathSegments.length === 2 &&
        (!category.subCategorie || category.subCategorie.length === 0)
      ) {
        return true;
      }
    }

    return false;
  };

  return (
    <nav className="w-full bg-[#1D589F] flex items-center h-full">
      <div className="w-[98%] max-w-[1800px] 2xl:w-[90%] mx-auto px-4 flex items-center py-2 gap-3 2xl:gap-6">
        {/* Logo aligné avec le contenu */}
        <div
          className={`hidden md:flex rounded-full bg-white bg-center items-center justify-center flex-shrink-0 transition-all duration-300 ${
            scrollPosition ? "w-[90px] h-[90px]" : "w-[110px] h-[110px]"
          }`}
          style={{
            backgroundImage: `url(/${envConfig?.lang}/logoo.png)`,
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Link href={`/`} className="w-full h-full rounded-full block" />
        </div>
        <div className="flex justify-between items-center w-full ">
          {/* Menu de navigation */}
          <div className=" flex items-center justify-center mx-4">
            <div className="flex items-center space-x-1 lg:space-x-2 xl:space-x-4 overflow-x-auto">
              <Link
                href={`/`}
                className={`flex items-center px-2 py-3 text-white hover:text-gray-200 h-full w-12  ${
                  pathname.length === 1 && "border-b-3 border-[#0A2C56]"
                }`}
                aria-label="Home"
              >
                <Icon
                  path={mdiHome}
                  size={1.5}
                  className={`${pathname.length === 1 ? "text-[#0A2C56]" : ""}`}
                />
              </Link>

              {menuData?.data?.data?.map((category) => {
                const isActive = isCategoryActive(category, pathname);
                return (
                  <div
                    key={category.id_categorie}
                    className="relative group"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === category.id_categorie
                          ? null
                          : category.id_categorie
                      )
                    }
                  >
                    {category.subCategorie?.length === 0 ? (
                      <Link
                        href={`/${encodeURIComponent(category.alias)}`}
                        className={` flex items-center space-x-2 py-3 px-3 cursor-pointer text-white hover:text-gray-200  transition  ${
                          isActive && "border-b-3 border-[#0A2C56]"
                        }`}
                      >
                        <div
                          className={`${
                            isActive ? "text-[#0A2C56] font-bold" : ""
                          }`}
                        >
                          {category.name}
                        </div>
                      </Link>
                    ) : (
                      <>
                        <div
                          className={`h-full min-h[91px] flex items-center space-x-2 py-3 px-3 cursor-pointer text-white hover:text-gray-200 border-b-3 ${
                            isActive ? "border-[#0A2C56]" : "border-transparent"
                          }`}
                        >
                          <div
                            className={`h-full  flex items-center ${
                              isActive ? "text-[#0A2C56] font-bold" : ""
                            }`}
                          >
                            <div className="">{category.name}</div>
                          </div>
                          <Icon
                            path={mdiChevronDown}
                            size={1}
                            className={`ml-2 ${
                              openMenu === category.id_categorie
                                ? "hidden"
                                : "inline"
                            } ${isActive ? "text-[#0A2C56] " : ""}`}
                          />
                          <Icon
                            path={mdiChevronUp}
                            size={1}
                            className={`ml-2 ${
                              openMenu === category.id_categorie
                                ? "inline"
                                : "hidden"
                            } ${isActive ? "text-[#0A2C56] " : ""}`}
                          />
                        </div>

                        {/* Mega Menu */}
                        <div
                          onMouseLeave={() => setOpenMenu(false)}
                          className={`fixed z-5000000 max-h-[400px] 2xl:max-h-[800px] overflow-y-auto scrollbar ${
                            scrollPosition ? "top-[90px]" : "top-[180px]"
                          } ${
                            isRtl
                              ? "right-1/2 translate-x-1/2"
                              : "left-1/2 -translate-x-1/2"
                          } w-full max-w-[950px] 2xl:max-w-[1200px] bg-white shadow-lg  ${
                            openMenu === category.id_categorie
                              ? "block"
                              : "hidden"
                          }`}
                          style={{
                            scrollbarWidth: "thin", // Pour Firefox
                            scrollbarColor: "#999 #D3D3D3", // Pour Firefox
                          }}
                          dir={isRtl ? "rtl" : "ltr"}
                        >
                          <div className="p-6 grid  grid-cols-[30%_auto] gap-10 2xl:gap-20">
                            <div>
                              <h3 className="bg-[#0071B2] text-[20px] font-bold text-center text-white py-1.5 mb-5">
                                {category.name?.toUpperCase()}
                              </h3>
                              <ul>
                                {category.subCategorie.map((subCat) => (
                                  <li
                                    key={subCat.id_subCategorie}
                                    className="mb-1 text-[15px] font-bold border-b border-gray-200 w-[280px] text-start"
                                  >
                                    <Link
                                      href={`/${encodeURIComponent(
                                        category.alias
                                      )}/${encodeURIComponent(subCat.alias)}`}
                                      className="text-black hover:text-blue-700 block px-3 py-2 rounded"
                                      onClick={() => setOpenMenu(null)}
                                    >
                                      {subCat?.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="bg-[#0071B2] text-[20px] w-fit min-w-[350px] font-bold text-center text-white p-[6px] mb-5">
                                {translations?.lastInfo?.toUpperCase()}
                              </h3>

                              <div className="col-span-3 grid grid-cols-4 gap-4 min-h-[200px]">
                                {category?.articles?.length > 0 ? (
                                  category.articles.map((article, index) => (
                                    <div
                                      key={article?.id_article || index}
                                      className=" rounded-lg hover:bg-gray-50 flex flex-col space-y-1"
                                    >
                                      <Image
                                        src={
                                          "/" +
                                          envConfig.lang +
                                          "/api/image/" +
                                          article?.url
                                        }
                                        alt={article?.title}
                                        width={800}
                                        height={800}
                                        className="w-full h-24  rounded"
                                        loading="lazy"
                                      />

                                      <FormattedDate
                                        date={article?.formattedDate}
                                        smallIcon={0.8}
                                      />

                                      <Link
                                        href={`/${article?.alias?.replace(
                                          /^\/+/,
                                          ""
                                        )}`}
                                        className="text-[14px] font-semibold text-black hover:text-[#1D589F] block mt-1"
                                        title={article.title}
                                        onClick={() => setOpenMenu(null)}
                                      >
                                        <span className="prose prose-sm sm:prose max-w-none line-clamp-2">
                                          {article.title}
                                        </span>
                                      </Link>
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-span-4 flex items-center justify-center text-gray-500 text-center   rounded-lg">
                                    {translations?.noArticleMenu}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Bannière publicitaire */}
                          <Link
                            href={category?.banner?.click_url || ""}
                            className="block w-[90%] mx-auto mb-10"
                            onClick={() => setOpenMenu(null)}
                            target="_blank"
                          >
                            <div className="h-[181px] bg-center bg-cover flex items-center justify-center bg-gray-200">
                              <Image
                                src={
                                  category?.banner?.url !== undefined
                                    ? "/" +
                                      envConfig.lang +
                                      "/api/image/" +
                                      category.banner.url
                                    : `/${envConfig?.lang}/pub.png`
                                }
                                width={929}
                                height={101}
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
          </div>

          {/* Section Multimedia + Recherche */}
          <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
            <MediaSwitcher dir={dir} isMobile={false} lang={envConfig?.lang} />
            {/*  <SearchForm /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
