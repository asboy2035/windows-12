<script setup lang="ts">
  import {useAppsStore} from '@/stores/apps'
  import Window from '@/ui/Window.vue'
  import TaskbarIcon from '@/apps/Taskbar/TaskbarIcon.vue'
  import HStack from '@/components/HStack.vue'
  import {Icon} from '@iconify/vue'
  import VStack from '@/components/VStack.vue'

  const appsStore = useAppsStore()

  const openApp = (appId: string) => {
    appsStore.openApp(appId)
  }

  const startMenuRef = ref<HTMLElement | null>(null)
</script>

<template>
  <Window
    ref="startMenuRef"
    disable-movable
    class="startMenu"
    visual-effect="blur"
    hide-management-buttons
    :z-index="9998"
  >
    <taskbar-icon class="spaceBetween">
      <h-stack class="spaced">
        <img src="/icons/Avatar.png" class="avatar">

        <v-stack>
          <h4>ash Ketchup</h4>
          <p class="caption light">MichaelSoft Binbows Local</p>
        </v-stack>
      </h-stack>

      <Icon icon="fluent:settings-32-filled" />
    </taskbar-icon>

    <div class="appsGrid">
      <taskbar-icon
        v-for="app in appsStore.apps"
        :key="app.id"
        class="startApp"
        @click="openApp(app.id)"
      >
        <v-stack class="centered">
          <img :src="app.icon" :alt="app.name" />
          <p>{{ app.name }}</p>
        </v-stack>
      </taskbar-icon>
    </div>

    <h-stack class="spaceBetween quickLaunchers">
      <taskbar-icon class="spaced" background>
        <Icon icon="fluent:document-16-filled" />
        <Icon icon="fluent:arrow-download-16-filled" />
        <Icon icon="fluent:apps-16-filled" />
        <Icon icon="fluent:image-16-filled" />
        <Icon icon="fluent:music-note-2-16-filled" />
      </taskbar-icon>

      <taskbar-icon>
        <Icon icon="fluent:settings-32-filled" />
      </taskbar-icon>
    </h-stack>
  </Window>
</template>



<style scoped lang="sass">
  .startMenu
    --startHeight: 45rem
    --windowRadius: 2rem

    flex-direction: column
    animation: startIn 0.3s ease
    top: calc(100vh - var(--startHeight) - 7rem) !important
    transform: translateX(-50%)
    margin-left: 50%
    height: var(--startHeight)
    width: 35rem
    justify-content: space-between
    padding: 1rem

  @keyframes startIn
    0%
      transform: translateY(100%) translateX(-50%)
    100%
      transform: translateX(-50%)

  .avatar
    height: 3rem
    width: 3rem

  .appsGrid
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr))
    overflow: scroll

    .startApp
      padding: 1rem 0.75rem

    & img
      height: 4rem !important
      width: 4rem !important

  .quickLaunchers
    svg
      width: 1.5rem
      height: 1.5rem
</style>