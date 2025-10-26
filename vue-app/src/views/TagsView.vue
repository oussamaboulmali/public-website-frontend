<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Tag: {{ tag }}</h1>
    
    <div v-if="loading" class="text-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="error" class="alert alert-error">
      {{ error }}
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Tagged posts will be implemented here -->
      <p class="col-span-full text-center text-gray-500">
        Tag posts component to be implemented
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '@/stores/config'

const route = useRoute()
const configStore = useConfigStore()
const config = computed(() => configStore.config)

const tag = computed(() => route.params.slug)
const loading = ref(false)
const error = ref(null)

onMounted(() => {
  // Fetch tag posts logic will be implemented here
})
</script>
