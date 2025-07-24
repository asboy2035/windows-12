<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { type OpenApp } from '@/stores/apps'
import Window from '@/ui/Window.vue'

defineProps<{ window: OpenApp }>()

const content = ref('')
</script>

<template>
  <Window :window="window" visual-effect="blur" title="Notepad" resizable>
    <textarea v-model="content" class="notepadTextarea" placeholder="Start Typing..." />
  </Window>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .notepadTextarea
    width: 100%
    height: 100%
    resize: none
    background: transparent
    color: colors.$uiTextPrimary
    border-radius: 0.75rem
</style>
