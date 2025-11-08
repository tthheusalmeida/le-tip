<template>
  <section class="result-panel">
    <ComputabilityResult title="Conta" :value="amount" />
    <ComputabilityResult title="Gorjeta" :value="amountTip" />
    <ComputabilityResult title="Total" :value="amountTotal" />
    <ComputabilityResult title="por Pessoa" :value="amountPerPerson" />
  </section>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp'
import ComputabilityResult from '../molecules/ComputabilityResult.vue'
import { computed } from 'vue'

const { amount, tip, people } = useApp()

const roundTo = (value: number, decimals = 2) => Math.round(value * 10 ** decimals) / 10 ** decimals

const amountTip = computed(() =>
  amount.value !== 0 && tip.value / 100 !== 0 ? roundTo((amount.value * tip.value) / 100) : 0,
)
const amountTotal = computed(() => roundTo(amount.value + amountTip.value))
const amountPerPerson = computed(() => roundTo(amountTotal.value / people.value))
</script>

<style scoped lang="css">
.result-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
