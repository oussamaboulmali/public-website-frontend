import { fetchData } from "../../../../Api/fetchData";
import BreadCrumb from "../../../../compoenents/ui/breadCrumb";
import Error from "../../../../compoenents/ui/maintenance";
import { getConfig } from "../../../../lib/config";
import TagList from "../../../../compoenents/Tags/TagPosts";
import translations from "locales/translation";

export default async function Page({ params }) {
  const { envConfig, dir } = await getConfig();
  const paramsValue = await params;
  const slug = paramsValue?.tagSlug;
  const pageSize = 12;
  const tagLists = await fetchData(
    envConfig?.baseUrl + "articles/tag",
    "post",
    {
      pageSize: pageSize,
      page: 1,
      alias: slug[0],
    }
  );

  let updatedSlugs = [
    //{ path: null, label: "Multimédia" },
    { path: "tags", label: translations?.tags },
    { path: slug[0], label: slug[0] },
  ];

  // Vérifiez status api
  if (tagLists.status >= 400 && tagLists.status < 500) {
    notFound();
  }

  if (tagLists.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <div className="w-[90%] mx-auto">
      <BreadCrumb items={updatedSlugs} dir={dir} others={true} />
      <TagList
        tag={tagLists?.data?.data}
        count={tagLists?.data?.count}
        envConfig={envConfig}
        pageSize={pageSize}
        dir={dir}
        value={slug[0]}
      />
    </div>
  );
}
