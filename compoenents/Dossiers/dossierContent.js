"use client";

import Link from "next/link";
import ImageWithFallback from "../ui/imagewithFallback";
import FormattedDate from "../ui/formattedDate";
import translations from "../../locales/translation";
import Image from "next/image";
import ImagePlaceholder from "../ui/ImageHolder";
import Pagination from "../ui/pagination";
import { startTransition, useActionState, useEffect, useState } from "react";
import Dossier_RelatedArticle from "./dossierRelatedArticles";
import { paginateDossierContentAction } from "src/app/actions/actions-server";
import DOMPurify from "dompurify";

export default function DossierContent({
  dossier,
  envConfig,
  dir,
  pageSize,
  alias,
}) {
  const [array, setArray] = useState(dossier.articles || []);
  const [currentPage, setCurrentPage] = useState(1);
  const hasImage = dossier?.image?.url;
  const imageUrl = hasImage
    ? "/" + envConfig?.lang + "/api/image/" + dossier?.image?.url
    : "";
  const count = dossier?.count;
  const totalPages = Math.ceil(
    (count || dossier.articles.length || 0) / pageSize
  );
  const [isClient, setIsClient] = useState(false);
  const [statePaginate, formAction] = useActionState(
    paginateDossierContentAction,
    null
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (statePaginate?.data?.success) {
      const updatedData = statePaginate?.data?.data?.articles.map((el) => {
        return { ...el, introtext: DOMPurify.sanitize(el.introtext) };
      });
      setArray(updatedData);
    }
  }, [statePaginate]);

  // Fonction pour changer de page
  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    const formData = new FormData();
    formData.append("page", pageNumber.toString());
    formData.append("pageSize", pageSize.toString());
    formData.append("alias", alias);

    // Si tout est valide, soumettre le formulaire
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <article className="flex flex-col space-y-2 w-full  md:max-w-[1800px] mx-auto min-h-screen bg-white p-2 sm:p-4">
      {/* Title*/}
      <h1 className="text-3xl font-bold text-gray-900">{dossier?.name}</h1>

      {/* Date */}
      <div className="flex items-center justify-between  py-3 border-b-2 border-blue-500">
        <FormattedDate date={dossier?.formattedDate} />
      </div>

      {/* Image container with bg color */}
      <div className="bg-blue-50 py-8  flex justify-center">
        <ImageWithFallback
          src={imageUrl}
          alt={dossier?.image?.description || dossier?.title}
          color="text-gray-400"
          lang={envConfig?.lang}
        />
      </div>

      {/* Intro text */}
      <div
        className=" py-4  text-sm border-b-2 border-gray-100"
        style={{ textIndent: "1.5rem" }}
      >
        <p>{dossier?.description}</p>
      </div>

      <div className="flex flex-col space-y-6 mt-6 md:mt-10">
        <h2 className="font-bold text-2xl ">
          {translations?.dossier_articles}
        </h2>
        {array.length !== 0 &&
          array?.map((article, index) => {
            return (
              <Link
                key={article?.id_article || index}
                href={`/${article?.alias?.replace(/^\/+/, "")}`}
                prefetch={false}
                className="w-full md:w-[80%] max-w-[1200px] flex flex-col md:flex-row bg-[#F9FAFB] rounded-md overflow-hidden p-4 mb-4 cursor-pointer hover:bg-[#F3F4F6] transition-colors duration-200 block"
              >
                <div className="w-80">
                  {article?.image?.url ? (
                    <Image
                      src={`/${envConfig?.lang}/api/image/${article.image.url}`}
                      alt={article.image.description || dossier.name}
                      width={800}
                      height={600}
                      className="w-full h-full "
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder color="" lang={envConfig?.lang} />
                  )}
                </div>
                <div className="p-4 w-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-xl text-gray-800 mb-2">
                      {article?.title}
                    </h3>
                    {isClient && (
                      <div
                        className="text-sm prose prose-sm sm:prose lg:prose-lg max-w-none text-[#1D589F] line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: article.introtext,
                        }}
                      />
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                    <div className="flex items-center">
                      <FormattedDate date={article?.formattedDate} />
                    </div>
                    <span className="bg-[#1D589F] hover:bg-[#003979] text-white text-sm font-bold px-3 py-1 rounded transition-colors duration-300">
                      {translations?.readMore}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        {/* Pagination */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          dir={dir}
        />
      </div>

      <div className=" mt-6 md:mt-10">
        {dossier?.relatedDossiers.length > 0 && (
          <Dossier_RelatedArticle
            block={dossier?.relatedDossiers}
            envConfig={envConfig}
            dir={dir}
          />
        )}
      </div>
    </article>
  );
}
