<script setup lang="ts">
  import HStack from '@/components/HStack.vue'
  import {Icon} from '@iconify/vue'

  defineProps<{
    selected?: boolean
    icon: string
    title: string
  }>()
</script>

<template>
  <h-stack
    class="sidebarItem"
    :class="{ selected: selected }"
  >
    <Icon :icon="icon" />
    <p>{{ title }}</p>
  </h-stack>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .sidebarItem
    position: relative
    padding: 0.35rem 0.5rem
    gap: 0.5rem
    width: calc(100% - 2rem)
    justify-content: flex-start
    align-items: center
    border-radius: 0.5rem

    svg
      width: 1.5rem
      height: 1.5rem
      opacity: 0.8

    &:hover
      background: colors.$uiBackground
      cursor: pointer

    &.selected::after
      content: ""
      position: absolute
      height: 60%
      left: -0.15rem
      transform: translateY(-50%)
      top: 50%
      width: 0.3rem
      background: colors.$uiAccent
      border-radius: 1rem
</style>