import { inject, ref, provide } from 'vue'
import { currencyKey } from '@/di/keys'
import { CURRENCY, type Currency } from '@/utils/consts'

export function useCurrency() {
  const context = inject(currencyKey)

  if (!context) {
    throw new Error('Currency context not provided. Did you forget to call useCurrencyProvider()?')
  }

  return context
}

export function useCurrencyProvider() {
  const currency = ref<Currency>(CURRENCY.EUR)

  function toggleCurrency() {
    currency.value = currency.value === CURRENCY.EUR ? CURRENCY.USD : CURRENCY.EUR
  }

  provide(currencyKey, { currency, toggleCurrency })

  return { currency, toggleCurrency }
}
