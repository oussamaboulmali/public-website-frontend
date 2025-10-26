"use client";
import Image from "next/image";
import translations from "../../locales/translation";
import FormattedDate from "../ui/formattedDate";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImagePlaceholder from "../ui/ImageHolder";
import DOMPurify from "dompurify";

// Composant pour afficher un article
const ArticleCard = ({ article, envConfig }) => {
  const [imageError, setImageError] = useState(false);
  const [sanitizedArticles, setSanitizedArticles] = useState([]);
  const hasImage = article?.image?.url && !imageError;
  const imageUrl =
    hasImage && article?.image?.url
      ? `/${envConfig?.lang}/api/image/${article.image.url}`
      : "";

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    if (article && typeof article === "object" && !Array.isArray(article)) {
      const updated = DOMPurify?.sanitize(article.introtext || "");
      setSanitizedArticles(updated);
    }
  }, [article]);

  // URL de l'article
  const articleUrl = `/${article?.alias?.replace(/^\/+/, "")}`;

  return (
    <Link href={articleUrl} className="block w-full h-full">
      <div className="w-full h-full mx-auto bg-white rounded-[4px] overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-102 shadow-xs flex flex-col cursor-pointer">
        {/* Image de l'article || placeholder image */}
        <div className="relative h-55 2xl:h-65 overflow-hidden">
          {hasImage ? (
            <Image
              src={imageUrl}
              width={900}
              height={600}
              alt={article?.image?.description || article?.title}
              className="w-full h-full "
              onError={handleImageError}
            />
          ) : (
            <ImagePlaceholder lang={envConfig?.lang} />
          )}
        </div>

        {/* Contenu de l'article */}
        <div className="px-3 py-3 flex flex-col flex-grow">
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#1D589F] transition-colors">
            {article.title}
          </h2>
          <p
            className="text-sm text-gray-700 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: sanitizedArticles,
            }}
          ></p>

          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <FormattedDate date={article?.formattedDate} />
            </div>
            {/* Le bouton "Lire plus" devient décoratif */}
            <div className="bg-[#1D589F] hover:bg-[#003979] text-white text-xs font-bold px-2 py-1 rounded transition-colors duration-300">
              {translations?.readMore}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
