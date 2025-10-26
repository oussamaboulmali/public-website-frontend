"use client";
import { useEffect, useState } from "react";
import translations from "../../locales/translation";
import Link from "next/link";
import ImageWithFallback from "../ui/imagewithFallback";
import DOMPurify from "dompurify";
import FormattedDate from "../ui/formattedDate";

const Post_RelatedArticle = ({ block, envConfig, dir }) => {
  const [sanitizedArticles, setSanitizedArticles] = useState([]);

  useEffect(() => {
    if (block && Array.isArray(block)) {
      const updated = block.map((item) => ({
        ...item,
        sanitizedIntro: DOMPurify?.sanitize(item.introtext || ""),
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
            {translations?.relatedArticle}
          </span>
        </div>

        {sanitizedArticles && sanitizedArticles.length > 0 && (
          <section className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sanitizedArticles.map((article, index) => (
                <Link
                  key={index}
                  href={`/${article.alias.replace(/^\/+/, "")}`}
                  className={`flex flex-col sm:flex-row items-start gap-3 rounded-lg hover:bg-gray-50 transition-colors pb-4 ${
                    index !== sanitizedArticles.length - 1
                      ? "border-b border-gray-300 md:border-none"
                      : ""
                  }`}
                >
                  <div className=" w-full sm:w-1/3">
                    <ImageWithFallback
                      src={
                        article?.image?.url
                          ? "/" +
                            envConfig?.lang +
                            "/api/image/" +
                            article?.image.url
                          : ""
                      }
                      alt={article?.image?.description || article?.title}
                      color="text-gray-400"
                      className="w-full h-full rounded"
                      lang={envConfig?.lang}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 sm:w-2/3">
                    <h4 className="font-semibold mb-2 text-blue-900 line-clamp-2">
                      {article.title}
                    </h4>
                    <p
                      className="text-sm text-gray-700 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: article.sanitizedIntro,
                      }}
                    />
                    <FormattedDate date={article?.formattedDate} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Post_RelatedArticle;
