"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiShareVariant, mdiFacebook, mdiLinkedin, mdiEmail } from "@mdi/js";
import translations from "../../locales/translation";
import Image from "next/image";

export default function ShareButtons({ articleTitle, envConfig }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const timerRef = useRef(null);
  const menuRef = useRef(null);

  // Ferme le menu après 10 secondes
  const startAutoClose = () => {
    cancelAutoClose();
    timerRef.current = setTimeout(() => {
      setIsShareOpen(false);
    }, 1000);
  };

  const cancelAutoClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Fermer si on clique en dehors du menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsShareOpen(false);
        cancelAutoClose();
      }
    };

    if (isShareOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      cancelAutoClose();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShareOpen]);

  // Fermer sur Échap
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsShareOpen(false);
    };
    if (isShareOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isShareOpen]);

  const shareVia = (platform) => {
    const title = encodeURIComponent(articleTitle);

    const url = encodeURIComponent(shareUrl);

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
          "_blank"
        );
        break;
      case "email":
        const emailBody = `${decodeURIComponent(
          title
        )}%0D%0A%0D%0A${decodeURIComponent(url)}`;
        window.open(`mailto:?subject=${title}&body=${emailBody}`, "_blank");
        break;
    }

    setIsShareOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center text-gray-700 hover:text-blue-600"
        onClick={() => {
          cancelAutoClose();
          setIsShareOpen((open) => !open);
        }}
        aria-expanded={isShareOpen}
        aria-label="Partager l'article"
      >
        {/* Icône mobile */}
        <span className="block sm:hidden">
          <Icon
            path={mdiShareVariant}
            size={0.7}
            style={{ color: "#1D589F" }}
          />
        </span>

        {/* Icône desktop */}
        <span className="hidden sm:block">
          <Icon path={mdiShareVariant} size={1} style={{ color: "#1D589F" }} />
        </span>
      </button>

      {isShareOpen && (
        <div
          ref={menuRef}
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg rounded-md p-4 z-10 w-fit flex flex-col space-y-2"
          role="menu"
          onMouseEnter={cancelAutoClose}
          onMouseLeave={startAutoClose}
          onFocus={cancelAutoClose}
          onBlur={startAutoClose}
        >
          <button
            onClick={() => shareVia("twitter")}
            className="text-[#1D589FCC] hover:text-blue-800 flex justify-center"
          >
            <span className="sr-only">{translations.twitterLabel}</span>
            <Image
              src={`/${envConfig?.lang}/x-2.svg`}
              alt="twitter"
              width={17}
              height={17}
            />
          </button>
          <button
            onClick={() => shareVia("facebook")}
            className="text-[#0866FF]"
          >
            <span className="sr-only">{translations.facebookLabel}</span>
            <Icon path={mdiFacebook} size={1.5} />
          </button>
          <button onClick={() => shareVia("email")} className="text-gray-700">
            <span className="sr-only">{translations.emailLabel}</span>
            <Icon path={mdiEmail} size={1.5} />
          </button>
          <button
            onClick={() => shareVia("linkedin")}
            className="text-[#0A66C2]"
          >
            <span className="sr-only">{translations.linkedinLabel}</span>
            <Icon path={mdiLinkedin} size={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
