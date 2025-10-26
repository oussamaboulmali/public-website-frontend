"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@mdi/react";
import { mdiFacebook, mdiLinkedin, mdiYoutube } from "@mdi/js";
import LoginDialog from "../ui/Auth/loginClientWrapper";
import Navbar from "./navar";
import Switchlangage from "../ui/SwitchLangage";
import translations from "../../locales/translation";
import MobileHeader from "./mobileHeader";
import { usePathname } from "next/navigation";
import { decryptData } from "../../utils/crypto";
import SearchForm from "../ui/searchFormFinal";

// Composant client pour gérer le scroll et les changements de design
export default function DesktopHeaderClient({
  locales,
  envConfig,
  dir,
  menuData,
}) {
  const [headerState, setHeaderState] = useState({
    isVisible: true,
    isCompact: false,
  });
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const encrypted = sessionStorage.getItem("aorm");
    if (!encrypted) return;

    try {
      const decrypted = decryptData(encrypted);
      const parsed = JSON.parse(decrypted);
      const isLoggedValue = parsed[0]?.islogged === "true";
      setDisplayLoginForm(isLoggedValue);
    } catch (err) {}
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Déterminer l'état basé sur la position de défilement
      if (scrollPosition <= 150) {
        setHeaderState({
          isVisible: true,
          isCompact: false,
        });
      } else if (scrollPosition > 150 && scrollPosition < 1600) {
        // Fixer le header compact
        setHeaderState({
          isVisible: true,
          isCompact: true,
        });
      } else if (
        scrollPosition >= 1660 &&
        scrollPosition <= 2700 &&
        pathname === "/"
      ) {
        // Masquer le header entre 1600px et 1900px
        setHeaderState({
          isVisible: false,
          isCompact: false,
        });
      } else {
        // Re-fixer le header compact après 1900px
        setHeaderState({
          isVisible: true,
          isCompact: true,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const serviceItems = [
    { path: envConfig?.ApsOnline, label: "aps-online", othertab: true },
    { path: envConfig?.ApsVideos, label: "aps-videos", othertab: true },
    { path: envConfig?.ApsPhotos, label: "aps-photos", othertab: true },
    { path: "archive", label: "archives", othertab: false },
  ];

  const logoSpace = {
    sm: "130px",
    md: "140px",
    lg: "160px",
    xl: "180px",
  };

  // Header compact affiché lors du défilement
  const CompactHeader = () => (
    <div className=" hidden  top-0 left-0 right-0 z-50 bg-[#1D589F] shadow-md h-24 md:flex md:fixed items-center justify-between px-4">
      <Navbar
        menuData={menuData}
        envConfig={envConfig}
        dir={dir}
        logoSpace={logoSpace}
        scrollPosition={true}
      />
    </div>
  );

  return (
    <header className="relative bg-white text-white w-full md:min-h-[150px]">
      {/* Header compact affiché lors du défilement */}
      {headerState.isCompact && <CompactHeader />}

      {/* Spacer pour maintenir la hauteur du contenu quand le header compact est fixé */}
      {headerState.isCompact && <div className="h-16"></div>}

      {/* Header normal - Desktop & Tablet avec logo à gauche/droite */}
      <div
        className={`hidden md:flex flex-col relative ${
          headerState.isCompact ? "md:hidden" : ""
        }`}
      >
        {/* Première barre */}
        <div className="flex items-center justify-center h-[50px] bg-white">
          {/* Conteneur principal : 100% sur mobile, 80% sur grand écran */}
          <div className="w-[98%] max-w-[1800px] 2xl:w-[90%] mx-auto px-4 sm:px-4 flex items-center">
            {/* Contenu */}
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center space-x-2 lg:space-x-4 overflow-x-auto hide-bar">
                {/* Image ajoutée */}
                <div className="flex-shrink-0">
                  <img
                    src={`/${envConfig?.lang}/flagdzz.png`}
                    alt="Algeria"
                    className="w-13 h-10"
                  />
                </div>
                {/* Liens */}
                {serviceItems.map((item, index) => (
                  <div
                    key={index}
                    className="px-2 lg:px-4 py-2 whitespace-nowrap"
                  >
                    <Link
                      href={
                        item.othertab
                          ? item.path
                          : `/${item.path?.replace(/\//g, "")}`
                      }
                      className="block text-sm lg:text-base text-[#006633] hover:text-gray-800 transition"
                      // className="block text-sm lg:text-base text-[#1D589F]  hover:font-bold transition"
                      replace
                      target={item.othertab ? "_blank" : undefined}
                      rel={item.othertab ? "noopener noreferrer" : undefined}
                    >
                      {translations[item.label]}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-3 ">
                <SearchForm dir={dir} isMobile={false} lang={envConfig?.lang} />
                <Switchlangage
                  locales={locales}
                  lang={envConfig?.lang}
                  isRtl={dir === "rtl"}
                />
                {displayLoginForm && (
                  <LoginDialog
                    envConfig={envConfig}
                    dir={dir}
                    lang={envConfig?.lang}
                  />
                )}
                <div className="hidden sm:flex space-x-2 lg:space-x-3">
                  {/* Liens réseaux */}
                  <Link
                    href={envConfig?.ApsX}
                    target="_blank"
                    //className="flex items-center p-1.5 lg:p-2.5 rounded-full bg-[#1D589F] hover:bg-[#1D589F]/50 transition"
                    className="flex items-center  lg:py-2 rounded-full bg-white transition"
                    aria-label="Twitter"
                  >
                    <Image
                      src={`/${envConfig?.lang}/x-2.svg`}
                      alt="twitter"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link
                    href={envConfig?.ApsFb}
                    target="_blank"
                    className=" lg:py-2 rounded-full bg-white transition"
                    aria-label="Facebook"
                  >
                    <Icon
                      path={mdiFacebook}
                      size={1.5}
                      className="text-[#0866FF]"
                    />
                  </Link>
                  <Link
                    href={envConfig?.ApsYtb}
                    target="_blank"
                    className=" lg:py-2 rounded-full bg-white transition"
                    aria-label="Youtube"
                  >
                    <Icon
                      path={mdiYoutube}
                      size={1.5}
                      className="text-[#CD201F]"
                    />
                  </Link>
                  <Link
                    href={envConfig?.ApsLinkedIn}
                    target="_blank"
                    className=" lg:py-2 rounded-full bg-white transition"
                    aria-label="Linkedin"
                  >
                    <Icon
                      path={mdiLinkedin}
                      size={1.5}
                      className="text-[#0A66C2]"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deuxième barre avec megamenu */}
        <div className="min-h-[70px] lg:min-h-[80px] xl:min-h-[91px]">
          <Navbar
            menuData={menuData}
            envConfig={envConfig}
            dir={dir}
            logoSpace={logoSpace}
          />
        </div>
      </div>

      {/* Mobile Header avec logo au centre */}
      <div className={`md:hidden`}>
        <div className="flex items-center justify-between p-3 bg-[#1D589F]">
          {/* MobileHeader et LoginDialog */}
          <div
            className={`flex items-center gap-3 ${
              dir === "rtl" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <MobileHeader
              dir={dir}
              menuData={menuData?.data?.data}
              envConfig={envConfig}
              locales={locales}
              serviceItems={serviceItems}
            />
            {displayLoginForm && (
              <LoginDialog isMobile={true} envConfig={envConfig} dir={dir} />
            )}
          </div>

          {/* Logo centré */}
          <div
            className="bg-white rounded-full flex items-center justify-center z-10 w-[85px] h-[85px]"
            style={{
              backgroundImage: `url(/${envConfig?.lang}/logoo.png)`,
              backgroundSize: "80%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Link href="/" className="w-full h-full block rounded-full"></Link>
          </div>
        </div>
      </div>
    </header>
  );
}
