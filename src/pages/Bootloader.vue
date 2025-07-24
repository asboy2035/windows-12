<script setup lang="ts">
  import {Icon} from '@iconify/vue'
  import router from '@/router'

  setInterval(() => {
    router.push({ name: 'desktop' })
  }, 5000)
</script>

<template>
  <div class="bootLoader">
    <Icon icon="svg-spinners:90-ring" class="loader" />
    <h1>Starting...</h1>
  </div>
</template>

<style scoped lang="sass">
  .bootLoader
    position: fixed
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    top: 0
    bottom: 0
    left: 0
    right: 0
    gap: 1rem
    cursor: none
    z-index: 10000

    background: black
    color: white

    .loader
      width: 4rem
      height: 4rem
</style>
