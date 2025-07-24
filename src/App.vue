<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useAppsStore } from '@/stores/apps'
  import { installDefaultApps } from '@/apps'

  const appsStore = useAppsStore()

  onMounted(() => {
    installDefaultApps()
    appsStore.restoreOpenApps()
  })
</script>

<template>
  <RouterView />
</template>
