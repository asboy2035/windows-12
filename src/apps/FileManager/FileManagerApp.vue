<script setup lang="ts">
  import Window from '@/ui/Window.vue'
  import { useFileManagerStore } from '@/stores/fileManager'
  import { useAppsStore } from '@/stores/apps'
  import { onMounted, ref, computed } from 'vue'
  import type { IFile, IFolder } from '@/types/fileManager'
  import HStack from '@/components/HStack.vue'
  import VStack from '@/components/VStack.vue'
  import Sidebar from '@/components/Sidebar/Sidebar.vue'
  import SidebarItem from '@/components/Sidebar/SidebarItem.vue'
  import ContextMenu from '@/components/ContextMenu.vue'
  import {Icon} from '@iconify/vue'
  import { getFileIconPath } from '@/utils/fileIcons'

  const fileManagerStore = useFileManagerStore()
  const appsStore = useAppsStore()

  const currentPath = ref<string>('Home')
  const currentFolderContent = ref<(IFile | IFolder)[]>([])
  const selectedItem = ref<IFile | IFolder | null>(null)
  const viewMode = ref<'list' | 'grid'>('grid')

  const showContextMenu = ref(false)
  const contextMenuX = ref(0)
  const contextMenuY = ref(0)
  const contextMenuItems = ref<{
    label: string
    icon: string
    action: () => void
  }[]>([])

  function openContextMenu(event: MouseEvent, item?: IFile | IFolder) {
    event.preventDefault() // Prevent default browser context menu
    showContextMenu.value = true
    contextMenuX.value = event.clientX
    contextMenuY.value = event.clientY

    let targetItem: IFile | IFolder | null = null

    if (item) { // Right-click on a specific item
      targetItem = item
    } else if (selectedItem.value) { // Toolbar button click with an item selected
      targetItem = selectedItem.value
    } else { // Toolbar button click with no item selected (show folder context menu)
      contextMenuItems.value = [
        { label: 'New Folder', icon: 'fluent:folder-add-16-regular', action: () => alert('New Folder') },
        { label: 'Paste', icon: 'fluent:clipboard-paste-16-regular', action: () => alert('Paste') },
        { label: 'View', icon: 'fluent:eye-16-regular', action: () => alert('View options') },
      ]
      return // Exit after setting folder context menu
    }

    if (targetItem.type === 'file') {
      contextMenuItems.value = [
        { label: 'Open', icon: 'fluent:open-16-regular', action: () => openFile(targetItem) },
        { label: 'Download', icon: 'fluent:arrow-download-16-regular', action: () => alert(`Downloading ${targetItem.name}.${targetItem.extension}`) },
        { label: 'Properties', icon: 'fluent:info-16-regular', action: () => alert(`Properties of ${targetItem.name}.${targetItem.extension}`) },
      ]
    } else if (targetItem.type === 'folder') {
      contextMenuItems.value = [
        { label: 'Open', icon: 'fluent:open-16-regular', action: () => openFolder(targetItem.name) },
        { label: 'Properties', icon: 'fluent:info-16-regular', action: () => alert(`Properties of ${targetItem.name}`) },
      ]
    }
  }

  function closeContextMenu() {
    showContextMenu.value = false
  }

  onMounted(() => {
    currentFolderContent.value = fileManagerStore.getFolderContent(currentPath.value)
  })

  const topLevelFolders = ['Home', 'Documents', 'Desktop', 'Downloads', 'Apps', 'System', 'Music', 'Movies', 'Pictures', 'Local Disk (C:)']

  function openFolder(folderName: string) {
    if (topLevelFolders.includes(folderName)) {
      currentPath.value = folderName
    } else {
      currentPath.value = `${currentPath.value}/${folderName}`
    }
    currentFolderContent.value = fileManagerStore.getFolderContent(currentPath.value)
  }

  function openFile(file: IFile) {
    if (file.extension === 'exe') {
      const app = appsStore.apps.find(a => a.name === file.name)
      if (app) {
        appsStore.openApp(app.id)
      }
    }
  }

  const pathSegments = computed(() => {
    return currentPath.value.split('/').filter(segment => segment !== '')
  })

  function navigateToPath(index: number) {
    const newPathSegments = pathSegments.value.slice(0, index + 1)
    currentPath.value = newPathSegments.join('/')
    currentFolderContent.value = fileManagerStore.getFolderContent(currentPath.value)
  }

  function selectItem(item: IFile | IFolder) {
    selectedItem.value = item
  }
</script>

