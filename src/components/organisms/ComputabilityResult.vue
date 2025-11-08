<template>
  <div class="computability-result">
    <span class="computability-result__title">{{ title }}</span>
    <div class="computability-result__result">
      <component
        v-if="icon"
        :is="icon"
        class="computability-result__icon"
        :class="{ 'computability-result__icon--is-brl': props.isBRL }"
      />

      <template v-if="loading">
        <component
          :is="AiOutlineLoading"
          class="computability-result__icon computability-result__icon--loading"
        />
      </template>
      <template v-else>
        <span class="computability-result__value">{{ formattedValue }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCurrency } from '@/composables/useCurrency'
import { CURRENCY } from '@/utils/consts'
import { BiEuro, BiDollar } from 'vue3-icons/bi'
import { AiOutlineLoading } from 'vue3-icons/ai'
import { FaBrazilianRealSign } from 'vue3-icons/fa6'
import { formatAmount } from '@/utils/formatter'

interface ComputabilityResultProps {
  title?: string
  value?: number
  loading?: boolean
  isBRL?: boolean
}

const props = withDefaults(defineProps<ComputabilityResultProps>(), {
  title: '',
  value: 0,
  loading: false,
  isBRL: false,
})

const { currency } = useCurrency()
const icon = computed(() =>
  props.isBRL ? FaBrazilianRealSign : currency.value === CURRENCY.EUR ? BiEuro : BiDollar,
)

const formattedValue = computed(() =>
  formatAmount(props.value.toFixed(2), props.isBRL ? CURRENCY.BRL : currency.value),
)
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
    min-height: 2rem;
  }

  &__icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;

    &--loading {
      width: 1.5rem;
      height: 1.5rem;
      animation: spin 1s linear infinite;
    }

    &--is-brl {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &__value {
    font-size: x-large;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
