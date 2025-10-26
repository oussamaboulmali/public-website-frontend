import NewsTickerWrapper from "./NewsTickerClient";
import { fetchData } from "../../../Api/fetchData";

export default async function NewsTicker({ dir, envConfig }) {
  let emergencies = [];

  try {
    const articles = await fetchData(
      envConfig.baseUrl + "home/emergencies",
      "GET",
      {},
      true,
      true,
      null,
      null,
      "emergencies"
    );

    emergencies = articles?.data?.data || [];
  } catch (error) {
    emergencies = [];
  }
  return (
    <NewsTickerWrapper
      dir={dir}
      envConfig={envConfig}
      initialEmergencies={emergencies}
    />
  );
}
