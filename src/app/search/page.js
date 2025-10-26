"use server";
import { fetchData } from "../../../Api/fetchData";
import { getConfig } from "../../../lib/config";
import Search_wrapper from "../../../compoenents/Search/searchWrapper";
import { notFound } from "next/navigation";
import Error from "../../../compoenents/ui/maintenance";

export default async function SearchPage({ params, searchParams }) {
  const { envConfig, dir, locales } = await getConfig();
  const searchParamsValue = await searchParams;
  const value = searchParamsValue?.q;
  const pageSize = 12;

  const searchArticle = await fetchData(
    envConfig.baseUrl + "articles/search",
    "post",
    {
      searchText: value,
      pageSize: pageSize,
      page: 1,
    }
  );
  const results = searchArticle?.data?.data || [];
  const totalResults = searchArticle?.data?.count;

  // Vérifiez status api
  if (searchArticle.status >= 400 && searchArticle.status < 500) {
    notFound();
  }

  if (searchArticle.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <Search_wrapper
      locales={locales}
      results={results}
      totalResults={totalResults}
      value={value}
      envConfig={envConfig}
      pageSize={pageSize}
      dir={dir}
    />
  );
}
