import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const config = ref({
    lang: import.meta.env.VITE_LANG || 'fr',
    baseUrl: import.meta.env.VITE_BASE_URL,
    imageUrl: import.meta.env.VITE_IMAGE_URL,
    ApsVideos: import.meta.env.VITE_APS_VIDEOS,
    ApsPhotos: import.meta.env.VITE_APS_PHOTOS,
    ApsOnline: import.meta.env.VITE_APS_ONLINE,
    ApsArchives: import.meta.env.VITE_APS_ARCHIVES,
    ApsFb: import.meta.env.VITE_APS_FB,
    ApsX: import.meta.env.VITE_APS_X,
    ApsYtb: import.meta.env.VITE_APS_YTB,
    ApsLinkedIn: import.meta.env.VITE_APS_LINKEDIN,
    domaine: import.meta.env.VITE_DOMAINE,
    cookiesName: import.meta.env.VITE_COOKIE_NAME,
    frontNum: import.meta.env.VITE_FRONT_NUMBER,
    gaId: import.meta.env.VITE_GA_ID
  })

  return { config }
})
