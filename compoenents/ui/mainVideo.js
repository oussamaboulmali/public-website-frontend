"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const MainVideo = ({ videoData, envConfig }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extraire l'ID de la vidéo YouTube à partir du lien
  const getYoutubeVideoId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const youtubeId = getYoutubeVideoId(videoData?.lien_video);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-full relative rounded-3xl">
      {!isPlaying ? (
        // Conteneur principal
        <div
          className="w-full h-full relative cursor-pointer"
          onClick={handleThumbnailClick}
        >
          {/* Overlay avec image en arrière-plan et icône de lecture */}
          <div className="absolute inset-0 flex items-center justify-center transition-all">
            {/* Image en background de l'overlay */}
            <div className="absolute inset-0">
              <Image
                src={
                  "/" + envConfig?.lang + "/api/image/" + videoData?.image?.url
                }
                alt={videoData?.name || "Védio de jour"}
                fill
                //className="object-cover"
                priority
              />
            </div>

            {/* Bouton de lecture */}
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
        <div className="w-full h-full bg-black ">
          {" "}
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={videoData.name}
            className="w-full h-full "
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
          />
        </div>
      )}
    </div>
  );
};

export default MainVideo;
