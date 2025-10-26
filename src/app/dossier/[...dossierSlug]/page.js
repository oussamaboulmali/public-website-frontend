import { notFound } from "next/navigation";
import { fetchData } from "../../../../Api/fetchData";
import DossierContent from "../../../../compoenents/Dossiers/dossierContent";
import BreadCrumb from "../../../../compoenents/ui/breadCrumb";
import Error from "../../../../compoenents/ui/maintenance";
import { getConfig } from "../../../../lib/config";
import { redirect } from "next/navigation";
import translations from "locales/translation";
import { headers } from "next/headers";

export default async function Page({ params }) {
  const { envConfig, dir } = await getConfig();
  const paramsValue = await params;
  const slug = paramsValue?.dossierSlug;
  const pageSize = 4;
  const dossierDetails = await fetchData(
    envConfig.baseUrl + "dossiers/detail",
    "post",
    {
      pageSize: pageSize,
      page: 1,
      alias: slug[0],
    }
  );
  let updatedSlugs = [
    // { path: null, label: "Multimédia" },
    { path: "dossier", label: translations?.dossier },
    { path: slug[0], label: dossierDetails?.data?.data?.name },
  ];

  // Vérifiez status api
  if (dossierDetails.status >= 400 && dossierDetails.status < 500) {
    notFound();
  }

  if (dossierDetails.status >= 300 && dossierDetails.status < 400) {
    redirect(dossierDetails?.data?.data?.alias);
  }

  if (dossierDetails.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <div className="w-[90%] mx-auto">
      <BreadCrumb items={updatedSlugs} dir={dir} others={true} />
      <DossierContent
        dossier={dossierDetails?.data?.data}
        envConfig={envConfig}
        dir={dir}
        pageSize={pageSize}
        alias={slug[0]}
      />
    </div>
  );
}
