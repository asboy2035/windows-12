import {useAppsStore} from '@/stores/apps'
import SettingsApp from '@/apps/Settings/SettingsApp.vue'
import AboutApp from '@/apps/About/AboutApp.vue'
import NotepadApp from '@/apps/Notepad/NotepadApp.vue'
import AiChatApp from '@/apps/Chat/AiChatApp.vue'

export const installDefaultApps = () => {
  const appsStore = useAppsStore()

  appsStore.installApp({
    id: 'settings',
    name: 'Settings',
    icon: '/icons/Settings.png',
    description: 'Configure your system settings',
    component: SettingsApp,
  })

  appsStore.installApp({
    id: 'about',
    name: 'About',
    icon: '/icons/Start.png',
    description: 'About this project',
    component: AboutApp,
  })

  appsStore.installApp({
    id: 'notepad',
    name: 'Notepad',
    icon: '/icons/Notepad.png',
    description: 'A simple text editor',
    component: NotepadApp,
  })

  appsStore.installApp({
    id: 'chat',
    name: 'AI Chat',
    icon: '/icons/Chat.png',
    description: 'C.ai client for win12.',
    component: AiChatApp,
  })
}
