<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Archives</h1>
    
    <div v-if="loading" class="text-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="error" class="alert alert-error">
      {{ error }}
    </div>
    
    <div v-else class="grid grid-cols-1 gap-6">
      <!-- Archive listing will be implemented here -->
      <p class="text-center text-gray-500">
        Archive component to be implemented
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
const config = computed(() => configStore.config)

const loading = ref(false)
const error = ref(null)
</script>
