import Link from "next/link";
import Image from "next/image";
import { getConfig } from "../../../lib/config";
import { fetchData } from "../../../Api/fetchData";
import translations from "../../../locales/translation";
import Icon from "@mdi/react";
import { mdiFacebook, mdiLinkedin, mdiYoutube } from "@mdi/js";
import FormattedDate from "../../../compoenents/ui/formattedDate";
import BreadCrumb from "../../../compoenents/ui/breadCrumb";

function isArticleAlias(alias) {
  const regex = /^[a-z0-9]{8}-/i;
  if (!regex.test(alias)) {
    return false;
  }

  const letters = /[a-z]/i;
  const digits = /\d/;

  const firstPart = alias.slice(0, 8);

  return letters.test(firstPart) && digits.test(firstPart);
}

export default async function CategoryLayout({ children, params }) {
  const { envConfig, dir } = await getConfig();

  const resolvedParams = await params;
  const slugs = resolvedParams?.slugs ?? [];
  const slugDepth = slugs?.length;

  let response = null;
  let showSidebar = false;
  let updatedSlugs = null;

  if (slugDepth === 1) {
    const [categorySlug] = slugs;
    response = await fetchData(envConfig.baseUrl + "articles/sidebar", "post", {
      categorie: categorySlug,
      subCategorie: null,
    });
    showSidebar = true;
    const categorie = response?.data?.data?.categorie || "";
    updatedSlugs = [{ path: slugs[0], label: categorie }];
  }

  if (slugDepth === 2) {
    const [categorySlug, subCategorySlug] = slugs;

    if (!isArticleAlias(subCategorySlug)) {
      response = await fetchData(
        envConfig.baseUrl + "articles/sidebar",
        "post",
        {
          categorie: categorySlug,
          subCategorie: subCategorySlug,
        }
      );
      showSidebar = true;
      const categorie = response?.data?.data?.categorie || "";
      const subCategorie = response?.data?.data?.subCategorie || "";
      updatedSlugs = [
        { path: slugs[0], label: categorie },
        { path: slugs[1], label: subCategorie },
      ];
    }
  }

  // Si slugDepth = 3 ou slugDepth = 2 && isArticleAlias => layout simple
  if (slugDepth === 3 || (slugDepth === 2 && isArticleAlias(slugs[1]))) {
    return (
      <div className="w-[90%] min-h-screen mx-auto flex flex-col">
        {children}
      </div>
    );
  }

  // Layout avec sidebar
  return (
    <div className="w-full md:w-[90%] min-h-screen mx-auto flex flex-col">
      {/* positionnement*/}
      <div className={dir === "rtl" ? "mr-4" : "ml-4"}>
        <BreadCrumb
          items={updatedSlugs}
          dir={dir}
          isArticleAlias={isArticleAlias}
        />
      </div>

      {/* Contenu principal + sidebar en ligne (flex-row) */}
      <div
        className={`w-full flex gap-4 items-start ${
          dir === "rtl" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Contenu principal */}
        <div
          className={`w-full md:w-[75%] ${
            dir === "rtl" ? "order-2" : "order-1"
          }`}
        >
          {children}
        </div>

        {/* Sidebar */}
        {showSidebar && response?.data?.data && (
          <div
            className={`hidden w-[25%] md:flex flex-col space-y-4 ${
              dir === "rtl" ? "order-1" : "order-2"
            }`}
          >
            {/* Bannière publicitaire */}
            <div className="w-full hidden sm:flex justify-start">
              <Link
                href={`${response.data.data?.banner?.click_url}`}
                className="block w-[90%] mx-auto mb-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={
                    response.data.data?.banner?.url
                      ? "/" +
                        envConfig.lang +
                        "/api/image/" +
                        response.data.data.banner.url
                      : `/${envConfig?.lang}/pub_rectangle.png`
                  }
                  alt={response.data.data?.banner?.name || "Publicité"}
                  width={1062}
                  height={146}
                  className="w-auto h-auto"
                  priority
                />
              </Link>
            </div>

            {/* Réseaux sociaux */}
            <div className="hidden bg-gray-50 p-4 rounded-lg shadow md:block">
              <h3
                className={`font-bold text-black mb-5 ${
                  dir === "rtl"
                    ? "border-r-4 border-[#1E58A1] pr-3"
                    : "border-l-4 border-[#1E58A1] pl-3"
                }`}
              >
                {translations?.followUsTitle}
              </h3>

              <div className="flex gap-4 justify-center">
                <Link
                  href={envConfig?.ApsX}
                  target={envConfig?.ApsX ? "_blank" : "none"}
                  className="flex justify-center items-center"
                >
                  <Image
                    src={`/${envConfig?.lang}/x-2.svg`}
                    alt="twitter"
                    width={24}
                    height={24}
                    style={
                      {
                        //height: "24px",
                        //filter: "brightness(0) invert(1)",
                      }
                    }
                  />
                </Link>
                <Link
                  href={envConfig?.ApsFb}
                  target={envConfig?.ApsFb ? "_blank" : "none"}
                >
                  <Icon
                    path={mdiFacebook}
                    size={2}
                    style={{ color: "#2563EB" }}
                  />
                </Link>
                <Link
                  href={envConfig?.ApsYtb}
                  target={envConfig?.ApsYtb ? "_blank" : "none"}
                >
                  <Icon
                    path={mdiYoutube}
                    size={2}
                    style={{ color: "#DC2626" }}
                  />
                </Link>
                <Link
                  href={envConfig?.ApsLinkedIn}
                  target={envConfig?.ApsLinkedIn ? "_blank" : "none"}
                >
                  <Icon
                    path={mdiLinkedin}
                    size={2}
                    style={{ color: "#1D589F" }}
                  />
                </Link>
              </div>
            </div>

            {/* Les Plus Lus */}
            {response.data.data?.articles?.length > 0 && (
              <div className="hidden bg-gray-50 p-4 rounded-lg shadow md:block">
                <h3
                  className={`font-bold text-black mb-5 ${
                    dir === "rtl"
                      ? "border-r-4 border-[#1E58A1] pr-3"
                      : "border-l-4 border-[#1E58A1] pl-3"
                  }`}
                >
                  {translations?.more_artricles}
                </h3>

                <div className="space-y-3">
                  {response.data.data.articles.map((article, index) => (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
