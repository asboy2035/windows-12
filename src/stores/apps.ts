import {defineStore} from 'pinia'
import {markRaw} from 'vue'

export interface App {
  id: string
  name: string
  icon: string
  description: string
  component: any
}

export interface OpenApp {
  id: string
  app: App
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

export const useAppsStore = defineStore('apps', {
  state: () => ({
    apps: [] as App[],
    openApps: [] as OpenApp[],
    nextZIndex: 1,
  }),
  actions: {
    installApp(app: App) {
      this.apps.push(markRaw(app))
    },

    openApp(appId: string) {
      const app = this.apps.find(a => a.id === appId)
      if (!app) return

      const existingApp = this.openApps.find(oa => oa.app.id === appId)
      if (existingApp) {
        this.focusApp(existingApp.id)
        return
      }

      const newWindow: OpenApp = {
        id: `window-${Date.now()}`,
        app,
        x: 100,
        y: 100,
        width: 800,
        height: 600,
        isMinimized: false,
        isMaximized: false,
        zIndex: this.nextZIndex++,
      }
      this.openApps.push(newWindow)
      this.saveOpenApps()
    },

    closeApp(windowId: string) {
      this.openApps = this.openApps.filter(oa => oa.id !== windowId)
      this.saveOpenApps()
    },

    minimizeApp(windowId: string) {
      const app = this.openApps.find(oa => oa.id === windowId)
      if (app) {
        app.isMinimized = true
        this.saveOpenApps()
      }
    },

    toggleMaximize(windowId: string) {
      const app = this.openApps.find(oa => oa.id === windowId)
      if (app) {
        app.isMaximized = !app.isMaximized
        this.saveOpenApps()
      }
    },

    focusApp(windowId: string) {
      const app = this.openApps.find(oa => oa.id === windowId)
      if (app) {
        app.zIndex = this.nextZIndex++
        app.isMinimized = false
        this.saveOpenApps()
      }
    },

    saveOpenApps() {
      const openAppsToSave = this.openApps.map(app => ({
        appId: app.app.id,
        x: app.x,
        y: app.y,
        width: app.width,
        height: app.height,
        isMinimized: app.isMinimized,
        isMaximized: app.isMaximized,
      }))
      localStorage.setItem('openApps', JSON.stringify(openAppsToSave))
    },

    restoreOpenApps() {
      const savedApps = localStorage.getItem('openApps')
      if (savedApps) {
        const parsedApps = JSON.parse(savedApps)
        parsedApps.forEach((savedApp: any) => {
          const app = this.apps.find(a => a.id === savedApp.appId)
          if (app) {
            const newWindow: OpenApp = {
              id: `window-${Date.now()}`,
              app,
              x: savedApp.x,
              y: savedApp.y,
              width: savedApp.width,
              height: savedApp.height,
              isMinimized: savedApp.isMinimized,
              isMaximized: savedApp.isMaximized,
              zIndex: this.nextZIndex++,
            }
            this.openApps.push(newWindow)
          }
        })
      }
    },
  },
})
