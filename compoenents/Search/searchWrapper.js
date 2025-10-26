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
import { paginateSearchAction } from "src/app/actions/actions-server";

export default function Search_wrapper({
  locales,
  value,
  results,
  totalResults,
  envConfig,
  pageSize,
  dir,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [sortBy, setSortBy] = useState("desc");
  const [category, setCategory] = useState("all");
  const [array, setArray] = useState(results || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(
    Math.ceil((totalResults || results.length || 0) / pageSize)
  );
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [parsedArray, setParsedArray] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [statePaginate, formAction] = useActionState(
    paginateSearchAction,
    null
  );

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
      setTotalPage(
        Math.ceil(
          (statePaginate?.data?.count || results.length || 0) / pageSize
        )
      );
    }
  }, [statePaginate]);

  // Fonction pour changer de page
  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    const formData = new FormData();
    formData.append("page", pageNumber.toString());
    formData.append("pageSize", pageSize.toString());
    formData.append("searchText", value);
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

  // Appliquer les filtres quand les filtres changent
  useEffect(() => {
    if (filtersChanged) {
      applyFilters();
    }
  }, [sortBy, category, selectedDate, filtersChanged]);

  // Fonction pour appliquer les filtres
  const applyFilters = async () => {
    const formData = new FormData();
    formData.append("page", currentPage.toString());
    formData.append("pageSize", pageSize.toString());
    formData.append("searchText", value);
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

  // Gérer le changement de tri
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setFiltersChanged(true);
  };

  // Gérer le changement de catégorie
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFiltersChanged(true);
    setCurrentPage(1);
  };

  const handleDateSelect = (start, end) => {
    setSelectedDate(start);
    setSelectedDateEnd(end);
    setFiltersChanged(true);
    setCurrentPage(1);
  };

  // Fonction pour gérer le changement de date dans l'input mobile
  const handleDateInputChange = (e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setSelectedDate(date);
    setFiltersChanged(true);
    setCurrentPage(1);
  };

  // Initialiser les données au chargement du composant
  useEffect(() => {
    setCurrentPage(1);
    setFiltersChanged(false);
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
      <div className="mb-0 flex flex-col space-y-4">
        <h1 className="text-xl font-semibold">
          {translations?.searchResult} &quot; {value} &quot;
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {totalResults || 0}&nbsp;&nbsp;
          {translations?.foundPost}
        </p>

        {/* Filtres en version desktop */}
        <div className="hidden md:flex flex-wrap gap-4 items-center text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="font-medium">
              {translations?.sortByLabel}
            </label>
            <div className="relative">
              <select
                id="sort-by"
                value={sortBy}
                onChange={handleSortChange}
                className={`appearance-none bg-gray-50 border border-gray-300 rounded-md py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 ${
                  dir === "rtl" ? "pr-3 pl-8" : "pl-3 pr-8"
                }`}
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

          <div className="flex items-center gap-2">
            <label htmlFor="category" className="font-medium">
              {translations?.categoryLabel}
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className={`appearance-none bg-gray-50 border border-gray-300 rounded-md py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 ${
                  dir === "rtl" ? "pr-3 pl-8" : "pl-3 pr-8"
                }`}
              >
                <option value="all">{translations?.allCat}</option>
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

        {/* Filtres en version mobile (carte) */}
        <div className="md:hidden bg-white shadow rounded-lg p-4 mb-4">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="mobile-sort-by"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {translations?.sortByLabel}
              </label>
              <div className="relative">
                <select
                  id="mobile-sort-by"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full appearance-none bg-gray-50 border text-gray-700 text-[15px] border-gray-300 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                >
                  {sortByOptions?.map((option, index) => (
                    <option key={option.value} value={option.value}>
                      {option?.label}
                    </option>
                  ))}
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
                htmlFor="mobile-category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {translations?.categoryLabel}
              </label>
              <div className="relative">
                <select
                  id="mobile-category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full appearance-none text-gray-700 text-[15px] bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                >
                  <option value="all">{translations?.allCat}</option>
                  {parsedArray.map((option, index) => {
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
                  selectedDate ? selectedDate.toISOString().split("T")[0] : ""
                }
                onChange={handleDateInputChange}
                className="w-full bg-gray-50 border text-gray-700 text-[15px] border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-0 flex flex-col md:flex-row gap-4 md:gap-10">
        <div className="w-full md:w-4/5">
          {array && array.length > 0 ? (
            <>
              {array.map((article, index) => {
                const articleUrl = `/${article?.alias?.replace(/^\/+/, "")}`;

                return (
                  <Link
                    key={article?.id_article || index}
                    href={articleUrl}
                    className={`w-full flex flex-col md:flex-row bg-[#F9FAFB] rounded-md overflow-hidden p-4 mb-4 cursor-pointer hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-200 block ${
                      dir === "rtl" ? "md:flex-row-reverse text-right" : ""
                    }`}
                  >
                    <div className="w-full md:w-80 h-48 md:h-auto mb-4 md:mb-0">
                      {article?.image?.url ? (
                        <Image
                          src={
                            "/" +
                            envConfig?.lang +
                            "/api/image/" +
                            article.image.url
                          }
                          alt={article?.image?.description || article?.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover rounded-md"
                          loading="lazy"
                        />
                      ) : (
                        <ImagePlaceholder color="" lang={envConfig?.lang} />
                      )}
                    </div>
                    <div
                      className={`p-0 md:p-4 w-full flex flex-col justify-between ${
                        dir === "rtl" ? "md:pr-0 md:pl-4" : "md:pl-4 md:pr-0"
                      }`}
                    >
                      <div>
                        <h3 className="font-medium text-xl text-gray-800 mb-2 hover:text-[#1D589F] transition-colors">
                          {article?.title}
                        </h3>
                        <div
                          className="text-sm prose prose-sm sm:prose max-w-none text-[#1D589F] line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: article.introtext,
                          }}
                        />
                      </div>

                      <div
                        className={`flex justify-between items-center text-xs text-gray-500 mt-2 ${
                          dir === "rtl" ? "flex-row-reverse" : ""
                        }`}
                      >
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
  );
}