<template>
  <Window
    :app-id="'file-manager'"
    title="File Explorer"
    visual-effect="blur"
    resizable
  >
    <HStack class="fileManagerContent">
      <Sidebar>
        <SidebarItem icon="fluent:home-16-regular" title="Home" @click="openFolder('Home')" />

        <p class="caption light">Files</p>
        <SidebarItem icon="fluent:document-16-regular" title="Documents" @click="openFolder('Documents')" />
        <SidebarItem icon="fluent:tab-desktop-16-regular" title="Desktop" @click="openFolder('Desktop')" />
        <SidebarItem icon="fluent:arrow-download-16-regular" title="Downloads" @click="openFolder('Downloads')" />
        <SidebarItem icon="fluent:apps-16-regular" title="Apps" @click="openFolder('Apps')" />
        <SidebarItem icon="fluent:desktop-16-regular" title="System" @click="openFolder('System')" />

        <p class="caption light">Media</p>
        <SidebarItem icon="fluent:music-note-2-16-regular" title="Music" @click="openFolder('Music')" />
        <SidebarItem icon="fluent:movies-and-tv-16-regular" title="Movies" @click="openFolder('Movies')" />
        <SidebarItem icon="fluent:image-16-regular" title="Pictures" @click="openFolder('Pictures')" />

        <p class="caption light">Locations</p>
        <SidebarItem icon="fluent:hard-drive-16-regular" title="Local Disk (C:)" @click="openFolder('Local Disk (C:)')" />
      </Sidebar>

      <VStack class="mainPanel">
        <HStack class="pathBar">
          <h-stack
            v-for="(segment, index) in pathSegments"
            :key="index"
            @click="navigateToPath(index)"
            class="pathSegment"
          >
            <h2>{{ segment }}</h2>
            <icon
              class="pathSegmentIcon"
              icon="fluent:chevron-right-16-regular"
              v-if="index < pathSegments.length - 1"
            />
          </h-stack>
        </HStack>

        <HStack class="toolbar">
          <h-stack class="spaced">
            <button @click="viewMode = 'list'">
              <icon icon="fluent:list-bar-16-regular" />
            </button>
            <button @click="viewMode = 'grid'">
              <Icon icon="fluent:grid-16-regular" />
            </button>
          </h-stack>

          <button @click="openContextMenu($event)">
            <Icon icon="fluent:more-horizontal-16-regular" />
          </button>
        </HStack>

        <VStack class="fileList" v-if="viewMode === 'list'">
          <HStack
            v-for="item in currentFolderContent"
            :key="item.name"
            class="fileListItem"
            :class="{ selected: selectedItem === item }"
            @click="selectItem(item)"
            @dblclick="item.type === 'folder' ? openFolder(item.name) : openFile(item as IFile)"
            @contextmenu="openContextMenu($event, item)"
          >
            <h-stack>
              <img :src="getFileIconPath(item)" class="itemIcon" />
              <span>{{ item.name }}</span>
              <span v-if="item.type === 'file'">.{{ item.extension }}</span>
            </h-stack>
            <span v-if="item.type === 'file'" class="light">{{ new Date(item.date).toLocaleDateString() }}</span>
          </HStack>
        </VStack>

        <div class="fileGrid" v-if="viewMode === 'grid'">
          <v-stack
            v-for="item in currentFolderContent"
            :key="item.name"
            class="fileGridItem"
            :class="{ selected: selectedItem === item }"
            @click="selectItem(item)"
            @dblclick="item.type === 'folder' ? openFolder(item.name) : openFile(item as IFile)"
            @contextmenu="openContextMenu($event, item)"
          >
            <img :src="getFileIconPath(item)" class="itemIcon" />
            <span class="fileName">{{ item.name }}</span>
            <span v-if="item.type === 'file'" class="light">{{ new Date(item.date).toLocaleDateString() }}</span>
          </v-stack>
        </div>
      </VStack>
    </HStack>

    <ContextMenu
      :visible="showContextMenu"
      :x="contextMenuX"
      :y="contextMenuY"
      :items="contextMenuItems"
      @close="closeContextMenu"
    />
  </Window>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .fileManagerContent
    height: 100%
    width: 100%

  .mainPanel
    width: 100%
    height: 100%

  .pathBar
    justify-content: flex-start
    align-items: center

    .pathSegment
      cursor: pointer
      display: flex
      justify-content: center

      .pathSegmentIcon
        width: 2rem
        height: 1.5rem

  .toolbar
    padding: 0.5rem 0
    justify-content: space-between
    margin-bottom: 1rem

  .fileGrid
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr))
    gap: 0.75rem
    overflow-y: scroll

    .fileGridItem
      justify-content: center
      align-items: center
      border-radius: 1rem
      padding: 0.5rem 0
      transition: 0.2s ease
      cursor: pointer

      .fileName
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        max-width: calc(100% - 4rem)

      .itemIcon
        width: 6rem
        height: 6rem

      &:hover, &.selected
        background: colors.$uiBackground

  .fileList
    gap: 0.25rem
    flex-grow: 1
    overflow-y: scroll

    .fileListItem
      border-radius: 0.5rem
      justify-content: space-between
      padding: 0.5rem
      border-bottom: 1px solid colors.$uiTextTertiary
      cursor: pointer
      align-items: center

      .itemIcon
        width: 1rem
        height: 1rem
        margin-right: 0.5rem

      &:hover, &.selected
        background: colors.$uiBackground
</style>
