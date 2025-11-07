<script setup lang="ts">
import { ref } from 'vue'
import { useCurrencyProvider } from '@/composables/useCurrency'

import HeaderComponent from './components/molecules/HeaderComponent.vue'
import CurrencySwitch from './components/organisms/CurrencySwitch.vue'
import AmountInput from './components/organisms/AmountInput.vue'

useCurrencyProvider()

const amount = ref<number>(0)
</script>

<template>
  <div class="app">
    <HeaderComponent />

    <main class="app__input-panel">
      <CurrencySwitch />

      <AmountInput v-model:amount="amount" />
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
    gap: 1rem;
  }
}
</style>
