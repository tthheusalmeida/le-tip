import { inject, ref, provide } from 'vue'
import type { Ref, InjectionKey } from 'vue'

export interface AppContext {
  amount: Ref<number>
  tip: Ref<number>
  people: Ref<number>
}

export const appKey: InjectionKey<AppContext> = Symbol('app')

export function useApp() {
  const context = inject(appKey)

  if (!context) {
    throw new Error('App context not provided. Did you forget to call useAppProvider()?')
  }

  return context
}

export function useAppProvider() {
  const amount = ref<number>(0)
  const tip = ref<number>(10)
  const people = ref<number>(2)

  provide(appKey, { amount, tip, people })

  return { amount, tip, people }
}
