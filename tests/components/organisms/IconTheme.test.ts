import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IconTheme from '@/components/organisms/IconTheme.vue'

vi.mock('vue3-icons/bi', () => ({
  BiEuro: { template: '<span data-testid="icon-eur">€</span>' },
  BiDollar: { template: '<span data-testid="icon-usd">$</span>' },
}))
vi.mock('vue3-icons/fa6', () => ({
  FaBrazilianRealSign: { template: '<span data-testid="icon-brl">R$</span>' },
}))
vi.mock('@/utils/consts', () => ({
  CURRENCY: { BRL: 'BRL', EUR: 'EUR', USD: 'USD' },
}))

describe('IconTheme.vue', () => {
  it('deve renderizar o ícone do Real e a classe BRL', () => {
    const wrapper = mount(IconTheme, {
      props: { currentCurrency: 'BRL' },
    })
    const icon = wrapper.find('.icon-theme')

    expect(icon.classes()).toContain('icon-theme--brl')
    expect(wrapper.find('[data-testid="icon-brl"]').exists()).toBe(true)
  })

  it('deve renderizar o ícone do Euro e a classe EUR', () => {
    const wrapper = mount(IconTheme, {
      props: { currentCurrency: 'EUR' },
    })
    const icon = wrapper.find('.icon-theme')

    expect(icon.classes()).toContain('icon-theme--eur')
    expect(wrapper.find('[data-testid="icon-eur"]').exists()).toBe(true)
  })

  it('deve renderizar o ícone do Dólar e a classe USD', () => {
    const wrapper = mount(IconTheme, {
      props: { currentCurrency: 'USD' },
    })
    const icon = wrapper.find('.icon-theme')

    expect(icon.classes()).toContain('icon-theme--usd')
    expect(wrapper.find('[data-testid="icon-usd"]').exists()).toBe(true)
  })
})
