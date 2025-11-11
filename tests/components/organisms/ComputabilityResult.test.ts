import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ComputabilityResult from '@/components/organisms/ComputabilityResult.vue'
import { useCurrency } from '@/composables/useCurrency'

vi.mock('@/composables/useCurrency', () => ({
  useCurrency: vi.fn(),
}))

vi.mock('@/utils/formatter', () => ({
  formatAmount: vi.fn((val: string, cur: string) => `${val}-${cur}`),
}))

describe('ComputabilityResult', () => {
  const mockCurrency = ref('USD')

  beforeEach(() => {
    vi.clearAllMocks()
    mockCurrency.value = 'USD'
    ;(useCurrency as ReturnType<typeof vi.fn>).mockReturnValue({
      currency: mockCurrency,
    })
  })

  it('when currency is USD, should render dollar icon and formatted value', () => {
    const wrapper = mount(ComputabilityResult, {
      props: {
        title: 'Total',
        value: 123.45,
        loading: false,
        isBRL: false,
      },
      global: {
        stubs: {
          BiDollar: {
            template: '<svg data-icon="dollar" class="computability-result__icon"></svg>',
          },
          BiEuro: {
            template: '<svg data-icon="euro" class="computability-result__icon"></svg>',
          },
          FaBrazilianRealSign: {
            template: '<svg data-icon="brl" class="computability-result__icon"></svg>',
          },
          AiOutlineLoading: {
            template:
              '<svg data-icon="loading" class="computability-result__icon computability-result__icon--loading"></svg>',
          },
        },
      },
    })

    const title = wrapper.find('.computability-result__title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Total')

    const dollarIcon = wrapper.find('svg[data-icon="dollar"]')
    expect(dollarIcon.exists()).toBe(true)

    const valueEl = wrapper.find('.computability-result__value')
    expect(valueEl.exists()).toBe(true)
    expect(valueEl.text()).toBe('123.45-USD')

    wrapper.unmount()
  })

  it('when currency is EUR, should render euro icon and formatted value', () => {
    mockCurrency.value = 'EUR'
    const wrapper = mount(ComputabilityResult, {
      props: {
        title: 'Total EUR',
        value: 77.33,
        loading: false,
        isBRL: false,
      },
      global: {
        stubs: {
          BiDollar: {
            template: '<svg data-icon="dollar" class="computability-result__icon"></svg>',
          },
          BiEuro: {
            template: '<svg data-icon="euro" class="computability-result__icon"></svg>',
          },
          FaBrazilianRealSign: {
            template:
              '<svg data-icon="brl" class="computability-result__icon computability-result__icon--is-brl"></svg>',
          },
          AiOutlineLoading: {
            template:
              '<svg data-icon="loading" class="computability-result__icon computability-result__icon--loading"></svg>',
          },
        },
      },
    })

    const euroIcon = wrapper.find('svg[data-icon="euro"]')
    expect(euroIcon.exists()).toBe(true)

    const valueEl = wrapper.find('.computability-result__value')
    expect(valueEl.exists()).toBe(true)
    expect(valueEl.text()).toBe('77.33-EUR')

    wrapper.unmount()
  })

  it('when isBRL is true, should render BRL icon and apply BRL icon class', () => {
    const wrapper = mount(ComputabilityResult, {
      props: {
        title: 'Em R$',
        value: 10,
        loading: false,
        isBRL: true,
      },
      global: {
        stubs: {
          BiDollar: {
            template: '<svg data-icon="dollar" class="computability-result__icon"></svg>',
          },
          BiEuro: {
            template: '<svg data-icon="euro" class="computability-result__icon"></svg>',
          },
          FaBrazilianRealSign: {
            template:
              '<svg data-icon="brl" class="computability-result__icon computability-result__icon--is-brl"></svg>',
          },
          AiOutlineLoading: {
            template:
              '<svg data-icon="loading" class="computability-result__icon computability-result__icon--loading"></svg>',
          },
        },
      },
    })

    const brlIcon = wrapper.find('svg[data-icon="brl"]')
    expect(brlIcon.exists()).toBe(true)
    expect(brlIcon.classes()).toContain('computability-result__icon--is-brl')

    const valueEl = wrapper.find('.computability-result__value')
    expect(valueEl.exists()).toBe(true)
    expect(valueEl.text()).toBe('10.00-BRL')

    wrapper.unmount()
  })

  it('when loading is true, should render loading icon and not render formatted value', () => {
    const wrapper = mount(ComputabilityResult, {
      props: {
        title: 'Carregando',
        value: 5,
        loading: true,
        isBRL: false,
      },
      global: {
        stubs: {
          BiDollar: {
            template: '<svg data-icon="dollar" class="computability-result__icon"></svg>',
          },
          BiEuro: {
            template: '<svg data-icon="euro" class="computability-result__icon"></svg>',
          },
          FaBrazilianRealSign: {
            template:
              '<svg data-icon="brl" class="computability-result__icon computability-result__icon--is-brl"></svg>',
          },
          AiOutlineLoading: {
            template:
              '<svg data-icon="loading" class="computability-result__icon computability-result__icon--loading"></svg>',
          },
        },
      },
    })

    const loadingIcon = wrapper.find('svg[data-icon="loading"]')
    expect(loadingIcon.exists()).toBe(true)
    expect(loadingIcon.classes()).toContain('computability-result__icon--loading')

    const valueEl = wrapper.find('.computability-result__value')
    expect(valueEl.exists()).toBe(false)

    wrapper.unmount()
  })
})
