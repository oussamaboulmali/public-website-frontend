import { fetchData } from "../../../Api/fetchData";
import { getConfig } from "../../../lib/config";
import Error from "../../../compoenents/ui/maintenance";
import BreadCrumb from "../../../compoenents/ui/breadCrumb";
import InfographieList from "../../../compoenents/Infographies/infographieList";
import { notFound } from "next/navigation";
import translations from "locales/translation";

export default async function Page() {
  const { envConfig, dir } = await getConfig();
  const pageSize = 12;
  const infographieList = await fetchData(
    envConfig?.baseUrl + "infographies",
    "post",
    {
      pageSize: pageSize,
      page: 1,
    }
  );

  let updatedSlugs = [
    //{ path: null, label: "Multimédia" },
    { path: "infographie", label: translations?.infographie },
  ];
  // Vérifiez status api
  if (infographieList.status >= 400 && infographieList.status < 500) {
    notFound();
  }

  if (infographieList.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <div className="w-[90%] mx-auto">
      <BreadCrumb items={updatedSlugs} dir={dir} others={true} />
      <InfographieList
        infographie={infographieList?.data?.data}
        count={infographieList?.data?.count}
        envConfig={envConfig}
        pageSize={pageSize}
        dir={dir}
      />
    </div>
  );
}
