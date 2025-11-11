import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ButtonComponent from '@/components/atoms/ButtonComponent.vue'
import { useCurrency } from '@/composables/useCurrency'

vi.mock('@/composables/useCurrency', () => ({
  useCurrency: vi.fn(),
}))

describe('ButtonComponent', () => {
  const mockCurrency = ref('')

  beforeEach(() => {
    vi.clearAllMocks()
    mockCurrency.value = ''
    ;(useCurrency as ReturnType<typeof vi.fn>).mockReturnValue({
      currency: mockCurrency,
    })
  })

  it('when mounted with default props, should have default button class', () => {
    const wrapper = mount(ButtonComponent)
    expect(wrapper.classes()).toContain('button-component')
    expect(wrapper.classes()).not.toContain('button-component--eur')
    expect(wrapper.classes()).not.toContain('button-component--usd')
  })

  it('when currency is EUR, should apply EUR theme class', () => {
    mockCurrency.value = 'EUR'
    const wrapper = mount(ButtonComponent)
    expect(wrapper.classes()).toContain('button-component--eur')
  })

  it('when currency is USD, should apply USD theme class', () => {
    mockCurrency.value = 'USD'
    const wrapper = mount(ButtonComponent)
    expect(wrapper.classes()).toContain('button-component--usd')
  })

  it('when currency is unsupported, should not apply theme classes', () => {
    mockCurrency.value = ''
    const wrapper = mount(ButtonComponent)
    expect(wrapper.classes()).not.toContain('button-component--eur')
    expect(wrapper.classes()).not.toContain('button-component--usd')
  })

  it('when rounded prop is true, should apply rounded-full class', () => {
    const wrapper = mount(ButtonComponent, { props: { rounded: true } })
    expect(wrapper.classes()).toContain('button-component--rounded-full')
  })

  it('when no rounded prop is provided, should not apply rounded-full class by default', () => {
    const wrapper = mount(ButtonComponent)
    expect(wrapper.classes()).not.toContain('button-component--rounded-full')
  })

  it('when currency changes, should reactively update theme class', async () => {
    const wrapper = mount(ButtonComponent)

    expect(wrapper.classes()).not.toContain('button-component--eur')
    expect(wrapper.classes()).not.toContain('button-component--usd')

    mockCurrency.value = 'EUR'
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('button-component--eur')

    mockCurrency.value = 'USD'
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('button-component--usd')

    mockCurrency.value = ''
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).not.toContain('button-component--eur')
    expect(wrapper.classes()).not.toContain('button-component--usd')
  })

  it('when slot content is provided, should render the slot content correctly', () => {
    const wrapper = mount(ButtonComponent, {
      slots: {
        default: '<span>Buy Now</span>',
      },
    })
    expect(wrapper.text()).toContain('Buy Now')
  })
})
