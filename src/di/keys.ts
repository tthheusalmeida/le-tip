import type { InjectionKey, Ref } from 'vue'
import type { Currency } from '@/utils/consts'

export interface CurrencyContext {
  currency: Ref<Currency>
  toggleCurrency: () => void
}

export interface AppContext {
  amount: Ref<number>
  tip: Ref<number>
  people: Ref<number>
}

export const currencyKey: InjectionKey<CurrencyContext> = Symbol('currency')
export const appKey: InjectionKey<AppContext> = Symbol('app')
