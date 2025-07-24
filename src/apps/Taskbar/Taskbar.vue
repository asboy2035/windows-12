<script setup lang="ts">
  import {ref, onMounted, onBeforeUnmount} from 'vue'
  import {useAppsStore} from '@/stores/apps'
  import Window from '@/ui/Window.vue'
  import HStack from '@/components/HStack.vue'
  import TaskbarIcon from '@/apps/Taskbar/TaskbarIcon.vue'
  import VStack from '@/components/VStack.vue'
  import {Icon} from '@iconify/vue'
  import StartMenu from '@/apps/Start/StartMenu.vue'

  const appsStore = useAppsStore()
  const time = ref('')
  const date = ref('')
  const showingStart = ref(false)
  const startMenuRef = ref<HTMLElement | null>(null)

  const updateTimeAndDate = () => {
    const now = new Date()
    time.value = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    date.value = now.toLocaleDateString([], {weekday: 'short', day: 'numeric', month: 'short'})
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (showingStart.value && startMenuRef.value && !startMenuRef.value.contains(event.target as Node)) {
      showingStart.value = false
    }
  }

  onMounted(() => {
    updateTimeAndDate()
    setInterval(updateTimeAndDate, 1000)
    document.addEventListener('mousedown', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })

  function toggleStart() {
    showingStart.value = !showingStart.value
  }

  function focusApp(windowId: string) {
    appsStore.focusApp(windowId)
  }
</script>

<template>
  <Window
    disable-movable
    id="taskbar"
    visual-effect="blur"
    hide-management-buttons
    :z-index="9999"
  >
    <taskbar-icon>
      <img src="/icons/Cloud.png" alt="Weather Icon">
      <v-stack>
        <p class="caption">Cloudy</p>
        <p class="caption light">26°</p>
      </v-stack>
    </taskbar-icon>

    <h-stack>
      <taskbar-icon @click="toggleStart">
        <img src="/icons/Start.png">
      </taskbar-icon>

      <taskbar-icon
        v-for="app in appsStore.openApps"
        :key="app.id"
        :running="!app.isMinimized"
        @click="focusApp(app.id)"
      >
        <img :src="app.app.icon" :alt="app.app.name">
      </taskbar-icon>
    </h-stack>

    <h-stack>
      <taskbar-icon>
        <h-stack class="spaced">
          <v-stack>
            <p class="caption">{{ time }}</p>
            <p class="caption light">{{ date }}</p>
          </v-stack>

          <Icon icon="fluent:alert-snooze-20-filled" />
        </h-stack>
      </taskbar-icon>
    </h-stack>
  </Window>

  <start-menu ref="startMenuRef" :class="{ hidden: !showingStart }" />
</template>



<style scoped lang="sass">
  #taskbar
    --windowRadius: 1.25rem
    --taskbarHeight: 2.5rem

    position: fixed
    top: calc(100vh - var(--taskbarHeight) - 2rem) !important
    min-height: var(--taskbarHeight) !important
    height: var(--taskbarHeight)
    left: 0 !important
    width: calc(100vw - 3rem)
    transform: translateX(-50%)
    margin-left: 50%
    max-width: 80rem
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    padding: 0.5rem 0.45rem
    z-index: 4
    animation: none !important
</style>
