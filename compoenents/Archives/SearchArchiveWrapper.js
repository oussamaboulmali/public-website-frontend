"use client";
import { useState, useEffect, useActionState, startTransition } from "react";
import translations from "../../locales/translation";
import Calendar from "../ui/calander";
import { mdiAlertCircleOutline, mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import FormattedDate from "../ui/formattedDate";
import Link from "next/link";
import ImagePlaceholder from "../ui/ImageHolder";
import Image from "next/image";
import Pagination from "../ui/pagination";
import DOMPurify from "dompurify";
import Cookies from "js-cookie";
import SubscriberContent from "compoenents/ui/protectedContent";
import { decryptData } from "../../utils/crypto";
import { paginateSearchArchiveAction } from "src/app/actions/actions-server";

export default function Search_Archives_wrapper({
  locales,
  envConfig,
  pageSize,
  dir,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [sortBy, setSortBy] = useState("desc");
  const [category, setCategory] = useState("all");
  const [array, setArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [parsedArray, setParsedArray] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayContent, setDisplayContent] = useState(false);
  const [error, setError] = useState("");
  const [statePaginate, formAction] = useActionState(
    paginateSearchArchiveAction,
    null
  );

  useEffect(() => {
    const encrypted = sessionStorage.getItem("aorm");
    if (!encrypted) return;

    try {
      const decrypted = decryptData(encrypted);
      const parsed = JSON.parse(decrypted);
      const isLoggedValue = parsed[0]?.islogged === "true";

      setDisplayContent(isLoggedValue);
    } catch (err) {}
  }, []);

  useEffect(() => {
    setIsClient(true);
    const myArray = Cookies.get("array");
    setParsedArray(myArray ? JSON.parse(myArray) : []);
  }, []);

  useEffect(() => {
    if (statePaginate?.data?.success) {
      const updatedData = statePaginate?.data?.data?.map((el) => {
        return { ...el, introtext: DOMPurify.sanitize(el.introtext) };
      });

      setArray(updatedData);
      setTotalPage(Math.ceil((statePaginate?.data?.count || 0) / pageSize));
    }
  }, [statePaginate]);

  // Fonction pour changer de page
  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    const formData = new FormData();
    formData.append("page", pageNumber.toString());
    formData.append("pageSize", pageSize.toString());
    formData.append("searchText", searchQuery);
    formData.append("sortBy", sortBy);
    if (category && category !== "all") {
      formData.append("categorie", category);
    }
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      formData.append(
        "publish_date_start",
        selectedDate.toISOString().split("T")[0]
      );
    }

    if (selectedDateEnd instanceof Date && !isNaN(selectedDateEnd.getTime())) {
      formData.append(
        "publish_date_end",
        selectedDateEnd.toISOString().split("T")[0]
      );
    }

    // Si tout est valide, soumettre le formulaire
    startTransition(() => {
      formAction(formData);
    });
  };

  // Fonction pour appliquer les filtres
  const applyFilters = async () => {
    if (searchQuery || sortBy || category || selectedDate) {
      const formData = new FormData();
      formData.append("page", currentPage.toString());
      formData.append("pageSize", pageSize.toString());
      formData.append("searchText", searchQuery);
      formData.append("sortBy", sortBy);

      if (category && category !== "all") {
        formData.append("categorie", category);
      }
      if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
        formData.append(
          "publish_date_start",
          selectedDate.toLocaleDateString("fr-CA")
        );
      }

      if (
        selectedDateEnd instanceof Date &&
        !isNaN(selectedDateEnd.getTime())
      ) {
        formData.append(
          "publish_date_end",
          selectedDateEnd.toLocaleDateString("fr-CA")
        );
      }

      // Si tout est valide, soumettre le formulaire
      startTransition(() => {
        formAction(formData);
      });
    } else {
      setError(translations?.errorMessage);
    }
  };

  const handleDateSelect = (start, end) => {
    setSelectedDate(start);
    setSelectedDateEnd(end);
    setCurrentPage(1);
  };

  /*   // Fonction pour gérer le changement de date dans l'input mobile
  const handleDateInputChange = (e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setSelectedDate(date);
    setCurrentPage(1);
  }; */

  // Initialiser les données au chargement du composant
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const sortByOptions = [
    {
      value: "desc",
      label: translations?.recent,
    },
    {
      value: "asc",
      label: translations?.oldest,
    },
    {
      value: "most",
      label: translations?.popular,
    },
  ];

  return (
    <div
      className={`min-h-screen w-[98%] max-w-[1800px] mx-auto px-4 py-8 `}
      dir={dir}
    >
      {!displayContent ? (
        <SubscriberContent envConfig={envConfig} />
      ) : (
        <>
          {" "}
          <div className="mb-0 flex flex-col space-y-4">
            <h1 className="text-2xl font-semibold">
              {translations?.archivesLabel}
            </h1>
            {/* Filtres en version desktop */}
            <div className="hidden md:flex w-[60%]  flex-col gap-4 mb-4">
              {/* Nouveau bloc de recherche */}
              <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-row gap-4 items-center mb-3">
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder={translations?.searchPlaceholder}
                      className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    onClick={applyFilters}
                  >
                    {translations?.searchButton}
                  </button>
                </div>

                <div className="flex flex-row gap-4 flex-wrap items-center">
                  {/*other tri*/}
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort-by" className="font-medium">
                      {translations?.sortByLabel}
                    </label>
                    <div className="relative">
                      <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-1 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                      >
                        {sortByOptions.map((option, index) => {
                          return (
                            <option key={index} value={option.value}>
                              {option?.label}
                            </option>
                          );
                        })}
                      </select>
                      <Icon
                        path={mdiChevronDown}
                        className={`absolute ${
                          dir === "rtl" ? "left-2" : "right-2"
                        } top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500`}
                      />
                    </div>
                  </div>
                  {/* Catégorie */}
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="category"
                      className="font-medium text-sm text-gray-700"
                    >
                      {translations?.categoryLabel || "Catégorie"}
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-1 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                      >
                        <option value="all">
                          {translations?.allCat || "Toutes"}
                        </option>
                        {isClient &&
                          parsedArray?.map((option) => {
                            return (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            );
                          })}
                      </select>
                      <Icon
                        path={mdiChevronDown}
                        className={`absolute ${
                          dir === "rtl" ? "left-2" : "right-2"
                        } top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Version mobile du formulaire de recherche */}
            <div className=" w-[99%] md:w-[60%] md:hidden flex flex-col gap-3 mb-4">
              {/* Bloc de recherche optimisé pour mobile */}
              <div className="flex flex-col bg-white p-3  space-y-4 rounded-lg shadow-sm border border-gray-200">
                {/* Champ de recherche */}
                <div className="w-full mb-3">
                  <input
                    type="text"
                    placeholder={
                      translations?.searchPlaceholder || "Rechercher..."
                    }
                    className="w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-4 text-base focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setError("");
                    }}
                  />
                </div>

                {/* Options de filtrage en colonnes pour mobile */}
                <div className="flex flex-col gap-3">
                  {/* Tri */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="sort-by-mobile"
                      className="font-medium text-sm text-gray-700 mb-1"
                    >
                      {translations?.sortByLabel || "Trier par"}
                    </label>
                    <div className="relative">
                      <select
                        id="sort-by-mobile"
                        value={sortBy}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                          setError("");
                        }}
                        className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                      >
                        {sortByOptions.map((option, index) => {
                          return (
                            <option key={index} value={option.value}>
                              {option?.label}
                            </option>
                          );
                        })}
                      </select>
                      <Icon
                        path={mdiChevronDown}
                        className={`absolute ${
                          dir === "rtl" ? "left-2" : "right-2"
                        } top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500`}
                      />
                    </div>
                  </div>

                  {/* Catégorie */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="category-mobile"
                      className="font-medium text-sm text-gray-700 mb-1"
                    >
                      {translations?.categoryLabel || "Catégorie"}
                    </label>
                    <div className="relative">
                      <select
                        id="category-mobile"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setError("");
                        }}
                        className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                      >
                        <option value="all">
                          {translations?.allCat || "Toutes"}
                        </option>
                        {isClient &&
                          parsedArray?.map((option) => {
                            return (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            );
                          })}
                      </select>
                      <Icon
                        path={mdiChevronDown}
                        className={`absolute ${
                          dir === "rtl" ? "left-2" : "right-2"
                        } top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500`}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="mobile-date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {translations?.dateLabel}
                    </label>
                    <input
                      type="date"
                      id="mobile-date"
                      value={
                        selectedDate
                          ? selectedDate.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const date = e.target.value
                          ? new Date(e.target.value)
                          : null;
                        setSelectedDate(date);
                      }}
                      className="w-full bg-gray-50 border text-gray-700 text-[15px] border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                    />
                  </div>

                  <button
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors text-base"
                    onClick={applyFilters}
                  >
                    {translations?.searchButton}
                  </button>
                  <span className="text-red-600 text-sm">{error}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-6 mt-2">
            {array?.length > 0 && (
              <div>
                <h1 className="text-xl font-semibold">
                  {translations?.searchResult} &quot; {searchQuery} &quot;
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {array?.length || 0}&nbsp;&nbsp;
                  {translations?.foundPost}
                </p>
              </div>
            )}

            <div className="mt-0 flex flex-col md:flex-row gap-4 md:gap-10">
              <div className="w-full md:w-4/5">
                {array && array.length > 0 ? (
                  <>
                    {array.map((article, index) => (
                      <Link
                        key={article?.id_article || index}
                        href={`/archive/${article?.alias?.replace(/^\/+/, "")}`}
                        className={`w-full flex flex-col md:flex-row bg-[#F9FAFB] rounded-md overflow-hidden p-4 mb-4 ${
                          dir === "rtl" ? "md:flex-row-reverse text-right" : ""
                        }`}
                        prefetch={false}
                      >
                        <div className="w-full md:w-80 h-48 md:h-auto mb-4 md:mb-0">
                          {article?.image?.url ? (
                            <Image
                              src={`/${envConfig?.lang}/api/image/${article.image.url}`}
                              alt={article.image.description || article.title}
                              width={500}
                              height={500}
                              //className="w-full h-full object-cover rounded-md"
                              loading="lazy"
                            />
                          ) : (
                            <ImagePlaceholder color="" lang={envConfig?.lang} />
                          )}
                        </div>
                        <div
                          className={`p-0 md:p-4 w-full flex flex-col justify-between ${
                            dir === "rtl"
                              ? "md:pr-0 md:pl-4"
                              : "md:pl-4 md:pr-0"
                          }`}
                        >
                          <div>
                            <h1 className="font-bold text-[24px] text-gray-800 mb-2">
                              {article?.title}
                            </h1>
                            <div
                              className="prose prose-sm sm:prose max-w-none text-[#1D589F] line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: article.introtext,
                              }}
                            />
                          </div>

                          <div
                            className={`flex justify-between items-center mt-2 ${
                              dir === "rtl" ? "flex-row-reverse" : ""
                            }`}
                          >
                            <div className="flex items-center text-xs text-gray-500">
                              <FormattedDate date={article?.formattedDate} />
                            </div>
                            <div className="bg-[#1D589F] hover:bg-[#003979] text-white text-sm font-bold px-3 py-1.5 rounded transition-colors duration-300">
                              {translations?.readMore}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}

                    {/* Pagination */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      paginate={paginate}
                      dir={dir}
                    />
                  </>
                ) : (
                  <div className="w-full bg-gray-50 rounded-lg p-8 text-center ">
                    <div className="flex flex-col items-center justify-center">
                      <Icon
                        path={mdiAlertCircleOutline}
                        className="w-16 h-16 text-gray-400 mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {translations?.noDataFound}
                      </h3>
                      <p className="text-gray-500 text-sm max-w-md">
                        {translations?.tryDifferentSearch}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Calendrier - visible uniquement en desktop */}
              <div className="hidden md:block">
                <Calendar
                  locale={locales}
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                  onRangeSelect={(start, end) => {
                    handleDateSelect(start, end);
                  }}
                  dir={dir}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
