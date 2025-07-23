<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const props = defineProps<{
    transparent?: boolean
    visualEffect?: 'blur' | 'windowBackground'
    frameless?: boolean
    resizable?: boolean
    disableMovable?: boolean
  }>()

  const top = ref(16)
  const left = ref(16)

  let isDragging = false
  let offsetX = 0
  let offsetY = 0

  const onMouseDown = (e: MouseEvent) => {
    if (props.disableMovable) return

    isDragging = true
    offsetX = e.clientX - left.value
    offsetY = e.clientY - top.value
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    top.value = e.clientY - offsetY
    left.value = e.clientX - offsetX
  }

  const onMouseUp = () => {
    isDragging = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  onMounted(() => {
    window.addEventListener('mouseup', onMouseUp)
  })
</script>

<template>
  <div
    class="window windowBackground"
    :class="{ transparent: transparent, framed: !frameless, blurBackground: visualEffect === 'blur', resizer: resizable }"
    :style="{ top: top + 'px', left: left + 'px' }"
    @mousedown="onMouseDown"
  >
    <slot />
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .window
    --windowRadius: 1rem
    display: flex
    position: fixed
    background: colors.$windowBackground
    min-width: 15rem
    min-height: 7rem
    padding: 0.75rem
    border-radius: var(--windowRadius)

  .blurBackground
    background: colors.$windowBlurColor
    backdrop-filter: blur(2rem)

  .framed
    &::after, &::before
      content: ""
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      border-radius: var(--windowRadius)
      opacity: 0.3

    &::after
      border: 0.1rem colors.$windowBorder solid

      &.resizer
        cursor: move

    &::before
      box-shadow: 0 0.5rem 0.75rem colors.$windowShadow
</style>
