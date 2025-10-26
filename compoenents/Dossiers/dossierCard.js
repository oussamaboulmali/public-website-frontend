"use client";
import Image from "next/image";
import translations from "../../locales/translation";
import FormattedDate from "../ui/formattedDate";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImagePlaceholder from "../ui/ImageHolder";

// Composant pour afficher un article
const DossierCard = ({ dossier, envConfig }) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = dossier?.image?.url && !imageError;
  const imageUrl = hasImage
    ? "/" + envConfig?.lang + "/api/image/" + dossier?.image?.url
    : "";

  const handleImageError = () => {
    setImageError(true);
  };

  const dossierUrl = `/dossier/${dossier?.alias?.replace(/^\/+/, "")}`;

  return (
    <Link href={dossierUrl} className="block w-full h-full" prefetch={false}>
      <div className="w-full h-full mx-auto bg-white rounded-[4px] overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-102 shadow-xs flex flex-col cursor-pointer">
        {/* Image de dossier || placeholder image */}
        <div className="relative h-55 2xl:h-65 overflow-hidden">
          {hasImage ? (
            <Image
              src={imageUrl}
              width={800}
              height={600}
              alt={dossier?.image?.description || dossier?.title}
              className="w-full h-full"
              onError={handleImageError}
            />
          ) : (
            <ImagePlaceholder lang={envConfig?.lang} />
          )}
        </div>

        {/* Contenu de l'article */}
        <div className="px-3 py-3 flex flex-col flex-grow">
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#1D589F] transition-colors">
            {dossier?.name}
          </h2>
          <p className="text-sm text-gray-700 line-clamp-2 mb-4">
            {dossier?.description}
          </p>

          {/* Pied de carte fixé en bas */}
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
            <FormattedDate date={dossier?.formattedDate} />

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

export default DossierCard;
