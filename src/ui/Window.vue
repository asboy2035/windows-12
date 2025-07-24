<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue'
  import { useAppsStore, type OpenApp } from '@/stores/apps'
  import { useTaskbarStore } from '@/stores/taskbar'
  import HStack from '@/components/HStack.vue'
  import { Icon } from '@iconify/vue'

  const props = defineProps<{
    window?: OpenApp
    transparent?: boolean
    visualEffect?: 'blur' | 'windowBackground'
    frameless?: boolean
    resizable?: boolean
    disableMovable?: boolean
    hideManagementButtons?: boolean
    zIndex?: number
    title?: string
  }>()

  const appsStore = useAppsStore()
  const taskbarStore = useTaskbarStore()

  const top = ref(props.window?.y || 0)
  const left = ref(props.window?.x || 0)
  const width = ref(props.window?.width || 0)
  const height = ref(props.window?.height || 0)
  const isMaximized = ref(props.window?.isMaximized || false)
  const isClosing = ref(false)
  const isMinimizing = ref(false)

  let isDragging = false
  let offsetX = 0
  let offsetY = 0

  let isResizing = false
  let resizeDirection = ''
  let initialX = 0
  let initialY = 0
  let initialWidth = 0
  let initialHeight = 0
  let initialTop = 0
  let initialLeft = 0

  watch(() => props.window?.isMaximized, (newValue) => {
    isMaximized.value = newValue || false
  })

  const windowStyle = computed(() => ({
    top: props.window ? `${top.value}px` : undefined,
    left: props.window ? `${left.value}px` : undefined,
    width: isMaximized.value ? '100vw' : props.window ? `${width.value}px` : undefined,
    height: isMaximized.value ? (taskbarStore.showTaskbar ? 'calc(100vh - 3.5rem - 5rem)' : '100vh') : props.window ? `${height.value}px` : undefined,
    zIndex: props.window?.zIndex || props.zIndex,
    display: props.window?.isMinimized ? 'none' : 'flex',
  }))

  const onMouseDown = (e: MouseEvent) => {
    if (props.disableMovable || !props.window || isMaximized.value) return

    appsStore.focusApp(props.window.id)
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
    if (!isDragging) return
    isDragging = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    if (props.window) {
      props.window.x = left.value
      props.window.y = top.value
      appsStore.saveOpenApps()
    }
  }

  const onResizeMouseDown = (e: MouseEvent, direction: string) => {
    if (!props.resizable || !props.window || isMaximized.value) return
    e.stopPropagation()

    isResizing = true
    resizeDirection = direction
    initialX = e.clientX
    initialY = e.clientY
    initialWidth = width.value
    initialHeight = height.value
    initialTop = top.value
    initialLeft = left.value

    window.addEventListener('mousemove', onResizeMouseMove)
    window.addEventListener('mouseup', onResizeMouseUp)
  }

  const onResizeMouseMove = (e: MouseEvent) => {
    if (!isResizing) return

    const dx = e.clientX - initialX
    const dy = e.clientY - initialY

    if (resizeDirection.includes('right')) {
      width.value = initialWidth + dx
    }
    if (resizeDirection.includes('left')) {
      width.value = initialWidth - dx
      left.value = initialLeft + dx
    }
    if (resizeDirection.includes('bottom')) {
      height.value = initialHeight + dy
    }
    if (resizeDirection.includes('top')) {
      height.value = initialHeight - dy
      top.value = initialTop + dy
    }
  }

  const onResizeMouseUp = () => {
    if (!isResizing) return
    isResizing = false
    window.removeEventListener('mousemove', onResizeMouseMove)
    window.removeEventListener('mouseup', onResizeMouseUp)
    if (props.window) {
      props.window.width = width.value
      props.window.height = height.value
      props.window.x = left.value
      props.window.y = top.value
      appsStore.saveOpenApps()
    }
  }

  const close = () => {
    if (!props.window) return
    isClosing.value = true

    setTimeout(() => {
      appsStore.closeApp(props.window!.id)
    }, 300)
  }

  const minimize = () => {
    if (!props.window) return
    isMinimizing.value = true

    setTimeout(() => {
      appsStore.minimizeApp(props.window!.id)
      isMinimizing.value = false
    }, 300)
  }

  const toggleMaximize = () => {
    if (!props.window) return
    appsStore.toggleMaximize(props.window.id)
  }

  onMounted(() => {
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mouseup', onResizeMouseUp)
  })
</script>

