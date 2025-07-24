<script setup lang="ts">
  import { defineProps } from 'vue'
  import { type OpenApp } from '@/stores/apps'
  import Window from '@/ui/Window.vue'
  import Sidebar from '@/components/Sidebar/Sidebar.vue'
  import SidebarItem from '@/components/Sidebar/SidebarItem.vue'
  import VStack from '@/components/VStack.vue'

  defineProps<{ window: OpenApp }>()
</script>

<template>
  <Window :window="window" visual-effect="blur" id="settingsApp" resizable title="Settings">
    <sidebar>
      <sidebar-item
        title="Accounts"
        icon="fluent:person-shield-16-filled"
      />
      <sidebar-item
        selected
        title="Personalization"
        icon="fluent:paint-brush-16-filled"
      />
      <sidebar-item
        title="System"
        icon="fluent:desktop-16-filled"
      />
      <sidebar-item
        title="Bluetooth & devices"
        icon="fluent:keyboard-mouse-16-filled"
      />
      <sidebar-item
        title="Network & internet"
        icon="fluent:globe-16-filled"
      />
      <sidebar-item
        title="Privacy & security"
        icon="fluent:lock-closed-16-filled"
      />
      <sidebar-item
        title="Language & Region"
        icon="fluent:local-language-16-filled"
      />
      <sidebar-item
        title="Gaming"
        icon="fluent:games-16-filled"
      />
      <sidebar-item
        title="Accessibility"
        icon="fluent:accessibility-16-filled"
      />
      <sidebar-item
        title="Development"
        icon="fluent:window-dev-tools-16-filled"
      />
      <sidebar-item
        title="Apps"
        icon="fluent:apps-add-in-16-filled"
      />
      <sidebar-item
        title="Windows Update"
        icon="fluent:arrow-sync-16-filled"
      />
    </sidebar>

    <v-stack>
      <h2>Personalization</h2>
    </v-stack>
  </Window>
</template>


<style scoped lang="sass">
  #settingsApp
    min-width: 70rem
    min-height: 45rem
</style>