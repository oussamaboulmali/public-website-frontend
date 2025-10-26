import { fetchData } from "../../Api/fetchData";
import CahierList from "../../components/cahier/CahierList";
import { envConfig } from "../../config/env";

// Fonction pour récupérer les searchParams dans Next.js 14+
export default async function CahiersPage({ searchParams }) {
  // Récupérer le numéro de page depuis les paramètres d'URL
  const currentPage = parseInt(searchParams?.page || 1);
  const pageSize = 12; // ou autre valeur que vous utilisez

  // Fetch initial des données pour cette page côté serveur
  const result = await fetchData(envConfig.baseUrl + "cahiers", "post", {
    pageSize: pageSize,
    page: currentPage,
  });

  const cahiers = result?.data?.data || [];
  const count = result?.data?.count || 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cahiers</h1>

      <CahierList
        initialCahier={cahiers}
        count={count}
        pageSize={pageSize}
        envConfig={envConfig}
        dir="ltr"
        currentPage={currentPage}
      />
    </div>
  );
}
