import { describe, it, vi, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import InputAmount from '@/components/organisms/InputAmount.vue'
import { CURRENCY } from '@/utils/consts'

const mockCurrencyRef = ref(CURRENCY.EUR)

vi.mock('@/composables/useCurrency', () => {
  return {
    useCurrency: () => ({ currency: mockCurrencyRef }),
  }
})

vi.mock('@/utils/formatter', () => {
  return {
    formatAmount: (raw: string, currency: string) => {
      const cents = Number(raw || '0')
      const value = (cents / 100).toFixed(2)
      return currency === CURRENCY.EUR ? `€${value}` : `$${value}`
    },
  }
})

describe('InputAmount.vue', () => {
  beforeEach(() => {
    mockCurrencyRef.value = CURRENCY.EUR
  })

  it('when mounted with default amount, should display formatted zero', () => {
    const wrapper = mount(InputAmount, {
      props: { amount: 0 },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('€0.00')
  })

  it('when currency is USD, should render dollar icon', () => {
    mockCurrencyRef.value = CURRENCY.USD
    const wrapper = mount(InputAmount, {
      props: { amount: 0 },
    })

    expect(wrapper.find('.input-money__icon').exists()).toBe(true)
  })

  it('when typing digits, should emit update:amount with correct value', async () => {
    const wrapper = mount(InputAmount, {
      props: { amount: 0 },
    })

    const input = wrapper.find('input')
    await input.setValue('123')

    const emitted = wrapper.emitted('update:amount')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBeCloseTo(1.23, 2)
  })

  it('when pressing non-digit key, should prevent default', () => {
    const wrapper = mount(InputAmount, {
      props: { amount: 0 },
    })
    const inputEl = wrapper.find('input').element

    const evt = new KeyboardEvent('keydown', { key: 'a', cancelable: true })

    const prevented = !inputEl.dispatchEvent(evt) || evt.defaultPrevented
    expect(prevented).toBe(true)
  })

  it('when exceeding max digits, should prevent more digits', async () => {
    const wrapper = mount(InputAmount, {
      props: { amount: 0 },
    })
    const inputEl = wrapper.find('input').element

    await wrapper.find('input').setValue('1'.repeat(11))

    const evt = new KeyboardEvent('keydown', { key: '2', cancelable: true })
    const prevented = !inputEl.dispatchEvent(evt) || evt.defaultPrevented
    expect(prevented).toBe(true)
  })
})
