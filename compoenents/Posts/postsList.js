"use client";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import Pagination from "../ui/pagination";
import ArticleCard from "./cardArticle";
import { paginateArticlesAction } from "src/app/actions/actions-server";

// Composant principal ArticleList
const ArticleList = ({
  articles,
  count,
  pageSize,
  envConfig,
  dir,
  params,
  category,
  subCategory,
}) => {
  const [array, setArray] = useState(articles || []);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((count || articles?.length || 0) / pageSize);
  const [statePaginate, formAction] = useActionState(
    paginateArticlesAction,
    null
  );

  useEffect(() => {
    if (statePaginate?.data?.success) {
      setArray(statePaginate?.data?.data);
    }
  }, [statePaginate]);

  // Fonction pour changer de page
  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    const formData = new FormData();
    formData.append("page", pageNumber.toString());
    formData.append("pageSize", pageSize.toString());

    if (category) {
      formData.append("categorie", category);
    }

    if (subCategory) {
      formData.append("subCategorie", subCategory);
    }
    // Si tout est valide, soumettre le formulaire
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-1 lg:px-8 pt-0  pb-8">
      {/* Grille d'articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
        {array?.map((article, index) => (
          <ArticleCard
            key={article.id_article || index}
            article={article}
            envConfig={envConfig}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        dir={dir}
      />
    </div>
  );
};

export default ArticleList;
