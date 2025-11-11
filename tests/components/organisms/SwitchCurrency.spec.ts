import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CURRENCY } from '@/utils/consts'

let mockCurrency = CURRENCY.EUR
const mockToggle = vi.fn()

vi.mock('@/composables/useCurrency', () => {
  return {
    useCurrency: () => ({
      currency: mockCurrency,
      toggleCurrency: mockToggle,
    }),
  }
})

import SwitchCurrency from '@/components/organisms/SwitchCurrency.vue'

describe('SwitchCurrency.vue', () => {
  beforeEach(() => {
    mockToggle.mockClear()
    mockCurrency = CURRENCY.EUR
  })

  it('when mounted with EUR, should render eur class and euro icon', () => {
    mockCurrency = CURRENCY.EUR
    const wrapper = mount(SwitchCurrency)

    expect(wrapper.classes()).toContain('currency-switch--eur')
    expect(wrapper.find('.currency-switch__icon--eur').exists()).toBe(true)
  })

  it('when mounted with USD, should render usd class and dollar icon', () => {
    mockCurrency = CURRENCY.USD
    const wrapper = mount(SwitchCurrency)

    expect(wrapper.classes()).toContain('currency-switch--usd')
    expect(wrapper.find('.currency-switch__icon--usd').exists()).toBe(true)
  })

  it('when clicked, should call toggleCurrency', async () => {
    mockCurrency = CURRENCY.EUR
    const wrapper = mount(SwitchCurrency)

    await wrapper.trigger('click')
    expect(mockToggle).toHaveBeenCalled()
  })

  it('when mounted, should render both currency labels', () => {
    const wrapper = mount(SwitchCurrency)

    const left = wrapper.find('.currency-switch__label--left')
    const right = wrapper.find('.currency-switch__label--right')

    expect(left.exists()).toBe(true)
    expect(right.exists()).toBe(true)
    expect(left.text()).toBe(CURRENCY.EUR)
    expect(right.text()).toBe(CURRENCY.USD)
  })
})
