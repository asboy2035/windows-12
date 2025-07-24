<script setup lang="ts">
  import VStack from '@/components/VStack.vue'
</script>

<template>
  <v-stack class="sidebar">
    <slot />
  </v-stack>
</template>

<style scoped lang="sass">
  .sidebar
    gap: 0.35rem
    width: 15rem
    min-width: fit-content
    height: 100%
    justify-content: flex-start
    align-items: flex-start

    ::v-deep(p.caption)
      margin: 0.75rem 0.5rem 0
</style>
