import type { InjectionKey, Ref } from 'vue'
import type { Currency } from '@/utils/consts'

export interface CurrencyContext {
  currency: Ref<Currency>
  toggleCurrency: () => void
}

export const currencyKey: InjectionKey<CurrencyContext> = Symbol('currency')
