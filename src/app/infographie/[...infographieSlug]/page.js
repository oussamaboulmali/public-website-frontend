"use server";
import { notFound } from "next/navigation";
import { fetchData } from "../../../../Api/fetchData";
import InfographieContent from "../../../../compoenents/Infographies/infographieContent";
import BreadCrumb from "../../../../compoenents/ui/breadCrumb";
import Error from "../../../../compoenents/ui/maintenance";
import { getConfig } from "../../../../lib/config";
import translations from "locales/translation";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { envConfig } = await getConfig();
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = "https";
  const domain = `${protocol}://${host}`;
  const paramss = await params;
  const slugs = paramss?.infographieSlug ?? [];

  // Appel API pour récupérer les données de l'article
  const response = await fetchData(
    envConfig.baseUrl + "infographies/detail",
    "POST",
    {
      alias: slugs[0],
    }
  );
  const article = response?.data?.data;

  if (!article) {
    return null;
  }

  // Construction de l'URL canonique
  const canonical = `${domain}/${envConfig.lang}/infographie/${slugs?.join(
    "/"
  )}`.replace(/\/+$/, "");

  return {
    title: article?.name,
    description: article?.introtext || article?.name,
    alternates: {
      canonical: canonical.replace(/^\/+/, ""),
    },
    openGraph: {
      title: article?.name,
      description: article?.description,
      type: "article",
      url: ``,
      images: [
        {
          url: `${
            domain + "/" + envConfig.lang + "/assets/" + article?.image?.url
          }`,
          width: 800,
          height: 500,
          alt: article?.image?.description,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title,
      description: article?.description,
      images: [
        {
          url: `${domain}/${envConfig.lang}/assets/${
            article?.image?.url || ""
          }`,
          width: 500,
          height: 300,
          alt: article?.image?.description,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { envConfig, dir } = await getConfig();
  const paramsValue = await params;
  const slug = paramsValue?.infographieSlug;
  const infographieDetails = await fetchData(
    envConfig.baseUrl + "infographies/detail",
    "post",
    {
      alias: slug[0],
    }
  );
  let updatedSlugs = [
    // { path: null, label: "Multimédia" },
    { path: "infographie", label: translations?.infographie },
    { path: slug[0], label: infographieDetails?.data?.data?.name },
  ];

  // Vérifiez status api
  if (infographieDetails.status >= 400 && infographieDetails.status < 500) {
    notFound();
  }

  if (infographieDetails.status >= 300 && infographieDetails.status < 400) {
    redirect(infographieDetails?.data?.data?.alias);
  }

  if (infographieDetails.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }
  return (
    <div className="w-[90%] mx-auto">
      <BreadCrumb items={updatedSlugs} dir={dir} others={true} />
      <InfographieContent
        infographie={infographieDetails?.data?.data}
        envConfig={envConfig}
        dir={dir}
        alias={slug[0]}
      />
    </div>
  );
}
