"use client";
import ImageWithFallback from "../ui/imagewithFallback";
import FormattedDate from "../ui/formattedDate";
import Image from "next/image";
import Icon from "@mdi/react";
import { useEffect, useRef, useState } from "react";
import {
  mdiClose,
  mdiArrowExpandAll,
  mdiMagnifyMinusOutline,
  mdiMagnifyPlusOutline,
  mdiBackupRestore,
} from "@mdi/js";
import Infographie_RelatedArticle from "./infographieRelatedArticles";
import ShareButtons from "../ui/shareButtons";
import ViewCounter from "compoenents/ui/viewsNombre";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function InfographieContent({ infographie, envConfig, dir }) {
  // --- Lightbox states (pas de navigation gauche/droite) ---
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // quelle image ouvrir
  const [isFullscreen, setIsFullscreen] = useState(false);

  // zoom & pan
  const [zoom, setZoom] = useState(1); // 1 → taille écran ; max 4
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const origin = useRef({ x: 0, y: 0 });
  const stageRef = useRef(null);

  const hasImage = infographie?.image?.url;
  const imageUrl = hasImage
    ? `/${envConfig?.lang}/api/image/${infographie?.image?.url}`
    : "";

  const allImages = Array.isArray(infographie?.images)
    ? infographie.images
    : [];
  const safeActive = clamp(activeIndex, 0, Math.max(0, allImages.length - 1));

  // --- open / close ---
  const openViewer = (index = 0) => {
    setActiveIndex(index);
    setIsOpen(true);
    setIsFullscreen(false);
    setZoom(1);
    setTx(0);
    setTy(0);
  };
  const closeViewer = () => setIsOpen(false);

  // --- zoom controls ---
  const ZMIN = 1;
  const ZMAX = 4;
  const stepZoom = (dir) => {
    setZoom((z) => clamp(z + dir * 0.25, ZMIN, ZMAX));
  };
  const zoomIn = () => stepZoom(+1);
  const zoomOut = () => stepZoom(-1);
  const resetView = () => {
    setZoom(1);
    setTx(0);
    setTy(0);
  };
  const toggleFullscreen = () => setIsFullscreen((v) => !v);

  // double-clic pour zoomer/dézoomer rapidement
  const handleDoubleClick = () => {
    setZoom((z) => (z <= 1.25 ? 2 : 1));
    if (zoom <= 1.25) {
      // centrer sur l'écran
      setTx(0);
      setTy(0);
    }
  };

  // wheel = zoom (autour du centre, simple & propre)
  const handleWheel = (e) => {
    e.preventDefault();
    const dir = e.deltaY < 0 ? +1 : -1;
    setZoom((z) => clamp(z + dir * 0.1, ZMIN, ZMAX));
  };

  // pan (cliquer-glisser)
  const onPointerDown = (e) => {
    dragging.current = true;
    start.current = { x: e.clientX, y: e.clientY };
    origin.current = { x: tx, y: ty };
    stageRef.current?.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    setTx(origin.current.x + dx);
    setTy(origin.current.y + dy);
  };
  const onPointerUp = (e) => {
    dragging.current = false;
    stageRef.current?.releasePointerCapture?.(e.pointerId);
  };

  // clavier: ESC pour fermer, + / - pour zoomer
  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeViewer();
      if (e.key === "+") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key.toLowerCase() === "r") resetView();
      if (e.key.toLowerCase() === "f") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <article
      className="flex flex-col space-y-2 w-full md:max-w-[1800px] mx-auto min-h-screen bg-white p-2 sm:p-4"
      dir={dir}
    >
      {/* Title*/}
      <h1 className="text-3xl font-bold text-gray-900">{infographie?.name}</h1>

      {/* Date + Share */}
      <div className="flex items-center justify-between py-3 border-b-2 border-blue-500">
        <div className="flex items-center justify-center gap-4">
          <FormattedDate date={infographie?.formattedDate} />
          {infographie?.views != null && (
            <ViewCounter initialViews={infographie.views} />
          )}
        </div>
        <ShareButtons
          articleTitle={infographie?.name}
          dir={dir}
          envConfig={envConfig}
        />
      </div>

      {/* Image principale cliquable → ouvre la lightbox */}
      <button
        type="button"
        className=" bg-blue-50 py-8 flex justify-center items-center cursor-zoom-in max-w-full max-h-full"
        onClick={() => openViewer(0)}
        aria-label="Agrandir l’image"
      >
        <ImageWithFallback
          src={imageUrl}
          alt={infographie?.title || "Image infographie"}
          color="text-gray-400"
          lang={envConfig?.lang}
        />
      </button>

      {/* Vignettes (optionnel) : cliquer pour ouvrir directement dans la lightbox */}
      {allImages.length > 0 && (
        <div className="w-[95%] mx-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allImages.map((el, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => openViewer(idx)}
                className="relative h-64 w-full overflow-hidden rounded-lg cursor-zoom-in"
                aria-label={`Agrandir ${el?.name || `image ${idx + 1}`}`}
              >
                <Image
                  src={`/${envConfig?.lang}/api/image/${el?.url}`}
                  alt={el?.name || ""}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox (zoom + pan, sans flèches gauche/droite) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div
            className={`bg-white shadow-xl transition-all duration-300 overflow-hidden ${
              isFullscreen
                ? "w-full h-full"
                : "w-11/12 max-w-5xl h-[85vh] rounded-lg"
            }`}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-[#1D589F] text-white px-3 py-2">
              <div className="truncate">{infographie?.name}</div>
              <div className="flex items-center gap-1">
                <button
                  onClick={zoomOut}
                  className={`p-1 rounded hover:bg-white/15 ${
                    zoom <= ZMIN ? "opacity-50 pointer-events-none" : ""
                  }`}
                  title="Zoom -"
                >
                  <Icon path={mdiMagnifyMinusOutline} size={0.9} />
                </button>
                <div className="text-xs min-w-[40px] text-center">
                  {Math.round(zoom * 100)}%
                </div>
                <button
                  onClick={zoomIn}
                  className={`p-1 rounded hover:bg-white/15 ${
                    zoom >= ZMAX ? "opacity-50 pointer-events-none" : ""
                  }`}
                  title="Zoom +"
                >
                  <Icon path={mdiMagnifyPlusOutline} size={0.9} />
                </button>
                <button
                  onClick={resetView}
                  className="p-1 rounded hover:bg-white/15"
                  title="Réinitialiser"
                >
                  <Icon path={mdiBackupRestore} size={0.9} />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-1 rounded hover:bg-white/15"
                  title="Plein écran (F)"
                >
                  <Icon path={mdiArrowExpandAll} size={0.9} />
                </button>
                <button
                  onClick={closeViewer}
                  className="p-1 rounded hover:bg-white/15"
                  title="Fermer (Esc)"
                >
                  <Icon path={mdiClose} size={0.9} />
                </button>
              </div>
            </div>

            {/* Zone d'affichage  */}
            <div
              ref={stageRef}
              className="relative h-[calc(100%-40px)] bg-neutral-50 overflow-hidden touch-none select-none"
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div
                className="absolute inset-0 flex items-center justify-center will-change-transform"
                style={{
                  transform: `translate(${tx}px, ${ty}px) scale(${zoom})`,
                }}
              >
                <div className="relative w-full h-full max-w-[95vw] max-h-[80vh]">
                  <Image
                    key={safeActive}
                    src={`/${envConfig?.lang}/api/image/${
                      allImages[safeActive]?.url || infographie?.image?.url
                    }`}
                    alt={
                      allImages[safeActive]?.name ||
                      infographie?.title ||
                      "Infographie"
                    }
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Intro text */}
      <div className="py-4 text-sm " style={{ textIndent: "1.5rem" }}>
        <p>{infographie?.description}</p>
      </div>

      {/* Articles liés */}
      <div className="mt-6 md:mt-10">
        {infographie?.relatedInforgraphie?.length > 0 && (
          <Infographie_RelatedArticle
            block={infographie?.relatedInforgraphie}
            envConfig={envConfig}
            dir={dir}
          />
        )}
      </div>
    </article>
  );
}
