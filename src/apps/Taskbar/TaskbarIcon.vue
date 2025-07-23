<script setup lang="ts">
  defineProps<{
    running?: boolean,
    background?: boolean
  }>()
</script>

<template>
  <div class="taskbarIcon" :class="{ running: running, taskbarIconBg: background }">
    <slot />
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  ::v-deep(img)
    height: 2rem
  ::v-deep(svg)
    height: 1.25rem
    width: 1.25rem

  .taskbarIcon
    display: flex
    position: relative
    flex-direction: row
    gap: 0.5rem
    align-items: center
    justify-content: center

    padding: 0.25rem
    border-radius: 0.85rem
    z-index: 5
    transition: 0.2s ease
    border: 0.1rem transparent solid

    &.taskbarIconBg, &:hover
      background: colors.$uiBackground
      border: 0.1rem colors.$uiBackground solid
      cursor: pointer

    &.running::after
      content: ""
      position: absolute
      height: 0.3rem
      bottom: -0.25rem
      transform: translateX(-50%)
      left: 50%
      width: 60%
      background: colors.$uiAccent
      border-radius: 1rem
</style>
