import { ref, watch } from 'vue'

import { CURRENCY } from '@/utils/consts'
import { useApp } from './useApp'
import { useCurrency } from './useCurrency'

export interface ExchangeResponse {
  code: string
  codein: string
  name: string
  bid: string
  ask: string
  create_date: string
}

const API_URL = 'https://economia.awesomeapi.com.br/json/last'
const API_KEY = import.meta.env.VITE_AWEASOME_API_KEY

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

  async function fetchExchangeRate(currentCurrency: string, requestedCurrency: string) {
    const pair = `${currentCurrency}-${requestedCurrency}`
    const url = `${API_URL}/${pair}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })

    if (!res.ok) throw new Error('Erro ao buscar cotação')

    const data = await res.json()
    const result: ExchangeResponse = data[`${currentCurrency}BRL`]

    return parseFloat(result.bid)
  }

  watch(
    [currency, amount],
    () => {
      loadRate()
    },
    { immediate: true },
  )

  return { rate, loading, error, reload: loadRate }
}
