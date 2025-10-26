import { getConfig } from "../../../lib/config";
import Search_Archives_wrapper from "../../../compoenents/Archives/SearchArchiveWrapper";

export default async function Page() {
  const { envConfig, dir, locales } = await getConfig();
  const pageSize = 12;

  return (
    <Search_Archives_wrapper
      locales={locales}
      //results={results}
      //totalResults={totalResults}
      envConfig={envConfig}
      pageSize={pageSize}
      dir={dir}
    />
  );
}
