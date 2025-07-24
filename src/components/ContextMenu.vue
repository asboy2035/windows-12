<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import HStack from '@/components/HStack.vue'
  import {Icon} from '@iconify/vue'

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    items: {
      type: Array as () => {
        label: string
        icon?: string
        action: () => void
      }[],
      default: () => [],
    },
  })

  const emit = defineEmits(['close'])

  const contextMenuRef = ref<HTMLElement | null>(null)

  function handleClickOutside(event: MouseEvent) {
    if (contextMenuRef.value && !contextMenuRef.value.contains(event.target as Node)) {
      emit('close')
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  function executeAction(action: () => void) {
    action()
    emit('close')
  }
</script>

<template>
  <div
    v-if="visible"
    ref="contextMenuRef"
    class="contextMenu"
    :style="{ left: `${x}px`, top: `${y}px` }"
  >
    <h-stack
      v-for="(item, index) in items"
      :key="index"
      class="contextMenuItem"
      @click="executeAction(item.action)"
    >
      <icon v-if="item.icon" :icon="item.icon" />
      {{ item.label }}
    </h-stack>
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .contextMenu
    position: fixed
    background: colors.$uiBackgroundAbsolute
    border: 0.1rem solid colors.$uiBackground
    border-radius: 1.25rem
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3)
    z-index: 1000
    min-width: 15rem
    padding: 0.5rem

  .contextMenuItem
    justify-content: flex-start
    gap: 0.5rem
    padding: 0.5rem 0.75rem
    border-radius: 0.75rem
    cursor: pointer
    transition: 0.2s ease

    svg
      width: 1.25rem
      height: 1.25rem

    &:hover
      background: colors.$uiBackground
</style>
