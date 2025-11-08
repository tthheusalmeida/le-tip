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
    <HeaderComponent />

    <main class="app__main">
      <div class="app__slides" :class="{ 'app__slides--second': isSecondTab && !isDesktop }">
        <EntryPanel />

        <ResultPanel />
      </div>
    </main>

    <ButtonFloating v-if="!isDesktop" :rotated="isSecondTab" @click="toggleTab" />
  </div>
</template>

<style scoped lang="css">
.app {
  padding: 1rem;
  overflow: hidden;

  &__main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__slides {
    display: flex;
    justify-content: space-between;
    width: 200%;
    transition: transform 0.4s ease-in-out;
    transform: translateX(0);

    &--second {
      transform: translateX(-50%);
    }
  }
}

@media (min-width: 768px) {
  .app__slides {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    transform: none;
  }

  .entry-panel,
  .result-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
