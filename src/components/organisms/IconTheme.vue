<script setup lang="ts">
import { computed } from 'vue'
import { CURRENCY, type Currency } from '@/utils/consts'
import { BiEuro, BiDollar } from 'vue3-icons/bi'
import { FaBrazilianRealSign } from 'vue3-icons/fa6'

interface IconThemeProps {
  currentCurrency: Currency
}

const props = defineProps<IconThemeProps>()

const CLASS: Record<Currency, string> = {
  BRL: 'icon-theme--brl',
  EUR: 'icon-theme--eur',
  USD: 'icon-theme--usd',
}

const isBRL = computed(() => props.currentCurrency === CURRENCY.BRL)
const isEUR = computed(() => props.currentCurrency === CURRENCY.EUR)

const iconTheme = computed(() => CLASS[props.currentCurrency] as Currency)
const iconRender = computed(() =>
  isBRL.value ? FaBrazilianRealSign : isEUR.value ? BiEuro : BiDollar,
)
</script>

<template>
  <Transition name="fade" mode="out-in">
    <component :is="iconRender" class="icon-theme" :class="iconTheme"
  /></Transition>
</template>

<style scoped lang="css">
.icon-theme {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-height: 2rem;
  min-width: 2rem;
  width: 2rem;
  height: 2rem;
  background: white;
  border-radius: 4rem;
  padding: 0.5rem;

  color: white;

  &--eur {
    color: var(--eur-symbol-color);
  }

  &--usd {
    color: var(--usd-symbol-color);
  }

  &--brl {
    background: #feca29;
    border-radius: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.5rem 0.75rem;
    color: #31277f;
  }
}
</style>
