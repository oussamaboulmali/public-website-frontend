<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div v-if="loading" class="text-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="error" class="alert alert-error">
      {{ error }}
    </div>
    
    <article v-else-if="article" class="bg-white rounded-lg shadow-lg p-6">
      <!-- Article content will be implemented here -->
      <h1 class="text-4xl font-bold mb-4">{{ article.title }}</h1>
      <div class="text-gray-600 mb-6">{{ article.formattedDate }}</div>
      
      <div v-if="article.image?.url" class="mb-6">
        <img 
          :src="`/${config.lang}/api/image/${article.image.url}`"
          :alt="article.image.description"
          class="w-full h-auto rounded-lg"
        />
      </div>
      
      <div class="prose max-w-none" v-html="sanitizedContent"></div>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '@/stores/config'
import { fetchData } from '@/api/fetchData'
import DOMPurify from 'dompurify'

const route = useRoute()
const configStore = useConfigStore()
const config = computed(() => configStore.config)

const article = ref(null)
const loading = ref(false)
const error = ref(null)

const sanitizedContent = computed(() => {
  if (!article.value?.introtext) return ''
  return DOMPurify.sanitize(article.value.introtext)
})

onMounted(async () => {
  loading.value = true
  try {
    const slug = route.params.slug
    const response = await fetchData(`${config.value.baseUrl}article/${slug}`)
    
    if (response.error) {
      error.value = response.error
    } else {
      article.value = response.data
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
