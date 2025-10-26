<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Search</h1>
    
    <!-- Search form -->
    <div class="mb-8">
      <input
        v-model="searchQuery"
        @keyup.enter="performSearch"
        type="text"
        placeholder="Search..."
        class="input input-bordered w-full max-w-xl"
      />
      <button 
        @click="performSearch"
        class="btn btn-primary ml-2"
      >
        Search
      </button>
    </div>
    
    <!-- Results -->
    <div v-if="loading" class="text-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="error" class="alert alert-error">
      {{ error }}
    </div>
    
    <div v-else-if="results.length > 0">
      <p class="mb-4">Found {{ results.length }} results</p>
      <div class="grid grid-cols-1 gap-4">
        <!-- Search results will be implemented here -->
        <p class="text-gray-500">Search results component to be implemented</p>
      </div>
    </div>
    
    <div v-else-if="hasSearched" class="text-center py-12 text-gray-500">
      No results found
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/config'
import { fetchData } from '@/api/fetchData'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const config = computed(() => configStore.config)

const searchQuery = ref(route.query.q || '')
const results = ref([])
const loading = ref(false)
const error = ref(null)
const hasSearched = ref(false)

const performSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  loading.value = true
  hasSearched.value = true
  
  try {
    router.push({ query: { q: searchQuery.value } })
    const response = await fetchData(`${config.value.baseUrl}search?q=${searchQuery.value}`)
    
    if (response.error) {
      error.value = response.error
    } else {
      results.value = response.data
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (searchQuery.value) {
    performSearch()
  }
})
</script>
