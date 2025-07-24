<script setup lang="ts">
  import { computed } from 'vue'
  import type { IFile, IFolder } from '@/types/fileManager'
  import Window from '@/ui/Window.vue'
  import HStack from '@/components/HStack.vue'
  import VStack from '@/components/VStack.vue'
  import { getFileIconPath } from '@/utils/fileIcons'

  const props = defineProps<{
    item: IFile | IFolder | null
    visible: boolean
  }>()

  const emit = defineEmits(['close'])

  const itemPath = computed(() => {
    // This is a simplified path. In a real file manager, you'd need the full path traversal.
    return props.item ? `C:/${props.item.name}` : ''
  })

  const itemType = computed(() => {
    if (!props.item) return ''
    return props.item.type === 'file' ? `File (${props.item.extension.toUpperCase()})` : 'Folder'
  })

  const itemDate = computed(() => {
    return props.item && props.item.type === 'file'
      ? new Date(props.item.date).toLocaleString()
      : 'N/A'
  })
</script>

<template>
  <Window
    v-if="visible && item"
    :app-id="`properties-${item.id}`"
    :title="`Properties: ${item.name}`"
    class="propertiesWindow"
  >
    <VStack class="propertiesContent">
      <HStack class="itemHeader">
        <h-stack class="itemInfo">
          <img :src="getFileIconPath(item)" class="itemIcon" />
          <VStack>
            <h2 class="itemName">{{ item.name }}</h2>
            <p class="itemType">{{ itemType }}</p>
          </VStack>
        </h-stack>

        <button @click="emit('close')">
          close
        </button>
      </HStack>

      <VStack class="itemDetails">
        <HStack class="detailRow">
          <span class="detailLabel">Name:</span>
          <span class="detailValue">{{ item.name }}</span>
        </HStack>
        <HStack class="detailRow" v-if="item.type === 'file'">
          <span class="detailLabel">Extension:</span>
          <span class="detailValue">.{{ item.extension }}</span>
        </HStack>
        <HStack class="detailRow" v-if="item.type === 'file'">
          <span class="detailLabel">Date Modified:</span>
          <span class="detailValue">{{ itemDate }}</span>
        </HStack>
        <HStack class="detailRow">
          <span class="detailLabel">Path:</span>
          <span class="detailValue">{{ itemPath }}</span>
        </HStack>
      </VStack>
    </VStack>
  </Window>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .propertiesWindow
    width: fit-content
    min-width: 25rem
    min-height: fit-content

  .propertiesContent
    width: 100%
    gap: 1rem

  .itemHeader
    align-items: center
    justify-content: space-between
    padding-bottom: 15px
    border-bottom: 1px solid colors.$uiTextTertiary

    .itemInfo
      gap: 0.75rem

      .itemIcon
        width: 4rem
        height: 4rem

      .itemType
        font-size: 0.9rem
        color: colors.$uiTextSecondary

  .itemDetails
    .detailRow
      justify-content: space-between
      padding: 0.25rem 0

      .detailLabel
        font-weight: bold
        color: colors.$uiTextPrimary

      .detailValue
        color: colors.$uiTextSecondary
</style>
