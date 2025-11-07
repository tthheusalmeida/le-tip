<template>
  <section class="entry-panel">
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
  </section>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp'

import SwitchCurrency from './SwitchCurrency.vue'
import InputAmount from './InputAmount.vue'
import InputRange from './InputRange.vue'

const formatAsPercentage = (value: number) => `${value}%`
const formatAsNumber = (value: number) => String(Math.floor(value))

const { amount, tip, people } = useApp()
</script>

<style scoped lang="css">
.entry-panel {
  width: 50%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: opacity 0.3s ease;
}

@media (min-width: 768px) {
  .entry-panel {
    width: 100%;
  }
}
</style>
