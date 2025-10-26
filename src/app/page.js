import Image from "next/image";
import { fetchData } from "../../Api/fetchData";
import { getConfig } from "../../lib/config";
import translations from "../../locales/translation";
import ALaUne from "../../compoenents/Home/aLaUne";
import ALaUneSecondaire from "../../compoenents/Home/aLaUneSecondaire";
import Actualités from "../../compoenents/Home/actualités";
import Dossier from "../../compoenents/Home/dossier";
import Video_Galerie from "../../compoenents/Home/video&galeries";
import Infographie_cahier from "../../compoenents/Home/infographie&cahier";
import Link from "next/link";
import Error from "../../compoenents/ui/maintenance";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

function getBannerByPosition(banners, position) {
  return banners?.find((banner) => banner.position === position);
}

export default async function Page() {
  const { envConfig, dir, locales } = await getConfig();
  const menuData = await fetchData(envConfig.baseUrl + "home");

  if (menuData?.status >= 400 && menuData?.status < 500) {
    notFound();
  }

  if (menuData?.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <div className="flex flex-col space-y-3 md:space-y-8">
      {/* banniere 1ere position */}
      <div className="w-full min-w-full mt-2 hidden sm:flex justify-center">
        <div className="w-[70%] flex justify-center">
          {getBannerByPosition(menuData?.data?.data?.banners, 1)?.url && (
            <Link
              href={
                getBannerByPosition(menuData?.data?.data?.banners, 1)
                  ?.click_url || ""
              }
              className="block w-[90%] mx-auto mb-2"
              target="_blank"
            >
              <Image
                src={
                  "/" +
                  envConfig?.lang +
                  "/api/image/" +
                  getBannerByPosition(menuData?.data?.data?.banners, 1)?.url
                }
                alt={
                  getBannerByPosition(menuData?.data?.data?.banners, 1)?.name ||
                  ""
                }
                width={1062}
                height={250}
                className="w-auto h-auto min-w-full"
                priority
              />
            </Link>
          )}
        </div>
      </div>
      <ALaUne
        block={menuData?.data?.data?.["A la une"]}
        envConfig={envConfig}
        dir={dir}
        locales={locales}
        banner={getBannerByPosition(menuData?.data?.data?.banners, 2)}
      />
      {/* banniere 3eme position */}
      {getBannerByPosition(menuData?.data?.data?.banners, 3)?.click_url && (
        <div className="w-full mt-6 hidden sm:flex justify-center">
          <div className="w-[70%] flex justify-center">
            <Link
              href={
                getBannerByPosition(menuData?.data?.data?.banners, 3)
                  ?.click_url || ""
              }
              className="block w-[90%] mx-auto mb-10"
            >
              <Image
                src={
                  getBannerByPosition(menuData?.data?.data?.banners, 3)?.url
                    ? "/" +
                      envConfig.lang +
                      "/api/image/" +
                      getBannerByPosition(menuData?.data?.data?.banners, 3)?.url
                    : `/${envConfig?.lang}/pub.png`
                }
                alt={translations?.pub_banner}
                width={1062}
                height={146}
                className="w-auto"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      )}
      <ALaUneSecondaire
        block={menuData?.data?.data?.["A la une secondaire"]}
        envConfig={envConfig}
        dir={dir}
        locales={locales}
        banner={getBannerByPosition(menuData?.data?.data?.banners, 4)?.url}
      />
      {getBannerByPosition(menuData?.data?.data?.banners, 4)?.url && (
        <div className="w-full mt-6 hidden sm:flex justify-center">
          <div className="w-[70%] flex justify-center">
            <Link
              href={
                getBannerByPosition(menuData?.data?.data?.banners, 4)
                  ?.click_url || ""
              }
              className="block w-[90%] mx-auto mb-10"
            >
              <Image
                src={
                  "/" +
                  envConfig.lang +
                  "/api/image/" +
                  getBannerByPosition(menuData?.data?.data?.banners, 4)?.url
                }
                alt={translations?.pub_banner}
                width={1062}
                height={146}
                className="w-auto"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      )}
      <Actualités
        block={menuData?.data?.data?.["Actualités"]}
        envConfig={envConfig}
        dir={dir}
        locales={locales}
      />
      {getBannerByPosition(menuData?.data?.data?.banners, 5)?.url && (
        <div className="w-full mt-6 hidden sm:flex justify-center">
          <div className="w-[70%] flex justify-center">
            <Link
              href={
                getBannerByPosition(menuData?.data?.data?.banners, 5)
                  ?.click_url || ""
              }
              className="block w-[90%] mx-auto mb-10"
            >
              <Image
                src={
                  "/" +
                  envConfig.lang +
                  "/api/image/" +
                  getBannerByPosition(menuData?.data?.data?.banners, 5)?.url
                }
                alt={translations?.pub_banner}
                width={1062}
                height={146}
                //unoptimzed
                className="w-auto"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      )}
      <Dossier
        block={menuData?.data?.data?.["dossier"]}
        envConfig={envConfig}
        dir={dir}
        locales={locales}
      />

      {getBannerByPosition(menuData?.data?.data?.banners, 6)?.url && (
        <div className="w-full mt-6 hidden sm:flex justify-center">
          <div className="w-[70%] flex justify-center">
            <Link
              href={
                getBannerByPosition(menuData?.data?.data?.banners, 6)
                  ?.click_url || ""
              }
              className="block w-[90%] mx-auto mb-10"
            >
              <Image
                src={
                  "/" +
                  envConfig.lang +
                  "/api/image/" +
                  getBannerByPosition(menuData?.data?.data?.banners, 6)?.url
                }
                alt={translations?.pub_banner}
                width={1062}
                height={146}
                className="w-auto"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      )}
      <Video_Galerie
        block={menuData?.data?.data?.["videos"]}
        block1={menuData?.data?.data?.["galleries"]}
        envConfig={envConfig}
        dir={dir}
        locales={locales}
      />
      {getBannerByPosition(menuData?.data?.data?.banners, 7)?.url && (
        <div className="w-full mt-6 hidden sm:flex justify-center">
          <div className="w-[70%] flex justify-center">
            <Link
              href={
                getBannerByPosition(menuData?.data?.data?.banners, 7)
                  ?.click_url || ""
              }
              className="block w-[90%] mx-auto mb-10"
            >
              <Image
                src={
                  "/" +
                  envConfig.lang +
                  "/api/image/" +
                  getBannerByPosition(menuData?.data?.data?.banners, 7)?.url
                }
                alt={translations?.pub_banner}
                width={1062}
                height={146}
                className="w-auto"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      )}
      <Infographie_cahier
        block={menuData?.data?.data?.["infographies"]}
        block1={menuData?.data?.data?.["cahiers"]}
        envConfig={envConfig}
        dir={dir}
        locales={locales}
      />
    </div>
  );
}
