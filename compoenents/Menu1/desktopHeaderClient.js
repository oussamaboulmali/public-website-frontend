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

      // Simplifié : afficher le header compact (Navbar seul) dès qu'on scroll
      if (scrollPosition > 150) {
        setHeaderState({
          isVisible: true,
          isCompact: true,
        });
      } else {
        setHeaderState({
          isVisible: true,
          isCompact: false,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

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

  return (
    <>
      {/* Header compact (Navbar seul) affiché lors du défilement - FIXÉ EN HAUT */}
      {headerState.isCompact && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
          <Navbar
            menuData={menuData}
            envConfig={envConfig}
            dir={dir}
            logoSpace={logoSpace}
            scrollPosition={true}
          />
        </div>
      )}

      {/* Header principal */}
      <header
        className={`relative bg-white text-white w-full transition-all duration-300 ${
          headerState.isCompact ? "h-0 overflow-hidden" : "h-[150px]"
        }`}
      >
        {/* Header normal - Desktop & Tablet*/}
        <div className="hidden md:flex flex-col relative h-full">
          {/* Première barre - 110px */}
          <div className="flex items-center justify-between h-[90px] w-[85%] mx-auto bg-[#FFFFFE]">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-3.png"
                  alt="Logo"
                  width={220}
                  height={250}
                  priority
                />
              </Link>
            </div>

            {/* Contenu de la première barre */}
            <div className="flex-1 flex items-center justify-between ">
              <div className="flex items-center space-x-2 lg:space-x-4 overflow-x-auto hide-scrollbar">
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
                      className="block text-sm lg:text-[15px] text-[#1D589F] font-normal hover:text-gray-200 transition"
                      replace
                      target={item.othertab ? "_blank" : undefined}
                      rel={item.othertab ? "noopener noreferrer" : undefined}
                    >
                      {translations[item.label]}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-3 lg:space-x-5">
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
                  <Link
                    href={envConfig?.ApsX}
                    target="_blank"
                    className="p-1.5 lg:p-2 rounded-full bg-[#1D589F] hover:bg-[#1D589F]/50 transition"
                  >
                    <Image
                      src={`/${envConfig?.lang}/x-2.svg`}
                      alt="twitter"
                      width={17}
                      height={17}
                      style={{
                        //height: "17px",
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </Link>
                  <Link
                    href={envConfig?.ApsFb}
                    target="_blank"
                    className="p-1.5 lg:p-2 rounded-full bg-[#1D589F] hover:bg-[#1D589F]/50 transition"
                  >
                    <Icon path={mdiFacebook} size={0.9} />
                  </Link>
                  <Link
                    href={envConfig?.ApsYtb}
                    target="_blank"
                    className="p-1.5 lg:p-2 rounded-full bg-[#1D589F] hover:bg-[#1D589F]/50 transition"
                  >
                    <Icon path={mdiYoutube} size={0.9} />
                  </Link>
                  <Link
                    href={envConfig?.ApsLinkedIn}
                    target="_blank"
                    className="p-1.5 lg:p-2 rounded-full bg-[#1D589F] hover:bg-[#1D589F]/50 transition"
                  >
                    <Icon path={mdiLinkedin} size={0.9} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Deuxième barre avec mega menu - 40px */}
          <div className="h-[40px]">
            <Navbar
              menuData={menuData}
              envConfig={envConfig}
              dir={dir}
              logoSpace={logoSpace}
            />
          </div>
        </div>

        {/* Mobile Header avec logo au centre */}
        <div className="md:hidden">
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
                <LoginDialog
                  isMobile={true}
                  envConfig={envConfig}
                  dir={dir}
                  lang={envConfig?.lang}
                />
              )}
            </div>

            {/* Logo centré */}
            <div className="bg-white rounded-full p-2 flex items-center justify-center z-10">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={65}
                  height={65}
                  className="w-14 h-14"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer pour compenser la hauteur du header fixé */}
      {headerState.isCompact && <div className="h-[40px]"></div>}
    </>
  );
}
