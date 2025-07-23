<template>
  <div class="hStack">
    <slot />
  </div>
</template>

<style scoped lang="sass">
  .hStack
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
</style>
