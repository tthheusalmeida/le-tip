<template>
  <section class="result-panel">
    <ComputabilityResult title="Conta" :value="amount" />
    <ComputabilityResult title="Gorjeta" :value="tipAmount" />
    <ComputabilityResult title="Total" :value="amount + tipAmount" />
    <ComputabilityResult title="por Pessoa" :value="perPerson" />
  </section>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp'
import ComputabilityResult from '../molecules/ComputabilityResult.vue'
import { computed } from 'vue'

const { amount, tip, people } = useApp()

console.log(amount.value * (tip.value / 100))

const tipAmount = computed(() =>
  amount.value !== 0 && tip.value / 100 !== 0 ? Math.ceil(amount.value * tip.value) / 100 : 0,
)
const perPerson = computed(() => (amount.value + tipAmount.value) / people.value)
</script>

<style scoped lang="css">
.result-panel {
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
  .result-panel {
    width: 100%;
  }
}
</style>
