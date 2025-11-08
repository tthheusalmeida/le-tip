import { ref, watchEffect } from 'vue'
import { fetchExchangeRate } from '@/services/exchangeService'
import { CURRENCY } from '@/utils/consts'
import { useApp } from './useApp'
import { useCurrency } from './useCurrency'

export function useExchangeRate() {
  const { amount } = useApp()
  const { currency } = useCurrency()

  const rate = ref<number | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadRate() {
    if (!amount.value) return

    try {
      loading.value = true
      error.value = null
      const value = await fetchExchangeRate(currency.value, CURRENCY.BRL)
      rate.value = value
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    loadRate()
  })

  return { rate, loading, error, reload: loadRate }
}
