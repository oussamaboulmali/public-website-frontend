import { fetchData } from "../../../Api/fetchData";
import { getConfig } from "../../../lib/config";
import Error from "../../../compoenents/ui/maintenance";
import BreadCrumb from "../../../compoenents/ui/breadCrumb";
import CahierList from "../../../compoenents/Cahiers/cahierList";
import translations from "locales/translation";

export default async function Page() {
  const { envConfig, dir } = await getConfig();
  const pageSize = 12;
  const cahierList = await fetchData(envConfig?.baseUrl + "cahiers", "post", {
    pageSize: pageSize,
    page: 1,
  });

  let updatedSlugs = [
    //{ path: null, label: "Multimédia" },
    { path: "cahier-multimedia", label: translations?.cahierSlug },
  ];

  // Vérifiez status api
  if (cahierList.status >= 400 && cahierList.status < 500) {
    notFound();
  }

  if (cahierList.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <div className="w-[90%] mx-auto">
      <BreadCrumb items={updatedSlugs} dir={dir} others={true} />
      <CahierList
        cahier={cahierList?.data?.data}
        count={cahierList?.data?.count}
        envConfig={envConfig}
        pageSize={pageSize}
        dir={dir}
      />
    </div>
  );
}
