<template>
  <div class="computability-result">
    <span class="computability-result__title">{{ title }}</span>
    <div class="computability-result__result">
      <component v-if="icon" :is="icon" class="computability-result__icon" />
      <span class="computability-result__value">{{ formattedValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCurrency } from '@/composables/useCurrency'
import { CURRENCY } from '@/utils/consts'
import { BiEuro, BiDollar } from 'vue3-icons/bi'
import { formatAmount } from '@/utils/formatter'

const props = defineProps<{
  title: string
  value: number
}>()

const { currency } = useCurrency()
const icon = computed(() => (currency.value === CURRENCY.EUR ? BiEuro : BiDollar))

const formattedValue = computed(() => formatAmount(props.value.toFixed(2), currency.value))
</script>

<style scoped lang="css">
.computability-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &__title {
    font-size: x-large;
  }

  &__result {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  &__icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
  }

  &__value {
    font-size: x-large;
  }
}
</style>
