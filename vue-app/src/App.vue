<template>
  <div 
    :lang="config.lang" 
    :dir="dir" 
    class="bg-[#F5F5F5] md:bg-white text-black min-h-screen"
  >
    <!-- Progress Bar -->
    <div v-if="loading" class="fixed top-0 left-0 right-0 z-[1600]">
      <div class="h-[3px] bg-gradient-to-r from-blue-500 to-blue-300 animate-pulse"></div>
    </div>

    <!-- Header -->
    <Header :locales="locales" :dir="dir" :envConfig="config" />

    <!-- Main Content -->
    <main class="py-3 overflow-x-hidden md:py-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <Footer :locales="locales" :dir="dir" :envConfig="config" />

    <!-- Fixed News Ticker -->
    <NewsTicker :dir="dir" :envConfig="config" />

    <!-- Go To Top Button -->
    <GoToTop :dir="dir" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/config'
import Header from '@/components/Menu/DesktopHeader.vue'
import Footer from '@/components/Footer/Footer.vue'
import NewsTicker from '@/components/UI/Barres/FixedBarre.vue'
import GoToTop from '@/components/UI/GoToTop.vue'
import locales from '@/locales/lang'

const router = useRouter()
const configStore = useConfigStore()
const loading = ref(false)

const config = computed(() => configStore.config)
const dir = computed(() => locales[config.value.lang]?.dir || 'ltr')

// Loading state on route change
router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})

router.afterEach(() => {
  loading.value = false
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
