"use client";
import Link from "next/link";
import Image from "next/image";
import translations from "../../locales/translation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { mdiAlertCircleOutline, mdiMenuDown, mdiMenuUp } from "@mdi/js";
import Icon from "@mdi/react";
import ReadMore from "../ui/readMore";
import ImagePlaceholder from "compoenents/ui/ImageHolder";
import { paginateActualityAction } from "src/app/actions/actions-server";

const Actualités = ({ block, envConfig, dir }) => {
  const [activeCategorieId, setActiveCategorieId] = useState(
    block?.categorieId
  );
  const [activeSubCategorieId, setActiveSubCategorieId] = useState(
    block?.subCategorieId
  );
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [alias, setAlias] = useState(block?.alias || "");
  const [articles, setArticles] = useState(block?.articles || []);
  const categories = block?.categooriesList;
  const [stateActuality, formAction] = useActionState(
    paginateActualityAction,
    null
  );

  // Initialiser la catégorie et la subcategorie ouverte par défaut
  useEffect(() => {
    setActiveCategorieId(block?.categorieId);
    setExpandedCategoryId(block?.categorieId);

    const activeCategory = categories?.find(
      (cat) => cat.id_categorie === block?.categorieId
    );

    if (activeCategory && activeCategory.subCategorie.length > 0) {
      if (block?.subCategorieId) {
        setActiveSubCategorieId(block?.subCategorieId);
      } else {
        setActiveSubCategorieId(activeCategory.subCategorie[0].id_subCategorie);
      }
    } else {
      setActiveSubCategorieId(null);
    }
  }, [block, categories]);

  // Fonction pour changer de page
  useEffect(() => {
    if (stateActuality?.status === 200) {
      setArticles(stateActuality?.data?.data);
      setAlias(stateActuality.data.globalAlias);
    } else {
      setActiveCategorieId(block?.categorieId);
      setActiveSubCategorieId(block?.subCategorieId);
      setExpandedCategoryId(block?.categorieId);
      setArticles(block?.articles);
      setAlias(block.alias);
    }
  }, [stateActuality]);

  const handleCategoryClick = (categorieId) => {
    const isCurrentlyExpanded = expandedCategoryId === categorieId;

    setActiveCategorieId(categorieId);
    setExpandedCategoryId(isCurrentlyExpanded ? null : categorieId);

    const clickedCategory = categories
      ? categories?.find((cat) => cat?.id_categorie === categorieId)
      : null;

    if (!isCurrentlyExpanded && clickedCategory?.subCategorie.length > 0) {
      setActiveSubCategorieId(clickedCategory.subCategorie[0].id_subCategorie);
    }

    // Si la catégorie a des sous-catégories
    if (clickedCategory?.subCategorie?.length > 0) {
      const firstSubCatId = clickedCategory.subCategorie[0].id_subCategorie;
      setActiveSubCategorieId(firstSubCatId);

      // Appeler l'API avec la première sous-catégorie, dans tous les cas
      try {
        /* const response = await fetchData(
          envConfig.baseUrl + "home/actualites",
          "post",
          {
            categorieId: categorieId,
            subCategorieId: clickedCategory.subCategorie[0].id_subCategorie,
          },
          true,
          false
        ); */

        const formData = new FormData();
        formData.append("categorieId", categorieId);
        formData.append(
          "subCategorieId",
          clickedCategory.subCategorie[0].id_subCategorie
        );
        startTransition(() => {
          formAction(formData);
        });
      } catch (error) {
        setActiveCategorieId(block?.categorieId);
        setActiveSubCategorieId(block?.subCategorieId);
        setExpandedCategoryId(block?.categorieId);
        setAlias(block.alias);
        setArticles(block?.articles);
      }
    } else {
      // Si pas de sous-catégorie, appeler l'API avec seulement la catégorie

      try {
        /* const response = await fetchData(
          envConfig.baseUrl + "home/actualites",
          "post",
          {
            categorieId: categorieId,
            subCategorieId: null,
          },
          true,
          false
        );
        if (response.status === 200) {
          setArticles(response?.data?.data);
          setAlias(response.data.globalAlias);
        } else {
          setActiveCategorieId(block?.categorieId);
          setActiveSubCategorieId(block?.subCategorieId);
          setExpandedCategoryId(block?.categorieId);
          setArticles(block?.articles);
          setAlias(block.alias);
        } */
        const formData = new FormData();
        formData.append("categorieId", categorieId);
        /* formData.append(
          "subCategorieId",
          clickedCategory.subCategorie[0].id_subCategorie
        ); */
        startTransition(() => {
          formAction(formData);
        });
      } catch (error) {
        setActiveCategorieId(block?.categorieId);
        setActiveSubCategorieId(block?.subCategorieId);
        setExpandedCategoryId(block?.categorieId);
        setAlias(block.alias);
        setArticles(block?.articles);
      }
    }
  };

  return (
    <div>
      {/* Design desktop */}
      <div className="hidden w-[100%] min-h-screen bg-[#2F3648] items-center text-white p-6 m-auto md:block ">
        <div className="w-[90%] 2xl:w-[80%] mx-auto pt-6 ">
          <div className="relative w-full px-0">
            <div className="absolute bottom-0 left-0 w-full border-b-3 border-gray-300/40" />

            <span className="relative z-10 inline-block text-[28px] font-bold text-[#7DB0D5] border-b-3 border-[#7DB0D5] pb-1">
              {translations?.actualité}
            </span>
          </div>

          <div className="flex p-5 items-start min-h-[calc(100vh-200px)]">
            {/* Navigation verticale des catégories */}
            <div className="w-1/4 pr-4 pt-6">
              <div className="flex flex-col space-y-6">
                {categories?.map((categorie) => {
                  const isExpanded =
                    expandedCategoryId === categorie.id_categorie;

                  return (
                    <div key={categorie.id_categorie}>
                      <button
                        className={`w-full text-left px-4 py-2 font-bold flex justify-start items-center gap-8 ${
                          activeCategorieId === categorie.id_categorie
                            ? "text-[#7DB0D5] font-bold"
                            : "text-gray-300 hover:bg-gray-700/40"
                        }`}
                        onClick={() => {
                          handleCategoryClick(categorie.id_categorie);
                        }}
                      >
                        <span className="text-[18px]">{categorie.name}</span>
                        {categorie.subCategorie.length > 0 && (
                          <span className="text-xs">
                            {isExpanded ? (
                              <Icon path={mdiMenuUp} size={1.5} />
                            ) : (
                              <Icon path={mdiMenuDown} size={1.5} />
                            )}
                          </span>
                        )}
                      </button>

                      {/* Sous-catégories affichées seulement si c'est la bonne */}
                      {isExpanded && categorie.subCategorie.length > 0 && (
                        <div
                          className={`${
                            dir === "rtl" ? "mr-4" : "ml-4"
                          } mt-1 flex flex-col space-y-4`}
                        >
                          {categorie.subCategorie.map((subCat) => (
                            <button
                              key={subCat.id_subCategorie}
                              className={`px-4 py-2 text-left font-medium ${
                                dir === "rtl" ? "mr-4 text-right" : "ml-4"
                              } ${
                                activeSubCategorieId ===
                                  subCat.id_subCategorie &&
                                activeCategorieId === categorie.id_categorie
                                  ? `text-[#7DB0D5] ${
                                      dir === "rtl"
                                        ? "border-r-4"
                                        : "border-l-4"
                                    } border-[#7DB0D5]`
                                  : "text-gray-400 hover:bg-gray-700/30"
                              }`}
                              onClick={async () => {
                                setActiveCategorieId(categorie.id_categorie);
                                setActiveSubCategorieId(subCat.id_subCategorie);
                                try {
                                  const formData = new FormData();
                                  formData.append(
                                    "categorieId",
                                    categorie.id_categorie
                                  );
                                  formData.append(
                                    "subCategorieId",
                                    subCat.id_subCategorie
                                  );
                                  startTransition(() => {
                                    formAction(formData);
                                  });
                                } catch (error) {
                                  setActiveCategorieId(block?.categorieId);
                                  setExpandedCategoryId(block?.categorieId);
                                  setActiveSubCategorieId(
                                    block?.subCategorieId
                                  );
                                  setAlias(block?.alias);
                                  setArticles(block?.articles);
                                }
                              }}
                            >
                              {subCat.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contenu de la sous-catégorie sélectionnées */}
            <div className="w-3/4 p-6">
              {articles?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                  <Icon
                    path={mdiAlertCircleOutline}
                    size={3}
                    className="text-gray-400 mb-4"
                  />
                  <p className="text-xl text-gray-400 font-medium">
                    {translations?.nopost}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Article principal */}
                  <Link
                    href={`/${articles?.[0]?.alias}`}
                    className="md:col-span-2 flex flex-col"
                  >
                    <div className="relative h-[300px] md:h-[480px] rounded-[4px] overflow-hidden flex-grow">
                      {articles?.[0]?.image?.url !== undefined ? (
                        <Image
                          src={`/${
                            envConfig?.lang +
                            "/api/image/" +
                            articles?.[0]?.image?.url
                          }`}
                          alt={
                            articles?.[0]?.image?.description ||
                            articles?.[0]?.title ||
                            ""
                          }
                          width={900}
                          height={800}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <ImagePlaceholder color="" lang={envConfig?.lang} />
                      )}
                    </div>

                    <div className="mt-4">
                      <h2 className="text-[20px] md:text-[22px] font-bold line-clamp-2">
                        {articles?.[0]?.title}
                      </h2>
                      <div className="text-sm text-gray-400 mt-2">
                        {articles?.[0]?.formattedDate
                          ?.split(" ")
                          .slice(0, 4)
                          .join(" ")}
                      </div>
                    </div>
                  </Link>

                  {/* Deux articles plus petits à droite */}
                  <div className="flex flex-col gap-4 md:gap-6">
                    {articles?.slice(1, 3).map((article, index) => (
                      <Link
                        key={article?.id_article || index}
                        href={`/${article.alias}`}
                        className="flex flex-col"
                      >
                        <div className="relative h-[150px] md:h-[200px] rounded-[4px] overflow-hidden">
                          {article?.image?.url !== undefined ? (
                            <Image
                              src={`/${
                                envConfig?.lang +
                                "/api/image/" +
                                article?.image?.url
                              }`}
                              alt={
                                article?.image?.description || article?.title
                              }
                              width={400}
                              height={250}
                              //className="w-full h-full object-cover"
                              className="w-full h-full "
                              loading="lazy"
                            />
                          ) : (
                            <ImagePlaceholder color="" lang={envConfig?.lang} />
                          )}
                        </div>

                        <div className="mt-3">
                          <h3 className="text-sm md:text-base lg:text-lg font-semibold line-clamp-2">
                            {article.title}
                          </h3>
                          <div className="text-xs text-gray-400 mt-1">
                            {article?.formattedDate
                              ?.split(" ")
                              .slice(0, 4)
                              .join(" ")}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <ReadMore url={alias || ""} dir={dir} />
        </div>
      </div>

      {/* Design mobile */}
      <div className="block md:hidden">
        <div className="w-[94%] mx-auto bg-white p-2 rounded-[5px] shadow-lg flex flex-col space-y-4">
          {/* Titre de la section */}
          <div className="relative w-full px-0">
            <div className="absolute bottom-0 left-0 w-full border-b-3 border-black/10" />

            <span className="relative z-10 inline-block text-[26px] font-bold text-[#7DB0D5] border-b-3 border-[#7DB0D5] pb-1">
              {translations?.actualité}
            </span>
          </div>

          {/* Ligne horizontale pour les catégories */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex  whitespace-nowrap px-2 py-1 gap-4 ">
              {categories?.map((categorie) => (
                <button
                  key={categorie.id_categorie}
                  className={`px-3 py-1 rounded-md text-sm font-medium flex-shrink-0 transition-colors ${
                    activeCategorieId === categorie.id_categorie
                      ? "bg-[#7DB0D5]/10 text-[#7DB0D5] font-bold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleCategoryClick(categorie.id_categorie)}
                >
                  {categorie.name}
                </button>
              ))}
            </div>
          </div>

          {/* Ligne horizontale pour les sous-catégories (si disponibles) */}
          {categories &&
            categories?.find((cat) => cat.id_categorie === activeCategorieId)
              ?.subCategorie?.length > 0 && (
              <div className="overflow-x-auto border-t border-b border-gray-100 p-2 scrollbar-hide">
                <div className="flex whitespace-nowrap px-2 py-1 gap-2">
                  {categories
                    .find((cat) => cat?.id_categorie === activeCategorieId)
                    ?.subCategorie.map((subCat) => (
                      <button
                        key={subCat.id_subCategorie}
                        className={`px-3 py-1 rounded-md text-xs font-medium flex-shrink-0 transition-colors ${
                          activeSubCategorieId === subCat.id_subCategorie
                            ? "bg-[#7DB0D5]/10 text-[#7DB0D5] border-b-2 border-[#7DB0D5]"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                        onClick={async () => {
                          setActiveCategorieId(activeCategorieId);
                          setActiveSubCategorieId(subCat.id_subCategorie);
                          try {
                            /* const response = await fetchData(
                              envConfig.baseUrl + "home/actualites",
                              "post",
                              {
                                categorieId: activeCategorieId,
                                subCategorieId: subCat.id_subCategorie,
                              },
                              true,
                              false
                            );
                            if (response.status === 200) {
                              setArticles(response?.data?.data);
                              setAlias(response.data.globalAlias);
                            } else {
                              setActiveCategorieId(block?.categorieId);
                              setActiveSubCategorieId(block?.subCategorieId);
                              setExpandedCategoryId(block?.categorieId);
                              setAlias(block?.alias);
                              setArticles(block?.articles);
                            } */
                            const formData = new FormData();
                            formData.append("categorieId", activeCategorieId);
                            formData.append(
                              "subCategorieId",
                              subCat.id_subCategorie
                            );
                            startTransition(() => {
                              formAction(formData);
                            });
                          } catch (error) {
                            setActiveCategorieId(block?.categorieId);
                            setExpandedCategoryId(block?.categorieId);
                            setActiveSubCategorieId(block?.subCategorieId);
                            setAlias(block?.alias);
                            setArticles(block?.articles);
                          }
                        }}
                      >
                        {subCat.name}
                      </button>
                    ))}
                </div>
              </div>
            )}

          {/* Articles en version mobile */}
          <div className="pt-2">
            {/* Article principal */}
            {articles?.length > 0 ? (
              <Link
                href={`/${articles?.[0].alias}`}
                className="flex flex-col mb-6"
              >
                <div className="relative h-48 rounded-[4px] overflow-hidden w-full">
                  {articles[0]?.image?.url ? (
                    <Image
                      src={`/${
                        envConfig?.lang +
                        "/api/image/" +
                        articles[0]?.image?.url
                      }`}
                      alt={
                        articles[0]?.image?.description || articles[0]?.title
                      }
                      width={500}
                      height={300}
                      //className="w-full h-full object-cover"
                      className="w-full h-full "
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder color="" lang={envConfig?.lang} />
                  )}
                </div>
                <div className="mt-3">
                  <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {articles[0]?.title}
                  </h2>
                  <div className="text-xs text-gray-500 mt-1">
                    {articles[0]?.formattedDate
                      ?.split(" ")
                      .slice(0, 4)
                      .join(" ")}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[480px]">
                <Icon
                  path={mdiAlertCircleOutline}
                  size={3}
                  className="text-gray-400 mb-4"
                />
                <p className="text-xl text-gray-400 font-medium">
                  {translations?.nopost}
                </p>
              </div>
            )}

            {/* Articles secondaires */}
            <div className="space-y-4">
              {articles?.slice(1, 3).map((article, index) => (
                <Link
                  key={article?.id_article || index}
                  href={`/${article.alias}`}
                  className="flex gap-3 items-start"
                >
                  <div className="relative h-20 w-24 flex-shrink-0 rounded-[4px] overflow-hidden">
                    {article?.image?.url !== undefined ? (
                      <Image
                        src={`/${
                          envConfig?.lang + "/api/image/" + article?.image?.url
                        }`}
                        alt={article?.image?.description || article?.title}
                        width={1000}
                        height={800}
                        // className="w-full h-full object-cover"
                        // className="w-full h-full "
                        loading="lazy"
                      />
                    ) : (
                      <ImagePlaceholder color="" lang={envConfig?.lang} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="text-xs text-gray-500 mt-1">
                      {article?.formattedDate?.split(" ").slice(0, 4).join(" ")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <ReadMore url={alias || ""} dir={dir} />
        </div>
      </div>
    </div>
  );
};

export default Actualités;
