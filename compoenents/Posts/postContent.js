import parse from "html-react-parser";
import { getConfig } from "../../lib/config";
import ShareButtons from "../ui/shareButtons";
import TranslateDropdown from "../ui/translateDropDown";
import Link from "next/link";
import ImageWithFallback from "../ui/imagewithFallback";
import FormattedDate from "../ui/formattedDate";
import translations from "../../locales/translation";
import SubscriberContent from "../ui/protectedContent";
import FullText from "./fulltext";
import Post_Galerie from "./postGalerie";
import Post_RelatedArticle from "./postRelatedArticles";
import ViewCounter from "../ui/viewsNombre";

// Fonction pour parser le HTML sécurisé
const renderHTML = (content) => {
  if (!content) return null;
  return parse(content);
};

export default async function PostContent({ article }) {
  const { envConfig, dir, locales } = await getConfig();
  const hasImage = article?.image?.url;

  const imageUrl = hasImage
    ? "/" + envConfig?.lang + "/api/image/" + article?.image?.url
    : "";

  return (
    <article className="flex flex-col space-y-2 w-full max-w-[1800px] mx-auto min-h-screen bg-white p-2 sm:p-4">
      {/* Super Title */}
      {article?.supTitle && (
        <div className="text-[25px] font-bold px-6 rounded-[5px] text-white bg-[#1D589F] text-center w-fit">
          <h2>{article?.supTitle}</h2>
        </div>
      )}

      {/* Title*/}
      <h1 className="text-3xl font-bold text-gray-900">{article?.title}</h1>

      {/* Date translation et share */}
      <div className="flex items-center justify-between py-3 border-b-2 border-blue-500">
        <div className="flex items-center gap-4  text-xs sm:text-base ">
          <FormattedDate date={article?.formattedDate} />
          {article?.views !== null && (
            <ViewCounter initialViews={article?.views} />
          )}
        </div>
        <div className="flex items-center gap-2 ">
          <TranslateDropdown
            locales={locales}
            dir={dir}
            lang={envConfig?.lang}
            domaine={envConfig?.domaine}
            translatedArticles={article?.translated_article}
          />
          <ShareButtons
            articleTitle={article?.title}
            articleImage={imageUrl}
            dir={dir}
          />
        </div>
      </div>

      {/* Image container with bg color */}
      <div
        className=" bg-blue-50 py-8 flex flex-col items-center"
        //className="aspect-[2/1] bg-blue-50 py-8 flex flex-col items-center"
      >
        <ImageWithFallback
          src={imageUrl}
          alt={article?.image?.description || article?.title || "Image article"}
          color="text-gray-400"
          lang={envConfig?.lang}
        />
        {/* {article?.image?.credit && (
          <div
            className="w-[80%] mx-auto mt-5 text-[14px] text-gray-500 italic prose prose-sm sm:prose max-w-none line-clamp-1"
            title={article.image.credit}
          >
            {article.image.credit}
          </div>
        )} */}
      </div>

      {/* Intro text */}
      <div className=" py-4 text-[#1D589F] font-medium text-lg">
        {renderHTML(article?.introtext)}
      </div>

      {/* Full content */}
      <>
        {!article?.is_protected ? (
          <>
            {article?.fulltext && article.fulltext.trim() !== "" ? (
              <>
                <FullText article={article} envConfig={envConfig} dir={dir} />
                {/* Tags */}
                {article?.tags?.length > 0 && (
                  <section
                    aria-labelledby="tags-heading"
                    className="px-6 py-4 flex flex-row gap-4 w-full justify-center"
                  >
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Link
                          href={`/tags/${tag.alias}`}
                          key={index}
                          className="bg-blue-100 text-blue-800 p-2 flex flex-col items-center text-bold rounded-[5px] text-sm hover:bg-blue-200"
                        >
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
                <Post_Galerie
                  block={article?.gallery}
                  envConfig={envConfig}
                  dir={dir}
                />
              </>
            ) : null}
          </>
        ) : (
          <SubscriberContent envConfig={envConfig} />
        )}
      </>

      {article?.relatedArticles && article?.relatedArticles.length > 0 && (
        <Post_RelatedArticle
          block={article?.relatedArticles}
          envConfig={envConfig}
          dir={dir}
        />
      )}
    </article>
  );
}
