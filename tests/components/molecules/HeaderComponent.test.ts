import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderComponent from '@/components/molecules/HeaderComponent.vue'

describe('HeaderComponent', () => {
  it('when mounted, should render header with title and theme', () => {
    const wrapper = mount(HeaderComponent)

    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
    expect(header.classes()).toContain('header')

    const title = wrapper.find('.header__title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Le/Tip')

    const theme = wrapper.find('.header__theme')
    expect(theme.exists()).toBe(true)
    expect(theme.text()).toBe('')

    wrapper.unmount()
  })
})
