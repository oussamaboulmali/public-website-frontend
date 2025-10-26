<template>
  <footer class="bg-gray-800 text-white py-8 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">APS</h3>
          <p class="text-gray-300">Agence de presse algérienne</p>
        </div>
        
        <div>
          <h4 class="font-bold mb-4">Liens rapides</h4>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-300 hover:text-white">Accueil</router-link></li>
            <li><router-link to="/a-propos-de-l-aps" class="text-gray-300 hover:text-white">À propos</router-link></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-bold mb-4">Réseaux sociaux</h4>
          <div class="flex space-x-4">
            <a :href="envConfig.ApsFb" target="_blank" class="text-gray-300 hover:text-white">Facebook</a>
            <a :href="envConfig.ApsX" target="_blank" class="text-gray-300 hover:text-white">X</a>
            <a :href="envConfig.ApsYtb" target="_blank" class="text-gray-300 hover:text-white">YouTube</a>
          </div>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} APS. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  locales: Object,
  envConfig: Object,
  dir: String
})
</script>
