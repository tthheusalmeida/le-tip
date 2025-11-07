<script setup lang="ts">
import { ref } from 'vue'
import { useCurrencyProvider } from '@/composables/useCurrency'

import HeaderComponent from './components/molecules/HeaderComponent.vue'
import SwitchCurrency from './components/organisms/SwitchCurrency.vue'
import InputAmount from './components/organisms/InputAmount.vue'
import InputRange, { type FormatterFn } from './components/organisms/InputRange.vue'
import ButtonFloating from './components/organisms/ButtonFloating.vue'

useCurrencyProvider()

const amount = ref<number>(0)
const tip = ref<number>(10)
const people = ref<number>(2)

const formatAsPercentage: FormatterFn = (value: number) => {
  return `${value}%`
}

const formatAsNumber: FormatterFn = (value: number) => {
  return String(Math.floor(value))
}
</script>

<template>
  <div class="app">
    <HeaderComponent />

    <main class="app__input-panel">
      <SwitchCurrency />

      <InputAmount v-model:amount="amount" />
      <InputRange
        v-model="tip"
        label="Gorjeta"
        :min="5"
        :max="20"
        :step="1"
        :formatter="formatAsPercentage"
      />
      <InputRange
        v-model="people"
        label="Pessoas"
        :min="2"
        :max="30"
        :step="1"
        :formatter="formatAsNumber"
      />
    </main>

    <ButtonFloating />
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
