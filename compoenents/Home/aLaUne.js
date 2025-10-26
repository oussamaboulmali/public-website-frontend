import Link from "next/link";
import Image from "next/image";
import News_Feed from "../ui/barres/news-feed";

const ALaUne = ({ block, envConfig, dir, banner }) => {
  if (!block?.articles || block?.articles.length <= 0) {
    return <div>Pas assez </div>;
  }

  const mainArticle = block?.articles[0]; // Article principal (premier article)
  const secondaryArticles = block?.articles?.slice(1, 3); // Articles secondaires (les deux suivants)

  return (
    <>
      {/* Design desktop */}
      <div className="hidden w-[95%] mx-auto md:block 2xl:w-[85%] ">
        <div className="grid grid-cols-[auto_380px] gap-2 2xl:gap-6 ">
          {/* article principale  à la une */}
          <div className="h-[590px] bg-white rounded-[5px] flex gap-4">
            <div className="w-[70%] lg:w-[70%] h-full shadow-md rounded-[5px] overflow-hidden relative">
              <Link href={`/${mainArticle.alias}`}>
                <div className="w-full h-full flex flex-col">
                  <div className="relative h-[80%] w-full">
                    <Image
                      src={`/${
                        envConfig?.lang +
                        "/api/image/" +
                        mainArticle?.image?.url
                      }`}
                      alt={mainArticle?.image?.description}
                      fill
                      //priority
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 70vw"
                      //className="object-cover"
                    />
                  </div>

                  <div
                    className="h-[20%] w-full p-2 bg-white text-black flex flex-col justify-center"
                    dir={dir}
                  >
                    <h2
                      className="text-lg font-bold line-clamp-2"
                      title={mainArticle.title}
                    >
                      {mainArticle.title}
                    </h2>
                    <p className="text-xs font-bold text-gray-900 mt-1">
                      {mainArticle.formattedDate
                        ?.split(" ")
                        .slice(0, 4)
                        .join(" ")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* articles secondaires a la une */}
            <div className="w-[30%] lg:w-[40%] flex flex-col gap-4">
              {secondaryArticles?.slice(0, 2).map((article, index) => (
                <div
                  key={article.id_article || index}
                  className="relative h-[300px] rounded-[5px] overflow-hidden shadow-md"
                >
                  <Link href={`/${article.alias}`}>
                    <div className="w-full h-full flex flex-col">
                      {/* Partie image */}
                      <div className="relative h-[75%] w-full">
                        <Image
                          src={`/${
                            envConfig?.lang +
                            "/api/image/" +
                            article?.image?.url
                          }`}
                          alt={article?.image?.description}
                          fill
                          sizes="(max-width: 768px) 100vw, 35vw"
                          //className="object-cover"
                          //priority
                          loading="lazy"
                        />
                      </div>

                      {/* Partie texte */}
                      <div
                        className="h-[25%] w-full p-2 bg-[#F8F9FA] text-black flex flex-col justify-center"
                        dir={dir}
                      >
                        <h2
                          className="text-sm font-bold line-clamp-1"
                          title={article.title}
                        >
                          {article.title}
                        </h2>
                        <p className="text-[11px]  font-bold text-gray-900 mt-1">
                          {article.formattedDate
                            ?.split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Conteneur pour la bannière ou les actualités */}
          <div className="w-full p-2">
            {banner?.click_url === null ? (
              <News_Feed
                dir={dir}
                envConfig={envConfig}
                shouldReplaceBanner={true}
                bannerUrl={banner?.click_url}
              />
            ) : (
              <div
                className={`relative rounded-[5px] overflow-hidden shadow-lg ${
                  banner?.click_url === null
                    ? "h-auto min-h-[200px]"
                    : "h-[590px]"
                }`}
              >
                <Link
                  href={banner?.click_url || ""}
                  className="block w-full h-full"
                  target="_blank"
                >
                  <Image
                    src={"/" + envConfig?.lang + "/api/image/" + banner?.url}
                    alt={banner?.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    //className="object-cover"
                    //priority
                    loading="lazy"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Design mobile */}
      <div className="block md:hidden ">
        <div className="w-[94%] mx-auto bg-white p-2 rounded-[5px] shadow-lg h-[527px] flex flex-col space-y-2 ">
          {/* principale */}
          <Link
            href={`/${mainArticle.alias}`}
            className="h-[60%] rounded-[5px] relative overflow-hidden group"
          >
            {/* Image en arrière-plan */}
            <Image
              src={`/${envConfig.lang}/api/image/${mainArticle?.image?.url}`}
              alt={mainArticle?.title || "Image de l'article"}
              fill
              className="transition-transform duration-300 group-hover:scale-105"
              //priority
              loading="lazy"
            />

            {/* Contenu en bas */}
            <div
              className="absolute bottom-0 w-full h-[90px] p-3 bg-gradient-to-t from-[#F8F9FA] from-10% via-[#F8F9FA]/73 via-73% to-[#F8F9FA]/2 to-85% text-white flex flex-col justify-center"
              dir={dir}
            >
              <h2 className="text-black text-[17px] font-semibold line-clamp-2">
                {mainArticle?.title}
              </h2>
              <p className="text-gray-800 text-xs">
                {mainArticle?.formattedDate?.split(" ").slice(0, 4).join(" ")}
              </p>
            </div>
          </Link>
          {/* Div pour les deux sections avec hauteur divisée */}
          <div className="h-[60%] flex flex-col space-y-1">
            {secondaryArticles?.map((article, index) => (
              <Link
                key={index}
                href={`/${article.alias}`}
                className="flex-1 p-2 bg-gray-100 flex flex-row space-x-4 rounded-[5px] hover:bg-gray-200 transition"
              >
                {/* Image de l'article */}
                <div className="relative w-[40%] h-full rounded-[5px] overflow-hidden">
                  <Image
                    src={`/${envConfig.lang}/api/image/${article?.image?.url}`}
                    alt={article?.title || "Image de l'article"}
                    fill
                    // className="object-cover object-center"
                    loading="lazy"
                  />
                </div>

                {/* Titre et Date de l'article */}
                <div className="flex flex-col justify-center w-[60%] space-y-1">
                  <h3 className="text-[16px] font-semibold line-clamp-2">
                    {article?.title}
                  </h3>
                  <p className="text-xs text-gray-800">
                    {article?.formattedDate?.split(" ").slice(0, 4).join(" ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ALaUne;
