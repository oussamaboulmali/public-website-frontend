// Import pour le composant serveur
import { fetchData } from "../../Api/fetchData";
import { notFound } from "next/navigation";
import DesktopHeaderClient from "./desktopHeaderClient";
import Error from "../ui/maintenance";

// Composant serveur qui passe les données au composant client
export default async function DesktopHeader({ locales, envConfig, dir }) {
  const menuData = await fetchData(envConfig.baseUrl + "home/header");

  if (menuData?.status >= 400 && menuData?.status < 500) {
    notFound();
  }

  if (menuData?.status >= 500) {
    return <Error dir={dir} envConfig={envConfig} />;
  }

  return (
    <DesktopHeaderClient
      locales={locales}
      envConfig={envConfig}
      dir={dir}
      menuData={menuData}
    />
  );
}
