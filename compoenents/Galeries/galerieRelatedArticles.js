import translations from "../../locales/translation";
import Link from "next/link";
import ImageWithFallback from "../ui/imagewithFallback";
import FormattedDate from "../ui/formattedDate";
import DOMPurify from "dompurify";
import Icon from "@mdi/react";
import { mdiImageMultiple } from "@mdi/js";
import { useEffect, useState } from "react";

const Galerie_RelatedArticle = ({ block, envConfig, dir }) => {
  const [isClient, setIsClient] = useState(false);
  const handleSanitaize = (value) => {
    return typeof window !== "undefined"
      ? DOMPurify?.sanitize(value || "")
      : null;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <div className="w-full h-fit text-black bg-gray-50 p-6 m-auto">
        <div className="relative w-full px-0">
          <div className="absolute bottom-0 left-0 w-full border-b-1 border-[#393939]" />
          <span className="relative z-10 inline-block text-[26px] font-bold text-[#00326A] border-b-3 border-[#00326A] pb-1">
            {translations?.relatedGalerie}
          </span>
        </div>

        <section className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {block.map((article, index) => (
              <Link
                key={index}
                href={`/galeries-photos/${article.alias.replace(/^\/+/, "")}`}
                className={`flex flex-col sm:flex-row items-start gap-3 rounded-lg hover:bg-gray-50 transition-colors pb-4 ${
                  index !== block.length - 1
                    ? "border-b border-gray-300 md:border-none"
                    : ""
                }`}
                prefetch={false}
              >
                <div className="w-full sm:w-1/3 relative h-40">
                  <ImageWithFallback
                    src={
                      article?.image?.url
                        ? "/" +
                          envConfig?.lang +
                          "/api/image/" +
                          article?.image?.url
                        : ""
                    }
                    alt={article?.image?.description || article?.title}
                    color="text-gray-400"
                    className="w-full h-auto rounded"
                    lang={envConfig?.lang}
                  />
                  <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Icon path={mdiImageMultiple} size={1} />
                    <span>{article.count}</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 sm:w-2/3">
                  <h4 className="font-semibold mb-2 text-blue-900 line-clamp-2">
                    {article.name}
                  </h4>
                  {isClient && (
                    <p
                      className="text-sm text-gray-700 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: handleSanitaize(article.description),
                      }}
                    />
                  )}

                  <FormattedDate date={article?.formattedDate} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Galerie_RelatedArticle;
