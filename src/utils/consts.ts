export const CURRENCY: Record<string, string> = {
  USD: 'USD',
  EUR: 'EUR',
}

export type Currency = (typeof CURRENCY)[keyof typeof CURRENCY]
