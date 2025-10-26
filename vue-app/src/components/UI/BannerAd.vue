<template>
  <div v-if="banner?.url" class="w-full min-w-full mt-2 hidden sm:flex justify-center">
    <div class="w-[70%] flex justify-center">
      <a
        :href="banner.click_url || '#'"
        class="block w-[90%] mx-auto mb-2"
        target="_blank"
      >
        <img
          :src="`/${envConfig.lang}/api/image/${banner.url}`"
          :alt="banner.name || 'Banner'"
          class="w-auto h-auto min-w-full"
          loading="lazy"
        />
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  banner: Object,
  envConfig: Object
})
</script>
