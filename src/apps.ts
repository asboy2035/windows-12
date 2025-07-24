import {useAppsStore} from '@/stores/apps'
import SettingsApp from '@/apps/Settings/SettingsApp.vue'
import AboutApp from '@/apps/About/AboutApp.vue'
import NotepadApp from '@/apps/Notepad/NotepadApp.vue'
import AiChatApp from '@/apps/Chat/AiChatApp.vue'
import FileManagerApp from '@/apps/FileManager/FileManagerApp.vue'

export const installDefaultApps = () => {
  const appsStore = useAppsStore()

  const defaultApps = [
    {
      id: 'settings',
      name: 'Settings',
      icon: '/icons/Settings.png',
      description: 'Configure your system settings',
      component: SettingsApp,
    },
    {
      id: 'about',
      name: 'About',
      icon: '/icons/Start.png',
      description: 'About this project',
      component: AboutApp,
    },
    {
      id: 'notepad',
      name: 'Notepad',
      icon: '/icons/Notepad.png',
      description: 'A simple text editor',
      component: NotepadApp,
    },
    {
      id: 'chat',
      name: 'AI Chat',
      icon: '/icons/Chat.png',
      description: 'C.ai client for win12.',
      component: AiChatApp,
    },
    {
      id: 'file-manager',
      name: 'File Explorer',
      icon: '/icons/FileExplorer.png',
      description: 'Browse your files',
      component: FileManagerApp,
    },
  ]

  defaultApps.forEach(app => {
    if (!appsStore.apps.some(existingApp => existingApp.id === app.id)) {
      appsStore.installApp(app)
    }
  })
}
