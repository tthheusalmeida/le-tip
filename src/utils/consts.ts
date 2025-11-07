export const CURRENCY = {
  BRL: 'BRL',
  USD: 'USD',
  EUR: 'EUR',
} as const

export type Currency = (typeof CURRENCY)[keyof typeof CURRENCY]

export const LOCALE_MAP: Record<Currency, string> = {
  [CURRENCY.BRL]: 'pt-BR',
  [CURRENCY.USD]: 'en-US',
  [CURRENCY.EUR]: 'de-DE',
}
