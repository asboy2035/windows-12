<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import HStack from '@/components/HStack.vue'
  import {Icon} from '@iconify/vue'

  const props = defineProps<{
    transparent?: boolean
    visualEffect?: 'blur' | 'windowBackground'
    frameless?: boolean
    resizable?: boolean
    disableMovable?: boolean
    hideManagementButtons?: boolean
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
    :class="{ transparent: transparent, framed: !frameless, blurBackground: visualEffect === 'blur', resizer: resizable, topSafeArea: !hideManagementButtons }"
    :style="{ top: top + 'px', left: left + 'px' }"
    @mousedown="onMouseDown"
  >
    <slot />

    <h-stack v-if="!hideManagementButtons" class="windowManagement">
      <button>
        <Icon icon="fluent:minimize-16-filled" />
      </button>
      <button>
        <Icon icon="fluent:square-12-regular" />
      </button>
      <button class="closeButton">
        <Icon icon="fluent:dismiss-16-filled" />
      </button>
    </h-stack>
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .window
    --windowRadius: 1rem
    display: flex
    position: fixed
    background: colors.$windowBackground
    width: fit-content
    height: fit-content
    min-width: 15rem
    min-height: 7rem
    padding: 0.75rem
    border-radius: var(--windowRadius)

    &.topSafeArea
      padding-top: 2.5rem

    .windowManagement
      position: absolute
      top: 0.25rem
      right: 0.25rem
      z-index: 10

      button
        --buttonRadius: var(--windowRadius)

        background: transparent
        backdrop-filter: none
        padding: 0.15rem

        svg
          scale: 0.8

        &::after
          border: none

        &.closeButton:hover
          background: red

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
      pointer-events: none

    &::after
      border: 0.1rem colors.$windowBorder solid

      &.resizer
        cursor: move

    &::before
      box-shadow: 0 0.5rem 0.75rem colors.$windowShadow
</style>
