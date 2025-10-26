"use client";

import ImageWithFallback from "../ui/imagewithFallback";
import FormattedDate from "../ui/formattedDate";
import Video_RelatedArticle from "./videoRelatedArticles";
import { useState } from "react";
import ShareButtons from "../ui/shareButtons";
import ViewCounter from "compoenents/ui/viewsNombre";

export default function VideoContent({ video, envConfig, dir }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [youtubeId, setYoutubeId] = useState(null);
  const hasImage = video?.image?.url;
  const imageUrl = hasImage
    ? "/" + envConfig?.lang + "/api/image/" + video?.image?.url
    : "";

  // Extraire l'ID de la vidéo YouTube à partir du lien
  const getYoutubeVideoId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleThumbnailClick = () => {
    if (video?.lien_video) {
      const id = getYoutubeVideoId(video?.lien_video);
      setYoutubeId(id);
      setIsPlaying(true);
    }
  };

  return (
    <article className="flex flex-col space-y-2 w-full  md:max-w-[1800px] mx-auto min-h-screen bg-white p-2 sm:p-4">
      {/* Title*/}
      <h1 className="text-3xl font-bold text-gray-900">{video?.name}</h1>

      {/* Date translation et share */}
      <div className="flex items-center justify-between  py-3 border-b-2 border-blue-500">
        <div className="flex items-center justify-center gap-4">
          <FormattedDate date={video?.formattedDate} />
          {video.views !== null && <ViewCounter initialViews={video.views} />}
        </div>

        <ShareButtons
          articleTitle={video?.name}
          dir={dir}
          envConfig={envConfig}
        />
      </div>

      {/* Image container with bg color */}
      <div className="bg-blue-50 py-8 h-fit flex justify-center">
        <div className="relative w-full max-w-3xl aspect-[16/9] overflow-hidden">
          {!isPlaying ? (
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={handleThumbnailClick}
            >
              <ImageWithFallback
                src={imageUrl}
                alt={video?.image?.description || video?.title || "Image video"}
                color="text-gray-400"
                className="w-full h-full  rounded"
                lang={envConfig?.lang}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#003979] flex items-center justify-center z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-12 h-12"
                    style={{ marginLeft: "2px" }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={video?.name || "Vidéo sélectionnée"}
                className="absolute top-0 left-0 w-full h-full rounded"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
              />
            </div>
          )}
        </div>
      </div>

      {/* Intro text */}
      <div className=" py-4  text-sm ">
        <p>{video?.description}</p>
      </div>

      <div className=" mt-6 md:mt-10">
        {video?.relatedVideos.length > 0 && (
          <Video_RelatedArticle
            block={video?.relatedVideos}
            envConfig={envConfig}
            dir={dir}
          />
        )}
      </div>
    </article>
  );
}
