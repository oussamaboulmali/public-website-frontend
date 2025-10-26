import { fetchData } from "../../../Api/fetchData";
import { getConfig } from "../../../lib/config";
import Error from "../../../compoenents/ui/maintenance";
import BreadCrumb from "../../../compoenents/ui/breadCrumb";
import GalerieList from "../../../compoenents/Galeries/galerieList";
import translations from "locales/translation";

export default async function Page() {
  const { envConfig, dir } = await getConfig();
  const pageSize = 12;
  const galerieList = await fetchData(
    envConfig?.baseUrl + "galleries",
    "post",
    {
      pageSize: pageSize,
      page: 1,
    }
  );

  let updatedSlugs = [
    //{ path: null, label: "Multimédia" },
    { path: "galeries-photos", label: translations?.galeriesPhotos },
  ];

  // Vérifiez status api
  if (galerieList.status >= 400 && galerieList.status < 500) {
    notFound();
  }

  if (galerieList.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <div className="w-[95%] 2xl:w-[90%] mx-auto">
      <BreadCrumb items={updatedSlugs} dir={dir} others={true} />
      <GalerieList
        galerie={galerieList?.data?.data}
        count={galerieList?.data?.count}
        envConfig={envConfig}
        pageSize={pageSize}
        dir={dir}
      />
    </div>
  );
}
