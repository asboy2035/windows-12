<script setup lang="ts">
  import {onMounted, ref} from 'vue'
  import { useAppsStore } from '@/stores/apps'
  import { installDefaultApps } from '@/apps'
  import LockScreen from '@/pages/LockScreen.vue'

  const appsStore = useAppsStore()

  onMounted(() => {
    installDefaultApps()
    appsStore.restoreOpenApps()
  })

  const lockScreen = ref()
</script>

<template>
  <lock-screen ref="lockScreen" />
  <RouterView />
</template>
