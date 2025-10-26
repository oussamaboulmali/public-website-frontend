"use client";
import Image from "next/image";
import translations from "../../locales/translation";
import FormattedDate from "../ui/formattedDate";
import Link from "next/link";
import { useState } from "react";
import ImagePlaceholder from "../ui/ImageHolder";

const VideoCard = ({ video, envConfig }) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = video?.image?.url && !imageError;
  const imageUrl = hasImage
    ? "/" + envConfig?.lang + "/api/image/" + video?.image?.url
    : "";

  const handleImageError = () => {
    setImageError(true);
  };
  // URL de la vidéo
  const videoUrl = `/video/${video?.alias?.replace(/^\/+/, "")}`;

  return (
    <Link href={videoUrl} className="block w-full h-full" prefetch={false}>
      <div className="w-full h-full mx-auto bg-white rounded-[4px] overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-102 shadow-xs flex flex-col cursor-pointer">
        {/* Image de video || placeholder image */}
        <div className="relative h-56 2xl:h-64 overflow-hidden">
          {hasImage ? (
            <>
              <Image
                src={imageUrl}
                width={800}
                height={600}
                alt={video?.image?.description || video?.title}
                className="w-full h-full "
                onError={handleImageError}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#003979] hover:bg-[#001a4d] transition-colors flex items-center justify-center z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-12 h-12"
                    style={{ marginLeft: "2px" }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <ImagePlaceholder lang={envConfig?.lang} />
          )}
        </div>

        {/* Contenu de l'article */}
        <div className="px-3 py-3 flex flex-col flex-grow">
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#1D589F] transition-colors">
            {video?.name}
          </h2>
          <p className="text-sm text-gray-700 line-clamp-2 mb-4">
            {video?.description}
          </p>

          {/* Pied de carte fixé en bas */}
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
            <FormattedDate date={video?.formattedDate} />

            {/* Le bouton "Lire plus" devient décoratif */}
            <div className="bg-[#1D589F] hover:bg-[#003979] text-white text-sm font-bold px-3 py-1 rounded transition-colors duration-300">
              {translations?.readMore}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
