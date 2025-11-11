import { describe, it, vi, expect } from 'vitest'
import { nextTick } from 'vue'
import { mountComposable } from './helper/mountComposable'
import { useApp, useAppProvider } from '@/composables/useApp'

describe('useApp', () => {
  it('when provider is called, should return the context', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { context } = mountComposable({
      provider: useAppProvider,
      composable: useApp,
    })

    expect(context.amount.value).toBe(0)
    expect(context.tip.value).toBe(10)
    expect(context.people.value).toBe(2)
  })

  it('when provider is not called, should throw an error', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(() => {
      mountComposable({ composable: useApp })
    }).toThrow('App context not provided')

    warnSpy.mockRestore()
  })

  it('when values change, should keep reactivity', async () => {
    const { context } = mountComposable({
      provider: useAppProvider,
      composable: useApp,
    })

    expect(context.amount.value).toBe(0)
    expect(context.tip.value).toBe(10)
    expect(context.people.value).toBe(2)

    context.amount.value = 100
    context.tip.value = 15
    context.people.value = 4

    await nextTick()

    expect(context.amount.value).toBe(100)
    expect(context.tip.value).toBe(15)
    expect(context.people.value).toBe(4)
  })

  it('when provider and consumer used, should share the same state', () => {
    let providerContext: ReturnType<typeof useAppProvider>
    let consumerContext: ReturnType<typeof useApp>

    const { wrapper } = mountComposable({
      provider: () => {
        providerContext = useAppProvider()
      },
      composable: () => {
        consumerContext = useApp()
        return consumerContext
      },
    })

    providerContext!.amount.value = 200
    providerContext!.people.value = 5

    expect(consumerContext!.amount.value).toBe(200)
    expect(consumerContext!.people.value).toBe(5)

    wrapper.unmount()
  })
})
