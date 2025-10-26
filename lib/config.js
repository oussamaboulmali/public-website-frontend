import locales from "../locales/lang";

export async function getConfig() {
  const envConfig = {
    lang: process.env.NEXT_LAN,
    baseUrl: process.env.NEXT_BASE_URL,
    imageUrl: process.env.NEXT_IMAGE_URL,
    ApsVideos: process.env.NEXT_APS_VIDEOS,
    ApsPhotos: process.env.NEXT_APS_PHOTOS,
    ApsOnline: process.env.NEXT_APS_ONLINE,
    ApsArchives: process.env.NEXT_APS_ARCHIVES,
    ApsFb: process.env.NEXT_APS_FB,
    ApsX: process.env.NEXT_APS_X,
    ApsYtb: process.env.NEXT_APS_YTB,
    ApsLinkedIn: process.env.NEXT_APS_LINKEDIN,
    domaine: process.env.NEXT_DOMAINE,
    cookiesName: process.env.NEXT_APS_COOKIE,
    cookiesFormName: process.env.NEXT_APS_FORM,
    cookiesFormExpire: process.env.NEXT_APS_FORM_EXPIRE,
    frontNum: process.env.NEXT_FRONT_NUMBER,
  };

  const dir = locales[process.env.NEXT_LAN]?.dir || "ltr";

  return { envConfig, dir, locales };
}
