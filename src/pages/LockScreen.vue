<script setup lang="ts">
import HStack from '@/components/HStack.vue'
import { Icon } from '@iconify/vue'
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const currentDate = ref('')

const updateTimeAndDate = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
  currentDate.value = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function hideLockScreen() {
  document.getElementById("lockScreen")?.classList.add("closing")
  document.getElementById("lsBg")?.classList.add("closing")
}

onMounted(() => {
  updateTimeAndDate()
  const interval = setInterval(updateTimeAndDate, 1000)
  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <div class="lowerLsBg" id="lsBg" />

  <div class="lockScreen" id="lockScreen">
    <div class="lockScreenContent">
      <h1 class="date light">{{ currentDate }}</h1>
      <h1 class="clock">{{ currentTime }}</h1>

      <img src="/icons/Avatar.png" alt="avatar" class="lsAvatar">
      <h-stack class="spaced">
        <input type="password" placeholder="Password" class="passInput">
        <button class="loginButton" @click="hideLockScreen">
          <Icon icon="fluent:lock-open-12-regular" />
        </button>
      </h-stack>
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use "@/styles/colors"

  .lockScreen, .lockScreenContent, .lowerLsBg
    top: 0
    left: 0
    right: 0
    bottom: 0

  .lowerLsBg
    position: fixed
    background: black

  .lockScreen
    position: fixed
    z-index: 9999

    background: magenta
    background-image: url("https://picsum.photos/seed/today/1920/1080")
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    animation: fadeIn 0.4s ease forwards

    @keyframes fadeIn
      0%
        opacity: 0.4
      100%
        opacity: 1

    .lockScreenContent
      position: absolute
      background: colors.$windowBlurColor
      backdrop-filter: blur(2rem)
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center

      .date
        margin-bottom: -2rem

      .clock
        font-size: 8rem
        margin-bottom: 16rem

      .lsAvatar
        width: 8rem
        height: 8rem
        border-radius: 50%

      .passInput
        background: colors.$uiBackground
        color: colors.$uiTextPrimary
        border: none
        padding: 0.5rem 0.75rem
        border-radius: 1rem

  .closing
      animation: closeLs 0.3s ease forwards

  @keyframes closeLs
    0%
      transform: none
    100%
      transform: translateY(-100vh)
</style>
