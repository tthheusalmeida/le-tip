<template>
  <section class="entry-panel">
    <SwitchCurrency data-testid="switch-currency" />

    <InputAmount v-model:amount="amount" data-testid="input-amount" />
    <InputRange
      v-model="tip"
      label="Gorjeta"
      :min="10"
      :max="20"
      :step="1"
      :formatter="formatAsPercentage"
      data-testid="tip-input-range"
    />
    <InputRange
      v-model="people"
      label="Pessoas"
      :min="2"
      :max="16"
      :step="1"
      :formatter="formatAsNumber"
      data-testid="people-input-range"
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
  padding-left: 0 1rem;
  margin-left: 0.1rem;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  transition: opacity 0.3s ease;
  overflow: hidden;
}

@media (min-width: 768px) {
  .entry-panel {
    width: 100%;
    height: 100%;
  }
}
</style>
