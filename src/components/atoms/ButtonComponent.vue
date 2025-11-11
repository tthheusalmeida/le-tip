<template>
  <button
    class="button-component"
    :class="[{ 'button-component--rounded-full': rounded }, themeClass]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCurrency } from '@/composables/useCurrency'
import { CURRENCY } from '@/utils/consts'

interface ButtonComponentProps {
  rounded?: boolean
}

withDefaults(defineProps<ButtonComponentProps>(), {
  rounded: false,
})

const { currency } = useCurrency()

const themeClass = computed(() => {
  const currentCurrency = currency.value?.toLowerCase()
  if (currentCurrency === CURRENCY.EUR.toLowerCase()) {
    return 'button-component--eur'
  }
  if (currentCurrency === CURRENCY.USD.toLowerCase()) {
    return 'button-component--usd'
  }
  return ''
})
</script>

<style scoped lang="css">
.button-component {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  --size: 42px;

  min-height: var(--size);
  min-width: var(--size);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &--rounded-full {
    border-radius: 100%;
  }

  &--eur {
    --bg-color: var(--eur-bg-color);
  }

  &--usd {
    --bg-color: var(--usd-bg-color);
  }

  background-color: var(--bg-color, #3498db);
}
</style>
