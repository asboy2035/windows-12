<script setup lang="ts">
  import Window from '@/ui/Window.vue'
  import {defineProps} from 'vue'
  import type {OpenApp} from '@/stores/apps.ts'

  defineProps<{ window: OpenApp }>()
</script>

<template>
  <window :window="window" visual-effect="blur" resizable title="AI Chat">
    <iframe class="webView" src="https://c.ai/" />
  </window>
</template>

<style scoped lang="sass">
  .webView
    border-radius: 0.5rem
    border: none
    width: 100%
</style>
