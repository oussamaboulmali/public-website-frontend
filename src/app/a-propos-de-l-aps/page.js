import Image from "next/image";
import translations from "../../../locales/translation";
import Icon from "@mdi/react";
import { mdiEmail, mdiFax, mdiMapMarker, mdiPhone } from "@mdi/js";
import { getConfig } from "lib/config";

// Fonction pour détecter et convertir les URLs en liens
const convertUrlsToLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

// Composant pour afficher du texte avec des liens automatiques
const TextWithLinks = ({ children, className = "" }) => {
  if (typeof children !== "string") {
    return <span className={className}>{children}</span>;
  }

  return <span className={className}>{convertUrlsToLinks(children)}</span>;
};

export default async function Apropos() {
  const { envConfig } = await getConfig();
  const {
    introduction,
    histoire,
    histoireTitle,
    title,
    histoireSubTitle,
    histoire1,
    histoire2,
    histoireSubTitle1,
    contact,
  } = translations.apropos;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Section À Propos */}
      <div className="container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">{title}</h1>

            {introduction.map((paragraphe, index) => (
              <p key={index} className="text-gray-700 mb-4">
                &nbsp;&nbsp;
                <TextWithLinks>{paragraphe}</TextWithLinks>
              </p>
            ))}
          </div>

          {/* Section Notre Histoire - Partie principale avec image */}
          <div className="mb-0">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              {histoireTitle}
            </h2>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Contenu textuel - Histoire principale */}
              <div className="lg:w-2/3 space-y-6">
                {histoire.map((item, index) => (
                  <p key={index} className="text-gray-700">
                    &nbsp;&nbsp;
                    <TextWithLinks>{item}</TextWithLinks>
                  </p>
                ))}
              </div>

              {/* Image  */}
              <div className="lg:w-1/3">
                <div className="sticky top-8">
                  <div className="relative rounded-xl overflow-hidden shadow">
                    <Image
                      src={`/${envConfig?.lang}/apropos.png`}
                      alt="Siège de l'APS"
                      width={500}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Histoire1 - Pleine largeur */}
          <div className="mb-8 mt-8 md:mt-8">
            <h3 className="text-xl font-bold text-blue-800 mb-6">
              <TextWithLinks>{histoireSubTitle}</TextWithLinks>
            </h3>
            <div className="space-y-4">
              {histoire1.map((item, index) => (
                <p key={index} className="text-gray-700">
                  &nbsp;&nbsp;
                  <TextWithLinks>{item}</TextWithLinks>
                </p>
              ))}
            </div>
          </div>

          {/* Section Histoire2 - Pleine largeur */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-blue-800 mb-6">
              <TextWithLinks>{histoireSubTitle1}</TextWithLinks>
            </h3>
            <div className="space-y-4">
              {histoire2.map((item, index) => (
                <p key={index} className="text-gray-700">
                  &nbsp;&nbsp;
                  <TextWithLinks>{item}</TextWithLinks>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Section Nous Contacter */}
        <div className="w-[80%] mx-auto bg-blue-50 p-5">
          <h2 className="text-2xl font-bold text-blue-800 mb-10 text-center">
            {translations?.contactUs}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Icon path={mdiPhone} size={1.5} className="text-blue-800" />
              <h3 className="text-lg font-semibold text-black mb-2">
                {translations?.phoneLabel}
              </h3>
              <p className="text-gray-600 text-center">
                <TextWithLinks>{contact?.telephone}</TextWithLinks>
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <Icon path={mdiFax} size={1.5} className="text-blue-800" />
              <h3 className="text-lg font-semibold text-black mb-2">
                {translations?.faxLabel}
              </h3>
              <p className="text-gray-600 text-center">
                <TextWithLinks>{contact.fax}</TextWithLinks>
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <Icon path={mdiEmail} size={1.5} className="text-blue-800" />
              <h3 className="text-lg font-semibold text-black mb-2">
                {translations?.emailLabel}
              </h3>
              <p className="text-gray-600 text-center">
                <TextWithLinks>{contact.email}</TextWithLinks>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
