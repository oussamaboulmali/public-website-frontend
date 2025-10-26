import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory('/fr'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:slug',
      name: 'article',
      component: () => import('@/views/ArticleView.vue')
    },
    {
      path: '/video/:slug',
      name: 'video',
      component: () => import('@/views/VideoView.vue')
    },
    {
      path: '/galeries-photos/:slug?',
      name: 'galeries',
      component: () => import('@/views/GaleriesView.vue')
    },
    {
      path: '/infographie/:slug?',
      name: 'infographie',
      component: () => import('@/views/InfographieView.vue')
    },
    {
      path: '/cahier-multimedia/:slug?',
      name: 'cahier',
      component: () => import('@/views/CahierView.vue')
    },
    {
      path: '/dossier/:slug?',
      name: 'dossier',
      component: () => import('@/views/DossierView.vue')
    },
    {
      path: '/archive/:slug?',
      name: 'archive',
      component: () => import('@/views/ArchiveView.vue')
    },
    {
      path: '/tags/:slug',
      name: 'tags',
      component: () => import('@/views/TagsView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue')
    },
    {
      path: '/a-propos-de-l-aps',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
