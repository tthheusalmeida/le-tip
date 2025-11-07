<script setup lang="ts">
import { useCurrencyProvider } from '@/composables/useCurrency'

import HeaderComponent from './components/molecules/HeaderComponent.vue'
import CurrencySwitch from './components/organisms/CurrencySwitch.vue'

useCurrencyProvider()
</script>

<template>
  <div class="app">
    <HeaderComponent />

    <main class="app__input-panel">
      <CurrencySwitch />
    </main>
  </div>
</template>

<style scoped lang="css">
.app {
  padding: 1rem;

  &__input-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
}
</style>
