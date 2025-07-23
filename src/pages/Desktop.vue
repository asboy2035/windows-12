<script setup lang="ts">
  import Window from '@/ui/Window.vue'
  import Taskbar from '@/apps/Taskbar/Taskbar.vue'
  import SettingsApp from '@/apps/Settings/SettingsApp.vue'
</script>

<template>
  <settings-app />
  <window visual-effect="blur">
    <h3>This is a window</h3>
  </window>

  <taskbar />
</template>

<style scoped>

</style>
