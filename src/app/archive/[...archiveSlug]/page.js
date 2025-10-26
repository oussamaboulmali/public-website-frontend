import { notFound } from "next/navigation";
import { fetchData } from "../../../../Api/fetchData";
import BreadCrumb from "../../../../compoenents/ui/breadCrumb";
import Error from "../../../../compoenents/ui/maintenance";
import { getConfig } from "../../../../lib/config";
import ArchivePost from "../../../../compoenents/Archives/ArchivePosts";
import { cookies } from "next/headers";
import translations from "locales/translation";

export default async function Page({ params }) {
  const { envConfig, dir } = await getConfig();
  const paramsValue = await params;
  const slug = paramsValue?.archiveSlug;
  const pageSize = 4;

  const cookiesAwaited = await cookies();
  const cookiesUpdated = cookiesAwaited?.get(envConfig?.cookiesName);
  const cookiesValue = cookiesUpdated?.value;
  const archiveDetails = await fetchData(
    envConfig.baseUrl + "archives/detail",
    "post",
    {
      alias: slug[0],
    },
    false,
    false,
    cookiesValue
  );
  let updatedSlugs = [
    { path: "archive", label: translations?.archives },
    { path: slug?.[0], label: archiveDetails?.data?.data?.title },
  ];

  // Vérifiez status api
  if (archiveDetails.status >= 400 && archiveDetails.status < 500) {
    notFound();
  }

  if (archiveDetails.status >= 300 && archiveDetails.status < 400) {
    redirect(archiveDetails?.data?.data?.alias);
  }

  if (archiveDetails.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }
  return (
    <div className="w-[90%] mx-auto">
      <BreadCrumb items={updatedSlugs} dir={dir} others={true} />
      <ArchivePost article={archiveDetails?.data?.data} />
    </div>
  );
}
