<script setup lang="ts">
import { ref } from 'vue'
import { useCurrencyProvider } from '@/composables/useCurrency'
import { useAppProvider } from './composables/useApp'

import HeaderComponent from './components/molecules/HeaderComponent.vue'
import ButtonFloating from './components/organisms/ButtonFloating.vue'
import EntryPanel from './components/organisms/EntryPanel.vue'
import ResultPanel from './components/organisms/ResultPanel.vue'

useCurrencyProvider()
useAppProvider()

const isSecondTab = ref<boolean>(false)
const isDesktop = ref<boolean>(false)

function toggleTab() {
  if (isDesktop.value) return
  isSecondTab.value = !isSecondTab.value
}

function handleResize() {
  isDesktop.value = window.innerWidth >= 768
}

window.addEventListener('resize', handleResize)
handleResize()
</script>

<template>
  <div class="app">
    <HeaderComponent class="app__header" />

    <main class="app__main">
      <div class="app__slides" :class="{ 'app__slides--second': isSecondTab && !isDesktop }">
        <EntryPanel />

        <ResultPanel />
      </div>
    </main>

    <ButtonFloating
      v-if="!isDesktop"
      data-testeid="floating-button"
      :rotated="isSecondTab"
      @click="toggleTab"
    />

    <vue3-snackbar bottom left :duration="1000000"></vue3-snackbar>
  </div>
</template>

<style scoped lang="css">
.app {
  padding: 0 1rem;
  overflow: hidden;

  height: 100dvh;
  background-color: var(--bg-color);
  transition: all 300s ease-in-out;
  color: var(--fg-color);

  &__header {
    margin-bottom: 1rem;
  }

  &__main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__slides {
    display: grid;
    grid-template-columns: 100% 100%;
    transition: transform 300ms ease-in-out;
    transform: translateX(0);

    &--second {
      transform: translateX(-100%);
    }
  }
}

@media (min-width: 768px) {
  .app__slides {
    width: 100%;
    min-height: 80dvh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    gap: 2rem;
    transform: none;
  }
}
</style>
