<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Galeries Photos</h1>
    
    <div v-if="loading" class="text-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="error" class="alert alert-error">
      {{ error }}
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Gallery grid will be implemented here -->
      <p class="col-span-full text-center text-gray-500">
        Gallery component to be implemented
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
