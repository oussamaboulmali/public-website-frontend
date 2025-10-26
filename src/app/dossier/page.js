import { fetchData } from "../../../Api/fetchData";
import { getConfig } from "../../../lib/config";
import DossierList from "../../../compoenents/Dossiers/dossierList";
import Error from "../../../compoenents/ui/maintenance";
import BreadCrumb from "../../../compoenents/ui/breadCrumb";
import { redirect } from "next/navigation";
import translations from "locales/translation";

export default async function Page() {
  const { envConfig, dir } = await getConfig();
  const pageSize = 12;
  const dossierList = await fetchData(envConfig?.baseUrl + "dossiers", "post", {
    pageSize: pageSize,
    page: 1,
  });

  let updatedSlugs = [
    //{ path: null, label: "Multimédia" },
    { path: "dossier", label: translations?.dossier },
  ];
  if (dossierList?.status >= 300 && dossierList?.status < 400) {
    redirect(dossierList?.data?.data?.alias);
  }
  // Vérifiez status api
  if (dossierList.status >= 400 && dossierList.status < 500) {
    notFound();
  }

  if (dossierList.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <div className="w-[90%] mx-auto">
      <BreadCrumb items={updatedSlugs} dir={dir} others={true} />
      <DossierList
        dossier={dossierList?.data?.data}
        count={dossierList?.data?.count}
        envConfig={envConfig}
        pageSize={pageSize}
        dir={dir}
      />
    </div>
  );
}
