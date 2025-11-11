import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import InputRange from '@/components/organisms/InputRange.vue'
import { CURRENCY } from '@/utils/consts'

const mockCurrencyRef = ref(CURRENCY.EUR)

vi.mock('@/composables/useCurrency', () => {
  return {
    useCurrency: () => ({ currency: mockCurrencyRef }),
  }
})

describe('InputRange.vue', () => {
  beforeEach(() => {
    mockCurrencyRef.value = CURRENCY.EUR
  })

  it('when mounted with default props, should display formatted value', () => {
    const wrapper = mount(InputRange, {
      props: { label: 'Test', modelValue: 25 },
    })

    expect(wrapper.find('.range-slider__current-value').text()).toBe('25')
  })

  it('when currency is EUR, should have eur class', () => {
    mockCurrencyRef.value = CURRENCY.EUR
    const wrapper = mount(InputRange, {
      props: { label: 'My Label', modelValue: 10 },
    })

    expect(wrapper.classes()).toContain('range-slider--eur')
  })

  it('when currency is USD, should have usd class', () => {
    mockCurrencyRef.value = CURRENCY.USD
    const wrapper = mount(InputRange, {
      props: { label: 'My Label', modelValue: 10 },
    })

    expect(wrapper.classes()).toContain('range-slider--usd')
  })

  it('when input changes, should emit update:modelValue with numeric value', async () => {
    const wrapper = mount(InputRange, {
      props: { label: 'slider', modelValue: 20, min: 0, max: 100 },
    })

    const input = wrapper.find('input')
    await input.setValue('30')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBe(30)
  })

  it('when custom formatter provided, should display formatted value', () => {
    const wrapper = mount(InputRange, {
      props: { label: 'fmt', modelValue: 40, formatter: (v: number) => `${v}%` },
    })

    expect(wrapper.find('.range-slider__current-value').text()).toBe('40%')
  })

  it('when label provided, should set id based on label', () => {
    const wrapper = mount(InputRange, {
      props: { label: 'My Label', modelValue: 5 },
    })

    const input = wrapper.find('input')
    expect(input.attributes('id')).toBe('range-slider-my-label')
  })
})
