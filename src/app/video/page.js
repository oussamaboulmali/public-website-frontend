import { fetchData } from "../../../Api/fetchData";
import { getConfig } from "../../../lib/config";
import VideoList from "../../../compoenents/Videos/videoList";
import Error from "../../../compoenents/ui/maintenance";
import BreadCrumb from "../../../compoenents/ui/breadCrumb";
import translations from "locales/translation";

export default async function Page() {
  const { envConfig, dir } = await getConfig();
  const pageSize = 12;
  const videoList = await fetchData(envConfig?.baseUrl + "videos", "post", {
    pageSize: pageSize,
    page: 1,
  });

  let updatedSlugs = [
    //{ path: null, label: "Multimédia" },
    { path: "video", label: translations?.video },
  ];

  // Vérifiez status api
  if (videoList.status >= 400 && videoList.status < 500) {
    notFound();
  }

  if (videoList.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <div className="w-[90%] mx-auto">
      <BreadCrumb items={updatedSlugs} dir={dir} others={true} />
      <VideoList
        video={videoList?.data?.data}
        count={videoList?.data?.count}
        envConfig={envConfig}
        pageSize={pageSize}
        dir={dir}
      />
    </div>
  );
}
