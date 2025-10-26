export const dynamic = "force-dynamic";
import React from "react";
import { Roboto } from "next/font/google";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Header from "../../compoenents/Menu/desktopHeader";
import Footer from "../../compoenents/Footer/footer";
import { getConfig } from "../../lib/config";
import NextTopLoader from "nextjs-toploader";
import NewsTicker from "../../compoenents/ui/barres/FixedBarre";
import GoToTop from "../../compoenents/ui/goToTop";
import translations from "../../locales/translation";
import { headers } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
const notoKufi = Noto_Kufi_Arabic({
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export async function generateMetadata() {
  const { envConfig } = await getConfig();
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = "https";
  const domain = `${protocol}://${host}`;

  return {
    title: {
      default: translations.metadata.title,
      template: translations.metadata.titleTemplate,
    },
    description: translations.metadata.description,
    authors: [
      {
        name: process.env.NEXT_PUBLIC_DOMAINE,
        url: translations.metadata.authorUrl,
      },
    ],
    creator: translations.metadata.creator,
    publisher: translations.metadata.publisher,
    openGraph: {
      title: translations.metadata.openGraph.title,
      description: translations.metadata.openGraph.description,
      url: process.env.NEXT_PUBLIC_DOMAINE,
      siteName: translations.metadata.openGraph.siteName,
      locale: translations.metadata.openGraph.locale,
      type: translations.metadata.openGraph.type,
      images: [
        {
          url: domain + "/" + envConfig?.lang + "/logo-a.png",
          width: 1200,
          height: 630,
          alt: translations.metadata.openGraph.imageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        maxSnippet: -1,
        maxImagePreview: "large",
        maxVideoPreview: -1,
      },
    },
    icons: {
      icon: domain + "/" + envConfig?.lang + "/logo-a.png",
    },
  };
}

export default async function RootLayout({ children }) {
  const { envConfig, dir, locales } = await getConfig();

  return (
    <html
      lang={envConfig.lang}
      dir={dir}
      className="bg-[#F5F5F5] md:bg-white text-black"
      suppressHydrationWarning
    >
      <body className={dir === "rtl" ? notoKufi?.className : roboto.className}>
        <NextTopLoader
          color="rgba(255, 255, 255, 0.6)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={false}
          showSpinner={false}
          easing="ease"
          speed={1000}
          shadow="0 0 10px rgba(187, 222, 251, 0.8), 0 0 5px rgba(187, 222, 251, 0.6)"
          template='<div class="bar" role="bar"><div class="peg"></div></div> '
          zIndex={1600}
          showAtBottom={false}
        />
        <Header locales={locales} dir={dir} envConfig={envConfig} />
        <main className="py-3  overflow-x-hidden md:py-4">{children}</main>
        <Footer locales={locales} dir={dir} envConfig={envConfig} />
        <NewsTicker dir={dir} envConfig={envConfig} />
        <GoToTop dir={dir} />
      </body>
      <GoogleAnalytics gaId="G-78HW8WYBXK" />
    </html>
  );
}
