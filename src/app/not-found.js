import Link from "next/link";
import translations from "../../locales/translation";
import { getConfig } from "../../lib/config";

export default async function NotFound() {
  const { dir } = await getConfig();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl px-6 py-12 relative">
        {/* Style des bulles flottantes - inversées pour RTL */}
        <div
          className={`absolute -top-20 ${
            dir === "rtl" ? "-right-20" : "-left-20"
          } w-40 h-40 bg-indigo-300 rounded-full opacity-20 animate-float-slow`}
        ></div>
        <div
          className={`absolute top-10 ${
            dir === "rtl" ? "left-10" : "right-10"
          } w-20 h-20 bg-blue-300 rounded-full opacity-30 animate-float-medium`}
        ></div>
        <div
          className={`absolute bottom-10 ${
            dir === "rtl" ? "right-32" : "left-32"
          } w-28 h-28 bg-purple-300 rounded-full opacity-20 animate-float-fast`}
        ></div>

        {/* 404 stylisé */}
        <div className="relative mb-8">
          <h1
            className={`text-9xl font-bold text-center text-transparent bg-clip-text ${
              dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"
            } from-[#003979] to-[#1D589FCC]`}
          >
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            <div
              className={`h-2 ${
                dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"
              } from-transparent via-[#1D589FCC] to-transparent`}
            ></div>
          </div>
        </div>

        {/* Message d'erreur */}
        <div className="text-center space-y-6 relative z-10" dir={dir}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {translations["404_title"]}
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            {translations["404_description"]}
          </p>

          {/* Illustration simple */}
          <div className="py-6 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <div
                    className={`flex ${
                      dir === "rtl" ? "space-x-1 space-x-reverse" : "space-x-1"
                    }`}
                  >
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-indigo-100 rounded-full">
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Bouton de retour */}
          <div className="pt-4">
            <Link
              href="/"
              className={`inline-block px-6 py-3 ${
                dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"
              } from-[#003979] to-[#1D589F] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
              prefetch={false}
            >
              {translations["404_backToHome"]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
