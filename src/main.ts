import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/global.sass'
import { installDefaultApps } from './apps'
import { useFileManagerStore } from './stores/fileManager'
import { useAppsStore } from './stores/apps'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize default apps and file manager
installDefaultApps()
const appsStore = useAppsStore()
const fileManagerStore = useFileManagerStore()
fileManagerStore.initializeFileManager(appsStore.apps)

app.mount('#app')
