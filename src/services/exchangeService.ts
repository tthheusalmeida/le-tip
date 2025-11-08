const API_URL = 'https://economia.awesomeapi.com.br/json/last'
const API_KEY = import.meta.env.VITE_AWEASOME_API_KEY

import { type Currency } from '@/utils/consts'

export interface ExchangeResponse {
  code: string
  codein: string
  name: string
  bid: string
  ask: string
  create_date: string
}

export async function fetchExchangeRate(
  currentCurrency: Currency,
  requestedCurrency: Currency,
): Promise<number> {
  const pair = `${currentCurrency}-${requestedCurrency}`
  const url = `${API_URL}/${pair}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar cotação: ${response.statusText}`)
  }

  const data = await response.json()

  const result: ExchangeResponse = data[`${currentCurrency}BRL`]

  return parseFloat(result.bid)
}
