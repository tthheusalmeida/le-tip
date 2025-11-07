<script setup lang="ts">
import { ref } from 'vue'
import { useCurrencyProvider } from '@/composables/useCurrency'

import HeaderComponent from './components/molecules/HeaderComponent.vue'
import SwitchCurrency from './components/organisms/SwitchCurrency.vue'
import InputAmount from './components/organisms/InputAmount.vue'

useCurrencyProvider()

const amount = ref<number>(0)
</script>

<template>
  <div class="app">
    <HeaderComponent />

    <main class="app__input-panel">
      <SwitchCurrency />

      <InputAmount v-model:amount="amount" />
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
