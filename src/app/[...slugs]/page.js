import { fetchData } from "../../../Api/fetchData";
import { getConfig } from "../../../lib/config";
import Error from "../../../compoenents/ui/maintenance";
import { notFound, redirect } from "next/navigation";
import ArticleList from "../../../compoenents/Posts/postsList";
import BreadCrumb from "../../../compoenents/ui/breadCrumb";
import PostContent from "../../../compoenents/Posts/postContent";
import { cookies, headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { envConfig } = await getConfig();
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = "https";
  const domain = `${protocol}://${host}`;

  const paramss = await params;
  const slugs = paramss?.slugs ?? [];

  // Si on n'est pas dans une page d'article (donc seulement catégorie ou autre), on skippe.
  if (slugs.length < 2) {
    return null;
  }

  // Préparer le body pour l'API
  let body = {};
  if (slugs.length === 3) {
    body = {
      categorie: slugs[0],
      subCategorie: slugs[1],
      alias: slugs[2],
    };
  } else if (slugs.length === 2) {
    const testResponse = await fetchData(
      envConfig.baseUrl + "articles/check",
      "post",
      {
        alias: slugs[1],
      }
    );

    if (testResponse?.data?.data) {
      return null;
    }
    body = {
      categorie: slugs[0],
      alias: slugs[1],
    };
  } else {
    return null;
  }

  // Appel API pour récupérer les données de l'article
  const response = await fetchData(
    envConfig.baseUrl + "articles/detail",
    "post",
    body
  );
  const article = response?.data?.data;

  if (!article) {
    return null;
  }

  // Construction de l'URL canonique
  const canonical = `${domain}/${envConfig.lang}/${slugs?.join("/")}`.replace(
    /\/+$/,
    ""
  );

  return {
    title: article?.title,
    description: article?.introtext || article?.title,
    alternates: {
      canonical: canonical.replace(/^\/+/, ""),
    },
    openGraph: {
      title: article?.title,
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
        `${
          domain +
          "/" +
          envConfig.lang +
          encodeURI("/assets/" + (article?.image?.url || ""))
        }`,
      ],
    },
  };
}

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

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slugs = resolvedParams?.slugs ?? [];
  const pageSize = 12;
  const { envConfig, dir } = await getConfig();

  // Si nous avons un seul segment, c'est une catégorie sans sous-catégorie
  if (slugs.length === 1) {
    const categorySlug = slugs[0];
    const articlesList = await fetchData(
      envConfig.baseUrl + "articles",
      "post",
      {
        pageSize: pageSize,
        page: 1,
        categorie: categorySlug,
        subCategorie: null,
      }
    );

    // Vérifiez status api
    if (articlesList.status >= 400 && articlesList.status < 500) {
      notFound();
    }

    if (articlesList.status >= 500) {
      return <Error dir={dir} envConfig={envConfig} />;
    }

    return (
      <ArticleList
        articles={articlesList?.data?.data}
        count={articlesList?.data?.count}
        pageSize={pageSize}
        envConfig={envConfig}
        dir={dir}
        category={categorySlug}
        subCategory={null}
      />
    );
  }
  // Si nous avons deux segments, c'est une catégorie snas sous-catégorie
  else if (slugs.length === 2) {
    const [categorySlug, subCategorySlug] = slugs;
    if (isArticleAlias(subCategorySlug)) {
      const cookiesAwaited = await cookies();
      const cookiesUpdated = cookiesAwaited?.get(envConfig?.cookiesName);
      const cookiesValue = cookiesUpdated?.value;
      const article = await fetchData(
        envConfig.baseUrl + "articles/detail",
        "post",
        {
          categorie: categorySlug,
          subCategorie: null,
          alias: subCategorySlug,
        },
        false,
        false,
        cookiesValue
      );
      let updatedSlugs = [
        { path: categorySlug, label: article?.data?.data?.categorie },
        { path: subCategorySlug, label: article?.data?.data?.title },
      ];

      // Vérifiez status api
      if (article.status)
        if (article.status >= 400 && article.status < 500) {
          notFound();
        }

      if (article.status >= 500) {
        return <Error dir={dir} envConfig={envConfig} />;
      }
      return (
        <>
          <BreadCrumb
            items={updatedSlugs}
            dir={dir}
            isArticleAlias={isArticleAlias}
          />
          <PostContent article={article?.data?.data} />
        </>
      );
    }
    const articlesList = await fetchData(
      envConfig.baseUrl + "articles",
      "post",
      {
        pageSize: pageSize,
        page: 1,
        categorie: categorySlug,
        subCategorie: subCategorySlug,
      }
    );
    // Vérifiez status api
    if (articlesList.status)
      if (articlesList.status >= 400 && articlesList.status < 500) {
        notFound();
      }

    if (articlesList.status >= 500) {
      return <Error dir={dir} envConfig={envConfig} />;
    }
    return (
      <ArticleList
        articles={articlesList?.data?.data}
        count={articlesList?.data?.count}
        pageSize={pageSize}
        envConfig={envConfig}
        dir={dir}
        category={categorySlug}
        subCategory={subCategorySlug}
      />
    );
  } else if (slugs.length === 3) {
    const [categorySlug, subCategorySlug, articleSlug] = slugs;

    const cookiesAwaited = await cookies();
    const cookiesUpdated = cookiesAwaited?.get(envConfig?.cookiesName);
    const cookiesValue = cookiesUpdated?.value;
    const article = await fetchData(
      envConfig.baseUrl + "articles/detail",
      "post",
      {
        categorie: categorySlug,
        subCategorie: subCategorySlug,
        alias: articleSlug,
      },
      false,
      false,
      cookiesValue
    );
    let updatedSlugs = [
      { path: categorySlug, label: article?.data?.data?.categorie },
      { path: subCategorySlug, label: article?.data?.data?.subCategorie },
      {
        path: articleSlug,
        label: article?.data?.data?.title,
      },
    ];

    // Vérifiez status api
    if (article.status >= 400 && article.status < 500) {
      notFound();
    }

    if (article.status >= 300 && article.status < 400) {
      redirect(encodeURI(article?.data?.data?.alias));
    }

    if (article.status >= 500) {
      return <Error dir={dir} envConfig={envConfig} />;
    }

    return (
      <>
        <BreadCrumb
          items={updatedSlugs}
          dir={dir}
          isArticleAlias={isArticleAlias}
        />
        <PostContent article={article?.data?.data} />
      </>
    );
  } else {
    notFound();
  }
}
