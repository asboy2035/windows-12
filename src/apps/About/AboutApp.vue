<script setup lang="ts">
import { defineProps } from 'vue'
import { type OpenApp } from '@/stores/apps'
import Window from '@/ui/Window.vue'
import VStack from '@/components/VStack.vue'

defineProps<{ window: OpenApp }>()
</script>

<template>
  <Window :window="window" visual-effect="blur" resizable title="About" id="aboutApp">
    <v-stack class="spaced">
      <img src="/icons/Start.png" class="logo">
      <h1>About Windows 12</h1>
      <p>This is a web-based replica of the Windows 12 UI.</p>
    </v-stack>
  </Window>
</template>

<style scoped lang="sass">
  .logo
    width: 6rem
    height: 6rem

  #aboutApp
    min-width: 30rem
    min-height: 20rem
</style>
