import { defineStore } from 'pinia'

export const useTaskbarStore = defineStore('taskbar', {
  state: () => ({
    showTaskbar: true
  }),
  actions: {
    toggleTaskbar() {
      this.showTaskbar = !this.showTaskbar
    }
  }
})
