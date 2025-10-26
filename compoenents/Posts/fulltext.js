"use client";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import translations from "../../locales/translation";
import React from "react";
import ReactDOM from "react-dom/client";
import Image from "next/image";

// Fonction pour décoder les entités HTML
function decodeHtml(html) {
  if (typeof window === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function parseTextAndCheckTags(text, dir, article, lang) {
  text = `<div style="display: block;">${text}</div>`;
  const decodedText = decodeHtml(text);

  const readMoreRegex = /<ReadMore\s+url=(\d+)\s*\/>/;
  const imageRegex = /<Image\s+url=([a-zA-Z0-9./]+)\s*\/>/;
  const blockquoteRegex = /<blockquote>(.*?)<\/blockquote>/g;
  const twitterEmbedRegex =
    /<figure class="media">.*?data-oembed-url="https:\/\/(?:twitter|x)\.com\/.*?\/status\/(\d+).*?<\/figure>/gs;
  const facebookEmbedRegex =
    /<figure class="media">.*?data-oembed-url="(https:\/\/www\.facebook\.com\/[^"]+)".*?<\/figure>/gs;
  const youtubeEmbedRegex =
    /<figure class="media"><div data-oembed-url="https:\/\/www\.youtube\.com\/watch\?v=([^"]+)">\s*<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/[^"]+"[^>]*>\s*<\/iframe>\s*<\/div><\/figure>/;
  const linkRegex = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi;

  const hasReadMore = readMoreRegex.test(decodedText ?? "");
  const hasImage = imageRegex.test(decodedText ?? "");
  const hasBlockQuote = blockquoteRegex.test(decodedText ?? "");
  const hasTwitterEmbed = twitterEmbedRegex.test(decodedText ?? "");
  const hasFacebookEmbed = facebookEmbedRegex.test(decodedText ?? "");
  const hasYoutubeEmbed = youtubeEmbedRegex.test(decodedText ?? "");
  const hasHyperLink = linkRegex.test(decodedText ?? "");

  let readMoreId = null;
  let newValue = decodedText;
  let twitterIds = [];
  let facebookPosts = [];
  let youtubeIds = [];
  let readMoreComponents = [];
  let imageComponents = [];

  if (hasHyperLink) {
    newValue = newValue.replace(linkRegex, (match, href, linkText) => {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: #1D589F; text-decoration: underline; cursor: pointer;">${linkText}</a>`;
    });
  }

  if (hasReadMore) {
    const readMoreMatch = decodedText.match(readMoreRegex);
    if (readMoreMatch) {
      readMoreId = readMoreMatch[1];
      const isRTL = dir === "rtl";
      const arrowStyle = isRTL ? "transform: rotate(180deg);" : "";
      const marginClass = isRTL ? "mr-2" : "ml-2";
      const textAlign = isRTL ? "text-left" : "text-right";

      const iconSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ${marginClass}" style="${arrowStyle}" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor">
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
        </svg>
      `;

      const supTitleHtml = article?.supTitle
        ? `<p class="text-sm text-gray-500">${article.supTitle}</p>`
        : "";
      let imageIndex = 0;
      const readMoreComponentId = `readmore-component-${imageIndex++}`;

      readMoreComponents.push({
        id: readMoreComponentId,
        imageUrl: article?.image?.url
          ? "/" + lang + "/api/image/" + article.image.url
          : null,
        article: article,
      });

      const readMoreHtml = `
        <div class="w-[90%] md:w-[70%] mx-auto bg-[#EFF6FF] block md:flex flex-row items-start justify-center md:justify-start p-3 my-8 gap-4">
          <div class="w-full flex justify-center mb-4 md:mb-0 md:w-auto">
            <div id="${readMoreComponentId}" class="readmore-image-placeholder"></div>
          </div>
          <div class="flex flex-col justify-between h-full w-full">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">${
                article?.title || ""
              }</h3>
              ${supTitleHtml}
            </div>
            
            <div class="${textAlign} mt-4">
              <a href="${
                "/" + lang + "/" + article?.alias?.replace(/^\/+/, "")
              }" 
                class="text-[#1D589F] inline-flex items-center no-underline">
                ${translations.readPost}
                ${iconSVG}
              </a>
            </div>
          </div>
        </div>
      `;

      newValue = newValue.replace(readMoreRegex, readMoreHtml);
    }
  }

  if (hasBlockQuote) {
    newValue = newValue.replace(blockquoteRegex, (match, content) => {
      const borderStyle =
        dir === "rtl"
          ? "border-right: 5px solid #1D589F;"
          : "border-left: 5px solid #1D589F;";
      const textAlign =
        dir === "rtl" ? "text-align: right;" : "text-align: left;";

      return `<div style="width: 80%; ${borderStyle} padding: 10px; margin: 10px auto; background-color: #EFF6FF; quotes: initial;">
              <p style="margin: 0; font-style: italic; ${textAlign}">${content.trim()}</p>
            </div>`;
    });
  }

  if (hasImage) {
    let imageIndex = 0;
    newValue = newValue.replace(imageRegex, (match, url) => {
      const imageId = `next-image-${imageIndex++}`;
      imageComponents.push({
        id: imageId,
        src: "/" + lang + "/api/image/" + url,
        alt: "image",
      });
      return `<div id="${imageId}" class="next-image-placeholder"></div>`;
    });
  }

  if (hasTwitterEmbed) {
    newValue = newValue.replace(twitterEmbedRegex, (match, tweetId) => {
      twitterIds.push(tweetId);
      return `
        <div class="twitter-embed-container" style="margin: 20px auto; max-width: 550px;">
          <blockquote class="twitter-tweet" data-dnt="true">
            <a href="https://twitter.com/twitter/status/${tweetId}"></a>
          </blockquote>
        </div>
      `;
    });
  }

  if (hasFacebookEmbed) {
    newValue = newValue.replace(facebookEmbedRegex, (match, facebookUrl) => {
      facebookPosts.push(facebookUrl);
      return `
        <div class="facebook-embed-container" style="margin: 20px auto; max-width: 500px;">
          <div class="fb-post" 
               data-href="${facebookUrl}" 
               data-width="500" 
               data-show-text="true">
          </div>
        </div>
      `;
    });
  }

  if (hasYoutubeEmbed) {
    newValue = newValue.replace(youtubeEmbedRegex, (match) => match);
  }
  const textIndent = dir === "rtl" ? "2em" : "2em";

  newValue = newValue.replace(
    /<p>/g,
    //'<p style="margin-bottom: 1em; line-height: 1.8; text-align: justify;">',
    `<p style="margin-bottom: 1.5em; text-indent: ${textIndent}; line-height: 1.8;">`
  );

  newValue = newValue.replace(
    /<p\s+style="([^"]*)"/g,
    (match, existingStyle) => {
      const hasMargin = /margin-bottom\s*:/i.test(existingStyle);
      const hasLineHeight = /line-height\s*:/i.test(existingStyle);
      const hasJustify = /text-align\s*:\s*justify/i.test(existingStyle);

      let newStyle = existingStyle;
      if (!hasMargin) newStyle += " margin-bottom: 1.5em;";
      if (!hasLineHeight) newStyle += " line-height: 1.8;";
      if (!hasJustify) newStyle += " text-align: justify;";

      return `<p style="${newStyle.trim()}"`;
    }
  );

  return {
    Quote: hasBlockQuote,
    Image: hasImage,
    readMore: hasReadMore,
    TwitterEmbed: hasTwitterEmbed,
    FacebookEmbed: hasFacebookEmbed,
    YoutubeEmbed: hasYoutubeEmbed,
    idReadMore: readMoreId,
    twitterIds,
    facebookPosts,
    youtubeIds,
    newValue,
    imageComponents,
    readMoreComponents,
    socialMediaCount: {
      twitter: twitterIds.length,
      facebook: facebookPosts.length,
      youtube: youtubeIds.length,
      total: twitterIds.length + facebookPosts.length + youtubeIds.length,
    },
  };
}

export default function FullText({ article, envConfig, dir }) {
  const [parsedContent, setParsedContent] = useState("");
  const [parsedData, setParsedData] = useState(null);

  // Parser le contenu initial
  useEffect(() => {
    if (article && article.fulltext) {
      const parsed = parseTextAndCheckTags(
        article.fulltext,
        dir,
        article,
        envConfig.lang
      );
      setParsedData(parsed);

      if (typeof window !== "undefined") {
        const sanitized = DOMPurify.sanitize(parsed.newValue, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src"],
          FORBID_TAGS: ["script", "style"],
        });
        setParsedContent(sanitized);
      } else {
        setParsedContent(parsed.newValue);
      }
    }
  }, [article, dir, envConfig.lang]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!parsedContent || !parsedData) return;

    if (parsedData.imageComponents?.length) {
      parsedData.imageComponents.forEach((imgData) => {
        const placeholder = document.getElementById(imgData.id);

        if (placeholder) {
          const container = document.createElement("div");
          placeholder.replaceWith(container);

          ReactDOM.createRoot(container).render(
            <Image
              src={imgData.src}
              alt={imgData.alt}
              width={600}
              height={400}
              style={{
                width: "60%",
                height: "auto",
                display: "block",
                margin: "20px auto",
              }}
              // unoptimized={!imgData.src.startsWith("/")}
            />
          );
        }
      });
    }
  }, [parsedData]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!parsedContent || !parsedData) return;

    if (parsedData.readMoreComponents?.length) {
      parsedData.readMoreComponents.forEach((readMoreData) => {
        const placeholder = document.getElementById(readMoreData.id);

        if (placeholder && readMoreData.imageUrl) {
          const container = document.createElement("div");
          placeholder.replaceWith(container);

          ReactDOM.createRoot(container).render(
            <Image
              src={readMoreData.imageUrl}
              alt={readMoreData.article?.title || "Image"}
              width={160}
              height={120}
              className="w-40 h-auto rounded shadow"
              //unoptimized
            />
          );
        }
      });
    }
  }, [parsedData]);

  // Charger le SDK Twitter
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!parsedData?.TwitterEmbed) return;

    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.twttr?.widgets?.load();
      };
    } else {
      window.twttr.widgets.load();
    }
  }, [parsedData]);

  // Charger le SDK Facebook
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!parsedData?.FacebookEmbed) return;

    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v17.0";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse();
        }
      };
    } else {
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    }
  }, [parsedData]);

  // Rendu initial pendant l'hydratation
  if (parsedContent === "") {
    return (
      <div className="prose max-w-none">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div
      className="prose prose-sm sm:prose lg:prose-lg max-w-none social-embeds leading-12"
      dangerouslySetInnerHTML={{
        __html: parsedContent,
      }}
    />
  );
}

// Composant SkeletonLoader
const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
      <div className="space-y-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
      <div className="w-4/5 md:w-2/5 h-40 mx-auto my-8 bg-gray-200 rounded"></div>
      <div className="space-y-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="w-[90%] md:w-[70%] mx-auto border-l-4 border-gray-200 bg-gray-100 px-4 py-3 my-8">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
};
