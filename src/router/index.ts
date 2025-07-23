import { createRouter, createWebHistory } from 'vue-router'
import Desktop from '@/pages/Desktop.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Desktop },
  ],
})

export default router
