import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/global.sass'

const Windows11App = createApp(App)

Windows11App
  .use(router)
  .mount('#app')
