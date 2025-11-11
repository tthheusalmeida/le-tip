import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mountComposable } from './helper/mountComposable'
import { useCurrency, useCurrencyProvider } from '@/composables/useCurrency'
import { CURRENCY } from '@/utils/consts'

describe('useCurrency', () => {
  it('when provider is called, should return the context', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { context } = mountComposable({
      provider: useCurrencyProvider,
      composable: useCurrency,
    })

    expect(context.currency.value).toBe(CURRENCY.EUR)
    expect(typeof context.toggleCurrency).toBe('function')
  })

  it('when provider is not called, should throw an error', () => {
    expect(() => {
      mountComposable({ composable: useCurrency })
    }).toThrow('Currency context not provided. Did you forget to call useCurrencyProvider()?')
  })

  it('when call toggleCurrency, should toggle between EUR and USD correctly', async () => {
    const { context } = mountComposable({
      provider: useCurrencyProvider,
      composable: useCurrency,
    })

    expect(context.currency.value).toBe(CURRENCY.EUR)

    context.toggleCurrency()
    await nextTick()
    expect(context.currency.value).toBe(CURRENCY.USD)

    context.toggleCurrency()
    await nextTick()
    expect(context.currency.value).toBe(CURRENCY.EUR)
  })

  it('should share state between provider and consumer', () => {
    let providerContext: ReturnType<typeof useCurrencyProvider>
    let consumerContext: ReturnType<typeof useCurrency>

    const { wrapper } = mountComposable({
      provider: () => {
        providerContext = useCurrencyProvider()
      },
      composable: () => {
        consumerContext = useCurrency()
        return consumerContext
      },
    })

    expect(providerContext!.currency.value).toBe(CURRENCY.EUR)
    expect(consumerContext!.currency.value).toBe(CURRENCY.EUR)

    providerContext!.toggleCurrency()
    expect(consumerContext!.currency.value).toBe(CURRENCY.USD)

    consumerContext!.toggleCurrency()
    expect(providerContext!.currency.value).toBe(CURRENCY.EUR)

    wrapper.unmount()
  })
})
