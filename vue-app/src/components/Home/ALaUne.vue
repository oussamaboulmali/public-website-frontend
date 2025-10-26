<template>
  <div v-if="block?.articles && block.articles.length > 0">
    <!-- Desktop Design -->
    <div class="hidden w-[95%] mx-auto md:block 2xl:w-[85%]">
      <div class="grid grid-cols-[auto_380px] gap-2 2xl:gap-6">
        <!-- Main Article -->
        <div class="h-[590px] bg-white rounded-[5px] flex gap-4">
          <div class="w-[70%] lg:w-[70%] h-full shadow-md rounded-[5px] overflow-hidden relative">
            <router-link :to="`/${mainArticle.alias}`">
              <div class="w-full h-full flex flex-col">
                <div class="relative h-[80%] w-full">
                  <img
                    :src="`/${envConfig.lang}/api/image/${mainArticle?.image?.url}`"
                    :alt="mainArticle?.image?.description"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="h-[20%] w-full p-2 bg-white text-black flex flex-col justify-center" :dir="dir">
                  <h2 class="text-lg font-bold line-clamp-2" :title="mainArticle.title">
                    {{ mainArticle.title }}
                  </h2>
                  <p class="text-xs font-bold text-gray-900 mt-1">
                    {{ formatDate(mainArticle.formattedDate) }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Secondary Articles -->
          <div class="w-[30%] lg:w-[40%] flex flex-col gap-4">
            <div
              v-for="(article, index) in secondaryArticles"
              :key="article.id_article || index"
              class="relative h-[300px] rounded-[5px] overflow-hidden shadow-md"
            >
              <router-link :to="`/${article.alias}`">
                <div class="w-full h-full flex flex-col">
                  <div class="relative h-[75%] w-full">
                    <img
                      :src="`/${envConfig.lang}/api/image/${article?.image?.url}`"
                      :alt="article?.image?.description"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div class="h-[25%] w-full p-2 bg-[#F8F9FA] text-black flex flex-col justify-center" :dir="dir">
                    <h2 class="text-sm font-bold line-clamp-1" :title="article.title">
                      {{ article.title }}
                    </h2>
                    <p class="text-[11px] font-bold text-gray-900 mt-1">
                      {{ formatDate(article.formattedDate) }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Banner or News Feed -->
        <div class="w-full p-2">
          <div v-if="banner?.url" class="relative rounded-[5px] overflow-hidden shadow-lg h-[590px]">
            <a :href="banner.click_url || '#'" class="block w-full h-full" target="_blank">
              <img
                :src="`/${envConfig.lang}/api/image/${banner.url}`"
                :alt="banner.name"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Design -->
    <div class="block md:hidden">
      <div class="w-[94%] mx-auto bg-white p-2 rounded-[5px] shadow-lg h-[527px] flex flex-col space-y-2">
        <router-link
          :to="`/${mainArticle.alias}`"
          class="h-[60%] rounded-[5px] relative overflow-hidden group"
        >
          <img
            :src="`/${envConfig.lang}/api/image/${mainArticle?.image?.url}`"
            :alt="mainArticle?.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div
            class="absolute bottom-0 w-full h-[90px] p-3 bg-gradient-to-t from-[#F8F9FA] from-10% via-[#F8F9FA]/73 via-73% to-[#F8F9FA]/2 to-85% text-white flex flex-col justify-center"
            :dir="dir"
          >
            <h2 class="text-black text-[17px] font-semibold line-clamp-2">
              {{ mainArticle?.title }}
            </h2>
            <p class="text-gray-800 text-xs">
              {{ formatDate(mainArticle?.formattedDate) }}
            </p>
          </div>
        </router-link>

        <div class="h-[60%] flex flex-col space-y-1">
          <router-link
            v-for="(article, index) in secondaryArticles"
            :key="index"
            :to="`/${article.alias}`"
            class="flex-1 p-2 bg-gray-100 flex flex-row space-x-4 rounded-[5px] hover:bg-gray-200 transition"
          >
            <div class="relative w-[40%] h-full rounded-[5px] overflow-hidden">
              <img
                :src="`/${envConfig.lang}/api/image/${article?.image?.url}`"
                :alt="article?.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col justify-center w-[60%] space-y-1">
              <h3 class="text-[16px] font-semibold line-clamp-2">
                {{ article?.title }}
              </h3>
              <p class="text-xs text-gray-800">
                {{ formatDate(article?.formattedDate) }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: Object,
  envConfig: Object,
  dir: String,
  locales: Object,
  banner: Object
})

const mainArticle = computed(() => props.block?.articles[0])
const secondaryArticles = computed(() => props.block?.articles?.slice(1, 3) || [])

const formatDate = (dateString) => {
  if (!dateString) return ''
  return dateString.split(' ').slice(0, 4).join(' ')
}
</script>
