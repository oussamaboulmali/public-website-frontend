"use client";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import translations from "../../../locales/translation";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useState } from "react";
import FormattedDate from "../formattedDate";
import { getNewsCache, setNewsCache } from "../../../utils/newsCache";
import { paginateInfoAction } from "src/app/actions/actions-server";

const NewsItemSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-1"></div>
    <div className="h-4 bg-gray-100 rounded w-1/4"></div>
  </div>
);

export default function News_Feed({
  dir,
  envConfig,
  shouldReplaceBanner,
  bannerUrl,
}) {
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stateInfo, formAction] = useActionState(paginateInfoAction, null);

  useEffect(() => {
    if (stateInfo?.data?.success) {
      const data = stateInfo?.data?.data || [];
      setNews(data);
      setNewsCache(data);
    }
  }, [stateInfo]);

  useEffect(() => {
    const cachedNews = getNewsCache();
    if (cachedNews) {
      setNews(cachedNews);
      return;
    }
    async function loadArticles() {
      try {
        startTransition(() => {
          formAction();
        });
      } catch (error) {
        //console.error( error);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [envConfig.baseUrl]);

  useEffect(() => {
    if (!shouldReplaceBanner) {
      const newsInterval =
        news.length > 0
          ? setInterval(() => {
              setCurrentNewsIndex((prev) => (prev + 1) % news.length);
            }, 5000)
          : null;

      return () => {
        if (newsInterval) clearInterval(newsInterval);
      };
    }
  }, [news.length, shouldReplaceBanner]);

  if (news?.length <= 0) return null;

  return (
    <>
      {shouldReplaceBanner ? (
        // Remplacer la banniere
        <div
          className={`relative rounded-[5px]  overflow-hidden shadow-lg ${
            bannerUrl === null ? "h-auto min-h-[200px]" : "h-[590px]"
          }`}
        >
          <h3 className="text-xl font-bold text-[#1D589F] ms-6 my-2 border-s-4 border-[#1D589F] ps-4">
            {translations?.latestNews}
          </h3>
          <div className="flex flex-col gap-4 p-4">
            {loading
              ? // Afficher skeleton loaders pendant le chargement
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="py-2">
                      <NewsItemSkeleton />
                    </div>
                  ))
              : news.slice(0, 6).map((article, index) => (
                  <div
                    key={article.id_article || index}
                    className="border-b border-gray-200 pb-2 last:border-b-0"
                  >
                    <div className="flex items-start">
                      <div
                        className={` rounded-full text-gray-400 flex items-center justify-center text-[24px] flex-shrink-0 ${
                          dir === "rtl" ? "ml-2" : "mr-2"
                        }`}
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Link
                          href={`/${article?.alias?.replace(/^\/+/, "")}`}
                          className="text-sm hover:text-[#1E58A1] line-clamp-2"
                        >
                          {article.title}
                        </Link>
                        <FormattedDate date={article?.formattedDate} />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      ) : (
        <div className="hidden lg:block fixed bottom-0 left-0 w-full bg-white text-black shadow-lg border-t-4 border-[#006633] z-10000 h-[50px] 2xl:h-[68px]">
          <div className="h-full flex" dir={dir}>
            {/* FlashInfo - Section fixe */}
            <div
              className="flex-shrink-0 text-[24px] text-[#006633] font-bold flex flex-row items-center gap-2 xl:gap-3 px-3 xl:px-4 bg-white z-10"
              style={{ direction: dir }}
            >
              <span>{translations?.flashInfo}</span>
              <Icon
                path={dir === "rtl" ? mdiChevronLeft : mdiChevronRight}
                size={1.2}
                className="xl:w-6 xl:h-6"
              />
            </div>

            {/* Contenu défilant - Prend le reste de l'espace */}
            <div className="flex-1 overflow-hidden relative h-full">
              <style jsx>{`
                @keyframes scroll-ltr {
                  from {
                    transform: translateX(0);
                  }
                  to {
                    transform: translateX(-50%);
                  }
                }
                @keyframes scroll-rtl {
                  0% {
                    transform: translateX(20%);
                  }
                  100% {
                    transform: translateX(100%);
                  }
                }
                .scroll-container {
                  display: flex;
                  width: max-content;
                  animation: ${dir === "rtl" ? "scroll-rtl" : "scroll-ltr"}
                    ${news.length * 10}s linear infinite;
                }
                .scroll-container:hover {
                  animation-play-state: paused;
                }
              `}</style>

              <div className="scroll-container h-full items-center whitespace-nowrap">
                {/* First set of all 10 articles */}
                {news.length > 0 &&
                  news.map((item, index) => (
                    <Link
                      key={`first-${index}`}
                      href={`/${item.alias?.replace(/^\/+/, "")}`}
                      prefetch={false}
                      className="inline-flex items-center h-full px-6 hover:bg-gray-50 transition-colors"
                      style={{ direction: dir }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base xl:text-lg font-semibold">
                          {item.title}
                        </span>
                        <span className="text-gray-400">-</span>
                        <span className="text-xs xl:text-sm text-gray-600">
                          {item.formattedDate}
                        </span>
                      </div>
                    </Link>
                  ))}

                {/* Duplicate set of all 10 articles for seamless loop */}
                {news.length > 0 &&
                  news.map((item, index) => (
                    <Link
                      key={`second-${index}`}
                      href={`/${item.alias?.replace(/^\/+/, "")}`}
                      prefetch={false}
                      className="inline-flex items-center h-full px-6 hover:bg-gray-50 transition-colors"
                      style={{ direction: dir }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base xl:text-lg font-semibold">
                          {item.title}
                        </span>
                        <span className="text-gray-400">-</span>
                        <span className="text-xs xl:text-sm text-gray-600">
                          {item.formattedDate}
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