<template>
  <div
    class="window windowBackground"
    :class="{
      transparent: transparent,
      framed: !frameless,
      blurBackground: visualEffect === 'blur',
      topSafeArea: !hideManagementButtons,
      maximized: isMaximized,
      closing: isClosing,
      minimizing: isMinimizing,
      hideTaskbar: !taskbarStore.showTaskbar && isMaximized,
    }"
    :style="windowStyle"
    @mousedown="onMouseDown"
  >
    <slot />

    <div v-if="resizable && !isMaximized">
      <div class="resize-handle top" @mousedown.stop="(e) => onResizeMouseDown(e, 'top')"></div>
      <div class="resize-handle bottom" @mousedown.stop="(e) => onResizeMouseDown(e, 'bottom')"></div>
      <div class="resize-handle left" @mousedown.stop="(e) => onResizeMouseDown(e, 'left')"></div>
      <div class="resize-handle right" @mousedown.stop="(e) => onResizeMouseDown(e, 'right')"></div>
      <div class="resize-handle top-left" @mousedown.stop="(e) => onResizeMouseDown(e, 'top-left')"></div>
      <div class="resize-handle top-right" @mousedown.stop="(e) => onResizeMouseDown(e, 'top-right')"></div>
      <div class="resize-handle bottom-left" @mousedown.stop="(e) => onResizeMouseDown(e, 'bottom-left')"></div>
      <div class="resize-handle bottom-right" @mousedown.stop="(e) => onResizeMouseDown(e, 'bottom-right')"></div>
    </div>

    <p v-if="title" class="windowTitle">{{ title }}</p>
    <h-stack v-if="!hideManagementButtons && window" class="windowManagement">
      <button @mousedown.stop @click.stop="minimize">
        <Icon icon="fluent:minimize-16-filled" />
      </button>
      <button @mousedown.stop @click.stop="toggleMaximize">
        <Icon :icon="isMaximized ? 'fluent:window-multiple-16-filled' : 'fluent:square-12-regular'" />
      </button>
      <button class="closeButton" @mousedown.stop @click.stop="close">
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
    animation: openWindow 0.2s ease forwards
    transition: 0.2s ease

    &.maximized
      width: calc(100vw - 1.5rem) !important
      height: calc(100vh - 3.25rem - 5rem) !important
      top: 0 !important
      left: 0 !important
      border: none
      --windowRadius: 0 !important

    &.maximized.hideTaskbar
      height: calc(100vh - 3.25rem) !important

    &.closing
      animation: closeWindow 0.3s ease forwards !important

    @keyframes closeWindow
      0%
        opacity: 1
        scale: 1
      100%
        opacity: 0.7
        scale: 0.6

    &.minimizing
      animation: minimizeWindow 0.3s ease forwards !important

    @keyframes minimizeWindow
      0%
        transform: scale(1)
        opacity: 1
      100%
        transform: translateY(75vh) scale(0.2)
        opacity: 0

    &.topSafeArea
      padding-top: 2.5rem

    .windowTitle
      position: absolute
      top: 0.5rem
      left: 0.85rem

    .windowManagement
      position: absolute
      top: 0.25rem
      right: 0.25rem

      button
        --buttonRadius: var(--windowRadius)

        background: transparent
        backdrop-filter: none
        padding: 0.15rem
        transition: background-color 0.2s ease

        svg
          scale: 0.8

        &::after
          display: none !important

        &:hover
          background: rgba(255, 255, 255, 0.15)

        &.closeButton:hover
          background: #e81123

  @keyframes openWindow
    0%
      opacity: 0.7
      scale: 0.7
    70%
      opacity: 1
      scale: 1.1
    100%
      opacity: 1
      scale: 1

  .blurBackground
    background: colors.$windowBlurColor
    backdrop-filter: blur(5rem)

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

    &::before
      box-shadow: 0 0.5rem 0.75rem colors.$windowShadow

  .resize-handle
    position: absolute
    background: transparent
    z-index: 10

    &.top
      top: -0.5rem
      left: 1rem
      right: 1rem
      height: 1rem
      cursor: ns-resize

    &.bottom
      bottom: -0.5rem
      left: 1rem
      right: 1rem
      height: 1rem
      cursor: ns-resize

    &.left
      left: -0.5rem
      top: 1rem
      bottom: 1rem
      width: 1rem
      cursor: ew-resize

    &.right
      right: -0.5rem
      top: 1rem
      bottom: 1rem
      width: 1rem
      cursor: ew-resize

    &.top-left
      top: -0.5rem
      left: -0.5rem
      width: 1rem
      height: 1rem
      cursor: nwse-resize

    &.top-right
      top: -0.5rem
      right: -0.5rem
      width: 1rem
      height: 1rem
      cursor: nesw-resize

    &.bottom-left
      bottom: -0.5rem
      left: -0.5rem
      width: 1rem
      height: 1rem
      cursor: nesw-resize

    &.bottom-right
      bottom: -0.5rem
      right: -0.5rem
      width: 1rem
      height: 1rem
      cursor: nwse-resize
</style>
