"use client";
import { startTransition, useActionState, useEffect, useState } from "react";
import Pagination from "../ui/pagination";
import VideoCard from "./videoCard";
import { paginateVideoAction } from "src/app/actions/actions-server";

export default function VideoList({ video, count, pageSize, envConfig, dir }) {
  const [array, setArray] = useState(video || []);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((count || video?.length || 0) / pageSize);
  const [statePaginate, formAction] = useActionState(paginateVideoAction, null);

  // Fonction pour changer de page
  /* const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    const videos = await fetchData(envConfig.baseUrl + "dossiers", "post", {
      pageSize: pageSize,
      page: pageNumber,
    });
    setArray(videos?.data?.data);
  }; */

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
      {/* Grille videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 ">
        {array?.map((video, index) => (
          <VideoCard key={index} video={video} envConfig={envConfig} />
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
