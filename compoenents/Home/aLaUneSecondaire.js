import Link from "next/link";
import Image from "next/image";
import translations from "../../locales/translation";
import MainVideo from "../ui/mainVideo";

const ALaUneSecondaire = ({ block, envConfig, dir }) => {
  if (!block?.articles || block?.articles.length <= 0) {
    return <div>Pas assez </div>;
  }
  return (
    <div>
      {/* Design desktop */}
      <div className="hidden w-[85%] h-[500px] mx-auto  md:flex items-start gap-1 2xl:gap-5">
        {/*  4 articles sur 2 lignes */}
        <div className="w-1/2 h-full flex flex-wrap">
          {block?.articles?.map((article, index) => (
            <Link
              key={index}
              href={`/${article.alias}`}
              className="w-1/2 h-1/2 mb-3 block" // 👈 permet que tout le bloc soit un lien
            >
              <div className="w-full h-full flex flex-col">
                {/* Image */}
                <div className="relative w-[95%] 2xl:w-[90%] h-[85%] overflow-hidden rounded-[5px]">
                  <Image
                    src={`/${
                      envConfig?.lang + "/api/image/" + article?.image?.url
                    }`}
                    alt={article?.image?.description}
                    fill
                    sizes="296px"
                    priority
                  />
                </div>

                {/* Titre + date */}
                <div className="h-[30%] w-[90%] mt-2">
                  <p
                    className="text-l font-bold text-black line-clamp-2"
                    title={article.title}
                  >
                    {article.title}
                  </p>

                  <p className="text-xs font-bold text-gray-900 mt-1">
                    {article.formattedDate?.split(" ").slice(0, 4).join(" ")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/*  vidéo */}
        <div className="w-1/2 h-full">
          <MainVideo videoData={block?.mainvVedio} envConfig={envConfig} />
        </div>
      </div>

      {/* Design mobile */}
      <div className="block md:hidden">
        <div className="w-[94%] mx-auto bg-white p-2 rounded-[5px] shadow-lg flex flex-col space-y-4">
          <div className="w-full h-[200px] relative">
            <MainVideo videoData={block?.mainvVedio} envConfig={envConfig} />
          </div>

          <div className="flex flex-col space-y-2">
            {block?.articles?.map((article, index) => (
              <Link
                key={index}
                href={`/${article.alias}`}
                className="flex-1 p-2 bg-gray-100 flex flex-row space-x-4 h-24" // 👈 tout le bloc est cliquable
              >
                <div className="w-[30%] h-24 relative rounded-[5px] overflow-hidden">
                  <Image
                    src={`/${
                      envConfig?.lang + "/api/image/" + article?.image?.url
                    }`}
                    alt={article?.image?.description}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center w-[70%] space-y-1">
                  <p className="text-[14px] font-semibold line-clamp-2">
                    {article?.title}
                  </p>
                  <p className="text-xs text-gray-800">
                    {article?.formattedDate?.split(" ").slice(0, 4).join(" ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALaUneSecondaire;
