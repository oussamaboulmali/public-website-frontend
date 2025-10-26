"use client";
import FormattedDate from "../ui/formattedDate";
import Cahier_RelatedArticle from "./cahierRelatedArticles";
import ShareButtons from "../ui/shareButtons";
import LivreCahier from "./LivreCahier";
import ViewCounter from "compoenents/ui/viewsNombre";

export default function CahierContent({ cahier, envConfig, dir }) {
  return (
    <article className="flex flex-col space-y-2 w-full  md:max-w-[1800px] mx-auto min-h-screen bg-white p-2 sm:p-4">
      {/* Title*/}
      <h1 className="text-3xl font-bold text-gray-900">{cahier?.name}</h1>

      {/* Date */}
      <div className="flex items-center justify-between  py-3 border-b-2 border-blue-500">
        <div className="flex items-center justify-start gap-4">
          <FormattedDate date={cahier?.formattedDate} />
          {cahier.views !== null && <ViewCounter initialViews={cahier.views} />}
        </div>
        <ShareButtons
          articleTitle={cahier?.title}
          dir={dir}
          envConfig={envConfig}
        />
      </div>

      {/* Image container with bg color */}
      <LivreCahier cahier={cahier} envConfig={envConfig} dir={dir} />

      {/* Intro text */}
      <div className=" py-4  text-sm " style={{ textIndent: "1.5rem" }}>
        <p>{cahier?.description}</p>
      </div>

      <div className=" mt-6 md:mt-10">
        {cahier?.relatedCahier.length > 0 && (
          <Cahier_RelatedArticle
            block={cahier?.relatedCahier}
            envConfig={envConfig}
            dir={dir}
          />
        )}
      </div>
    </article>
  );
}
