import React from "react";
import Link from "next/link";
import Image from "next/image";
import translations from "../../locales/translation";
import Icon from "@mdi/react";
import {
  mdiFacebook,
  mdiFax,
  mdiLinkedin,
  mdiMapMarker,
  mdiPhone,
  mdiYoutube,
} from "@mdi/js";

const Footer = ({ locales, dir, envConfig }) => {
  const serviceItems = [
    { path: envConfig?.ApsOnline, label: "aps-online", othertab: true },
    { path: envConfig?.ApsVideos, label: "aps-videos", othertab: true },
    { path: envConfig?.ApsPhotos, label: "aps-photos", othertab: true },
    { path: "archive", label: "archives", othertab: false },
  ];

  return (
    <footer className=" mb-0 w-full bg-[#003979] text-white md:mb-12 2xl:mb-16">
      <div className="hidden md:block">
        {/* Langues en ligne avec bordure */}
        <div className=" z-50 text-white w-full border-b border-white/90">
          <div className="flex space-x-4 px-4 py-2">
            {Object.entries(locales).map(([key, { label, path }]) => (
              <a key={key} href={path} className="hover:text-gray-100">
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* principale */}
        <div className="w-[90%] m-auto flex items-stretch justify-between px-4 py-8 text-gray-200 gap-x-7">
          <div className="flex-shrink-0 w-40 h-40 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image
              src={`/${envConfig?.lang}/logoo.png`}
              alt="Logo"
              width={110}
              height={110}
              loading="lazy"
            />
          </div>
          <div className=" flex-grow mx-9 h-full">
            <Link
              href="/a-propos-de-l-aps"
              className="mt-2 text-white text-[20px] "
              prefetch={false}
            >
              {translations?.description}
            </Link>
          </div>
          {/* Séparateur vertical */}
          <div className="w-px bg-white"></div>
          <div className="flex-shrink-0 w-1/6 text-start h-full">
            <div className="px-4 py-2 mb-2 font-medium underline underline-offset-4">
              {translations?.["aps-products"]}
            </div>
            {serviceItems.map((item, index) => (
              <div key={index} className="px-2 lg:px-4 py-2 whitespace-nowrap">
                <Link
                  href={
                    item.othertab
                      ? item.path
                      : `/${item.path?.replace(/\//g, "")}`
                  }
                  className="block text-sm lg:text-base text-white hover:text-gray-200 transition"
                  replace
                  target={item.othertab ? "_blank" : undefined}
                  rel={item.othertab ? "noopener noreferrer" : undefined}
                  prefetch={false}
                >
                  {translations[item.label]}
                </Link>
              </div>
            ))}
          </div>
          {/* Séparateur vertical */}
          <div className="w-px bg-white"></div>
          <div className="flex-shrink-0 w-1.5/6 space-y-4">
            {[
              { icon: mdiMapMarker, label: translations?.adresse },
              { icon: mdiPhone, label: translations?.contact },
              { icon: mdiFax, label: translations?.fax },
            ]?.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-5 flex-row`}
                dir={dir}
              >
                <div className="mt-1">
                  <Icon path={item.icon} size={1} />
                </div>
                <span dir={"ltr"}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center px-4 pb-2 space-x-6">
          <Link
            href={envConfig?.ApsX}
            target="_blank"
            className="flex items-center justify-center"
            prefetch={false}
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
          <Link href={envConfig?.ApsFb} target="_blank" prefetch={false}>
            <Icon path={mdiFacebook} size={1.5} />
          </Link>

          <Link href={envConfig?.ApsYtb} target="_blank" prefetch={false}>
            <Icon path={mdiYoutube} size={1.5} />
          </Link>
          <Link href={envConfig?.ApsLinkedIn} target="_blank" prefetch={false}>
            <Icon path={mdiLinkedin} size={1.5} />
          </Link>
        </div>

        {/*copyright*/}
        <div className="p-2 z-50 text-white w-full border-t border-white/90 text-center">
          {translations?.copyright}
          <span className="text-blue-900">{envConfig?.frontNum}</span>
        </div>
      </div>

      {/* VERSION MOBILE */}
      <div className="block sm:hidden bg-[#003A79] text-white p-4">
        {/* Bloc logo + contact - Utilisation de flexbox au lieu de grid */}
        <div className="flex gap-4 items-start">
          {/* Logo - largeur fixe */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-white border overflow-hidden flex items-center justify-center">
              <Image
                src={`/${envConfig?.lang}/logoo.png`}
                alt="Logo"
                width={70}
                height={70}
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Informations de contact - prend l'espace restant */}
          <div className="flex-1 flex flex-col space-y-2 text-sm min-w-0">
            {/* Adresse */}
            <div className="flex items-start gap-2">
              <Icon
                path={mdiMapMarker}
                size={0.8}
                className="flex-shrink-0 mt-0.5"
              />
              <span className="break-words">{translations?.adresse}</span>
            </div>

            {/* Téléphone */}
            <div className="flex items-start gap-2">
              <Icon
                path={mdiPhone}
                size={0.8}
                className="flex-shrink-0 mt-0.5"
              />
              <span className="break-words" dir="ltr">
                {translations?.contact}
              </span>
            </div>

            {/* Fax */}
            <div className="flex items-start gap-2">
              <Icon path={mdiFax} size={0.8} className="flex-shrink-0 mt-0.5" />
              <span className="break-words" dir="ltr">
                {translations?.fax}
              </span>
            </div>
          </div>
        </div>

        {/* Bloc description - Prend toute la largeur */}
        <div className="mt-6 text-sm leading-6 w-full text-center">
          <Link
            href="/a-propos-de-l-aps"
            className="mt-3 inline-block underline text-gray-300 text-lg hover:underline focus:underline"
            prefetch={false}
          >
            {translations?.description}
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-white/30 pt-3 text-center text-xs text-gray-200">
          {translations?.copyright}
          <span className="text-blue-900">{envConfig?.frontNum}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
