import { createRouter, createWebHistory } from 'vue-router'
import Desktop from '@/pages/Desktop.vue'
import Bootloader from '@/pages/Bootloader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Bootloader, name: 'bootloader' },
    { path: '/Desktop', component: Desktop, name: 'desktop' },
  ],
})

export default router
