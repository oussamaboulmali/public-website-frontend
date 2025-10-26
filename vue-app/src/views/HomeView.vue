<template>
  <div class="flex flex-col space-y-3 md:space-y-8">
    <div v-if="loading" class="text-center py-10">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="error" class="text-center py-10 text-red-500">
      {{ error }}
    </div>
    
    <template v-else>
      <!-- Banner Position 1 -->
      <BannerAd v-if="getBanner(1)" :banner="getBanner(1)" :envConfig="config" />
      
      <!-- A la Une Section -->
      <ALaUne 
        v-if="homeData?.['A la une']"
        :block="homeData['A la une']" 
        :envConfig="config" 
        :dir="dir" 
        :locales="locales"
        :banner="getBanner(2)"
      />
      
      <!-- More sections will be added here -->
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useConfigStore } from '@/stores/config'
import { fetchData } from '@/api/fetchData'
import locales from '@/locales/lang'
import ALaUne from '@/components/Home/ALaUne.vue'
import BannerAd from '@/components/UI/BannerAd.vue'

const configStore = useConfigStore()
const config = computed(() => configStore.config)
const dir = computed(() => locales[config.value.lang]?.dir || 'ltr')

const homeData = ref(null)
const loading = ref(false)
const error = ref(null)

const getBanner = (position) => {
  return homeData.value?.data?.banners?.find(b => b.position === position)
}

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetchData(config.value.baseUrl + 'home')
    
    if (response.status >= 400) {
      error.value = response.error || 'Error loading home data'
    } else {
      homeData.value = response.data
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
