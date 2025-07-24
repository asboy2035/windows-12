<script setup lang="ts">
  import {Icon} from '@iconify/vue'

  function showLockScreen() {
    document.getElementById("lockScreen")?.classList.remove("closing")
    document.getElementById("lsBg")?.classList.remove("closing")
  }
</script>

<template>
  <div class="lockTabContainer">
    <div class="lockTab" @click="showLockScreen">
      <Icon icon="fluent:lock-closed-16-regular" class="lockTabIcon" />
      <p>Lock</p>
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .lockTabContainer
    position: fixed
    display: flex
    justify-content: center
    top: 0
    left: 0
    right: 0

    &:hover > .lockTab
      transform: none !important

    .lockTab
      width: 10rem
      background: colors.$uiBackground
      display: flex
      justify-content: center
      gap: 0.35rem
      padding: 0.25rem 0
      align-items: center
      border-radius: 0 0 1rem 1rem
      transform: translateY(-100%)
      transition: 0.4s ease
      cursor: pointer
      backdrop-filter: blur(1rem)

      svg
        width: 1.5rem
        height: 1.5rem
</style>