import { LOCALE_MAP, type Currency } from '@/utils/consts'

export function formatAmount(rawValue: string, currency: Currency): string {
  const locale = LOCALE_MAP[currency]
  const digits = rawValue.replace(/\D/g, '')

  if (!digits) return '0'

  let intPart = digits
  let decPart = ''

  if (digits.length > 2) {
    intPart = digits.slice(0, -2)
    decPart = digits.slice(-2)
  }

  const number = parseFloat(`${intPart}.${decPart || ''}`)
  const fractionDigits = decPart ? 2 : 0

  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(number)
}
