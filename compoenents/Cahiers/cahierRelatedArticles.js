"use client";
import translations from "../../locales/translation";
import Link from "next/link";
import ImageWithFallback from "../ui/imagewithFallback";
import FormattedDate from "../ui/formattedDate";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

const Cahier_RelatedArticle = ({ block, envConfig, dir }) => {
  const [sanitizedArticles, setSanitizedArticles] = useState([]);

  useEffect(() => {
    if (block && Array.isArray(block)) {
      const updated = block.map((item) => ({
        ...item,
        sanitizedIntro: DOMPurify?.sanitize(item.description || ""),
      }));

      setSanitizedArticles(updated);
    }
  }, [block]);

  return (
    <div>
      <div className="w-full h-fit text-black bg-gray-50 p-6 m-auto">
        <div className="relative w-full px-0">
          <div className="absolute bottom-0 left-0 w-full border-b-1 border-[#393939]" />
          <span className="relative z-10 inline-block text-[26px] font-bold text-[#00326A] border-b-3 border-[#00326A] pb-1">
            {translations?.relatedCahier}
          </span>
        </div>

        <section className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sanitizedArticles.map((article, index) => (
              <Link
                key={index}
                href={`/cahier-multimedia/${article.alias.replace(/^\/+/, "")}`}
                className="flex flex-col sm:flex-row items-start gap-4 rounded-lg hover:bg-gray-100 transition-all border border-gray-200 p-3"
                prefetch={false}
              >
                <div className="w-full sm:w-1/3 aspect-[4/3] relative overflow-hidden rounded-md">
                  <ImageWithFallback
                    src={
                      article?.featuredImage?.url
                        ? "/" +
                          envConfig?.lang +
                          "/api/image/" +
                          article?.featuredImage?.url
                        : ""
                    }
                    alt={
                      article?.featuredImage?.description ||
                      article?.title ||
                      "Image"
                    }
                    className="w-full h-full object-cover rounded-md"
                    lang={envConfig?.lang}
                  />
                </div>

                <div className="flex flex-col space-y-2 sm:w-2/3">
                  <h4 className="font-semibold text-blue-900 line-clamp-2">
                    {article.name}
                  </h4>

                  <p
                    className="text-sm text-gray-700 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: article?.sanitizedIntro,
                    }}
                  />

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

export default Cahier_RelatedArticle;
