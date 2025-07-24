<script setup lang="ts">
import { useAppsStore } from '@/stores/apps'
import Taskbar from '@/apps/Taskbar/Taskbar.vue'

const appsStore = useAppsStore()
</script>

<template>
  <component
    v-for="app in appsStore.openApps"
    :is="app.app.component"
    :key="app.id"
    :window="app"
  />

  <taskbar />
</template>

