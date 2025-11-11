import { describe, it, vi, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mountComposable } from './helper/mountComposable'
import { useExchangeRate } from '@/composables/useExchangeRate'
import { useApp } from '@/composables/useApp'
import { useCurrency } from '@/composables/useCurrency'
import { fetchExchangeRate } from '@/services/exchangeService'
import { CURRENCY } from '@/utils/consts'

vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')
  return {
    ...actual,
    watchEffect: vi.fn((fn) => fn()),
  }
})
vi.mock('@/composables/useApp', () => ({
  useApp: vi.fn(),
}))
vi.mock('@/composables/useCurrency', () => ({
  useCurrency: vi.fn(),
}))
vi.mock('@/services/exchangeService', () => ({
  fetchExchangeRate: vi.fn(),
}))

describe('useExchangeRate', () => {
  const amount = { value: 0 }
  const currency = { value: CURRENCY.EUR }

  beforeEach(() => {
    vi.clearAllMocks()
    amount.value = 0
    currency.value = CURRENCY.EUR
    useApp.mockReturnValue({ amount })
    useCurrency.mockReturnValue({ currency })
  })

  it('when amount is 0, should not call fetchExchangeRate', async () => {
    const { context } = mountComposable({ composable: useExchangeRate })
    await nextTick()

    expect(fetchExchangeRate).not.toHaveBeenCalled()
    expect(context.rate.value).toBeNull()
  })

  it('when amount is provided, should load exchange rate successfully', async () => {
    amount.value = 100
    fetchExchangeRate.mockResolvedValue(5.55)

    const { context } = mountComposable({ composable: useExchangeRate })
    await nextTick()

    expect(context.loading.value).toBe(false)
    expect(context.error.value).toBeNull()
    expect(context.rate.value).toBe(5.55)
    expect(fetchExchangeRate).toHaveBeenCalledWith(CURRENCY.EUR, CURRENCY.BRL)
  })

  it('when fetchExchangeRate throws, should set an error', async () => {
    amount.value = 100
    fetchExchangeRate.mockRejectedValue(new Error('network error'))

    const { context } = mountComposable({ composable: useExchangeRate })
    await nextTick()

    expect(context.error.value).toBe('network error')
    expect(context.rate.value).toBeNull()
    expect(context.loading.value).toBe(false)
  })

  it('when currency changes, should reload the rate', async () => {
    amount.value = 100
    fetchExchangeRate.mockResolvedValueOnce(5.5).mockResolvedValueOnce(4.9)

    const { context } = mountComposable({ composable: useExchangeRate })
    expect(fetchExchangeRate).toHaveBeenCalledTimes(1)

    currency.value = CURRENCY.USD
    await context.reload()
    expect(fetchExchangeRate).toHaveBeenCalledTimes(2)
  })

  it('when manual reload is requested, should update the rate', async () => {
    amount.value = 100
    fetchExchangeRate.mockResolvedValueOnce(6.2)

    const { context } = mountComposable({ composable: useExchangeRate })

    await Promise.resolve()
    await Promise.resolve()

    expect(fetchExchangeRate).toHaveBeenCalledTimes(1)
    expect(context.rate.value).toBe(6.2)

    fetchExchangeRate.mockResolvedValueOnce(7.1)
    await context.reload()

    await Promise.resolve()
    await Promise.resolve()

    expect(fetchExchangeRate).toHaveBeenCalledTimes(2)
    expect(context.rate.value).toBe(7.1)
  })
})
