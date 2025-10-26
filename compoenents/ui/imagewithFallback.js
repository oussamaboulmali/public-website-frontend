"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({ src, alt, color, lang }) {
  const [error, setError] = useState(false);

  /*  if (!src || error) {
    return <ImagePlaceholder color={color} />;
  } */
  if (!src || error) {
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <Image
          src={`/${lang}/logoo.png`}
          alt="placeholder"
          width={180}
          height={120}
          // style={{ opacity: 0.8 }}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      width={950}
      height={600}
      alt={alt}
      loading="lazy"
      //className="h-full object-cover rounded-[5px]"
      className="rounded-[5px]"
      // sizes="(max-width: 768px) 100vw, (max-width: 1300px) 400px, 700px"
      onError={() => setError(true)}
    />
  );
}
