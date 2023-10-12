import { createRouter, createWebHistory } from 'vue-router'
import GitLookerVue from '@/views/GitLooker.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GitLookerVue
    },
  ]
})

export default router
