"use client";
import { startTransition, useActionState, useEffect, useState } from "react";
import Pagination from "../ui/pagination";
import InfographieCard from "./infographieCard";
import { paginateInfographieAction } from "src/app/actions/actions-server";

export default function InfographieList({
  infographie,
  count,
  pageSize,
  envConfig,
  dir,
}) {
  const [array, setArray] = useState(infographie || []);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((count || infographie?.length || 0) / pageSize);
  const [statePaginate, formAction] = useActionState(
    paginateInfographieAction,
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

    // Si tout est valide, soumettre le formulaire
    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <div className="w-full  mx-auto h-fit min-h-screen  sm:px-1 lg:px-8 pt-0  pb-8">
      {/* Grille infographies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 ">
        {array?.map((infographie, index) => (
          <InfographieCard
            key={index}
            infographie={infographie}
            envConfig={envConfig}
          />
        ))}
      </div>

      {/* Pagination */}
      {array?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          dir={dir}
        />
      )}
    </div>
  );
}
