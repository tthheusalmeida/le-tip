import { describe, it, expect } from 'vitest'
import { formatAmount } from '../../src/utils/formatter'

describe('formatAmount', () => {
  it('when an amount is passed and EUR is used as the currency, should format the amount for EUR', () => {
    expect(formatAmount('0', 'EUR')).toBe('0')
    expect(formatAmount('10', 'EUR')).toBe('10')
    expect(formatAmount('100', 'EUR')).toBe('1,00')
    expect(formatAmount('1000', 'EUR')).toBe('10,00')
  })

  it('when an amount is passed and USD is used as the currency, should format the amount for USD', () => {
    expect(formatAmount('0', 'USD')).toBe('0')
    expect(formatAmount('10', 'USD')).toBe('10')
    expect(formatAmount('100', 'USD')).toBe('1.00')
    expect(formatAmount('1000', 'USD')).toBe('10.00')
  })

  it('when an amount is passed and BRL is used as the currency, should format the amount for BRL', () => {
    expect(formatAmount('0', 'BRL')).toBe('0')
    expect(formatAmount('10', 'BRL')).toBe('10')
    expect(formatAmount('100', 'BRL')).toBe('1,00')
    expect(formatAmount('1000', 'BRL')).toBe('10,00')
  })

  it('when an amount is passed, should handle commas correctly', () => {
    expect(formatAmount('123456789', 'USD')).toBe('1,234,567.89')
    expect(formatAmount('123456789', 'BRL')).toBe('1.234.567,89')
    expect(formatAmount('123456789', 'EUR')).toBe('1.234.567,89')
  })

  it('when an amount that starts with zero is passed, should format it correctly', () => {
    expect(formatAmount('01', 'USD')).toBe('1')
    expect(formatAmount('001', 'USD')).toBe('0.01')
    expect(formatAmount('0001', 'USD')).toBe('0.01')
    expect(formatAmount('00001', 'USD')).toBe('0.01')
  })
})
