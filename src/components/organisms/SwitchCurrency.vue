<script setup lang="ts">
import { useCurrency } from '@/composables/useCurrency'

import { BiEuro, BiDollar } from 'vue3-icons/bi'
import { CURRENCY } from '@/utils/consts'

const { currency, toggleCurrency } = useCurrency()
</script>

<template>
  <div
    class="currency-switch"
    :class="`currency-switch--${currency.toLowerCase()}`"
    @click="toggleCurrency"
  >
    <div class="currency-switch__slider">
      <BiEuro
        v-if="currency === CURRENCY.EUR"
        class="currency-switch__icon currency-switch__icon--eur"
      />
      <BiDollar v-else class="currency-switch__icon currency-switch__icon--usd" />
    </div>

    <div class="currency-switch__label currency-switch__label--left">{{ CURRENCY.EUR }}</div>
    <div class="currency-switch__label currency-switch__label--right">{{ CURRENCY.USD }}</div>
  </div>
</template>

<style scoped>
.currency-switch {
  position: relative;
  width: 100%;
  height: 64px;
  border-radius: 32px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &--eur {
    background: linear-gradient(135deg, #003399 0%, #0055cc 100%);
  }

  &--usd {
    background: linear-gradient(135deg, #b22234 0%, #dc143c 100%);
  }
}

.currency-switch__slider {
  position: absolute;
  top: 4px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  .currency-switch--eur & {
    left: 4px;
    transform: translateX(0);
  }

  .currency-switch--usd & {
    left: calc(100% - 60px);
    transform: translateX(0);
  }
}

.currency-switch__icon {
  font-size: 32px;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;

  &--eur {
    color: var(--eur-symbol-color);
  }

  &--usd {
    color: var(--usd-symbol-color);
  }
}

.currency-switch__label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  font-weight: 600;
  color: white;
  transition: opacity 0.3s ease;
  user-select: none;

  &--left {
    left: 72px;

    .currency-switch--eur & {
      opacity: 1;
    }

    .currency-switch--usd & {
      opacity: 0.4;
    }
  }

  &--right {
    right: 72px;

    .currency-switch--eur & {
      opacity: 0.4;
    }

    .currency-switch--usd & {
      opacity: 1;
    }
  }
}

@keyframes slideIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
