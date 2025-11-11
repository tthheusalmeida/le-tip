<script setup lang="ts">
import { computed, watch } from 'vue'
import { useApp } from '@/composables/useApp'
import { useExchangeRate } from '@/composables/useExchangeRate'

import ComputabilityResult from './ComputabilityResult.vue'

const { amount, tip, people } = useApp()
const { rate, loading, error } = useExchangeRate()

const roundTo = (value: number, decimals = 2) => Math.round(value * 10 ** decimals) / 10 ** decimals

const amountTip = computed(() =>
  amount.value !== 0 && tip.value / 100 !== 0 ? roundTo((amount.value * tip.value) / 100) : 0,
)
const amountTotal = computed(() => roundTo(amount.value + amountTip.value))
const amountPerPerson = computed(() => roundTo(amountTotal.value / people.value))

watch(
  () => error,
  () => {
    if (error) console.log(error) // TODO emit an error message when it occurs
  },
)

const totalInBRL = computed(() => {
  if (!rate.value) {
    return 0
  }

  return roundTo(amount.value * rate.value)
})
</script>

<template>
  <section class="result-panel">
    <ComputabilityResult title="Conta" :value="amount" />
    <ComputabilityResult title="Gorjeta" :value="amountTip" />
    <ComputabilityResult title="Total" :value="amountTotal" />
    <ComputabilityResult title="por Pessoa" :value="amountPerPerson" />
    <ComputabilityResult title="em R$" :value="totalInBRL" :loading="loading" isBRL />
  </section>
</template>

<style scoped lang="css">
.result-panel {
  padding-right: 1rem;
  margin-right: 0.1rem;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  transition: opacity 0.3s ease;
}

@media (min-width: 768px) {
  .result-panel {
    width: 100%;
    height: 100%;
  }
}
</style>
