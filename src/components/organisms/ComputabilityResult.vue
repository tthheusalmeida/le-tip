<template>
  <div class="computability-result">
    <div class="computability-result__wrapper" :class="backgroundTheme">
      <span class="computability-result__title">{{ title }}</span>
      <div class="computability-result__result">
        <Transition name="fade" mode="out-in">
          <component
            v-if="icon"
            :is="icon"
            class="computability-result__icon"
            :class="{ 'computability-result__icon--is-brl': props.isBRL }"
        /></Transition>

        <Transition name="fade" mode="out-in">
          <template v-if="loading">
            <component
              :is="AiOutlineLoading"
              class="computability-result__icon computability-result__icon--loading"
              :key="'loading'"
            />
          </template>
          <template v-else>
            <span class="computability-result__value" :key="'value'">{{ formattedValue }}</span>
          </template>
        </Transition>
      </div>
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

const isEURCurrency = computed(() => currency.value === CURRENCY.EUR)

const icon = computed(() =>
  props.isBRL ? FaBrazilianRealSign : isEURCurrency.value ? BiEuro : BiDollar,
)
const backgroundTheme = computed(() =>
  isEURCurrency.value ? 'computability-result__wrapper--eur' : 'computability-result__wrapper--usd',
)

const formattedValue = computed(() =>
  formatAmount(props.value.toFixed(2), props.isBRL ? CURRENCY.BRL : currency.value),
)
</script>

<style scoped lang="css">
.computability-result {
  width: 100%;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.5rem;

    background: var(--bg-color-opacity);

    &--eur {
      background: var(--eur-bg-color);
    }

    &--usd {
      background: var(--usd-bg-color);
    }
  }

  &__title {
    font-size: medium;
    text-align: left;
    color: white;
    width: 100%;
  }

  &__result {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 2.5rem;
    padding: 0 0.5rem;
    color: white;
  }

  &__icon {
    flex-shrink: 0;
    min-height: 2rem;
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
