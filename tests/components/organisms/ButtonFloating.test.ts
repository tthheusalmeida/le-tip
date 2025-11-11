import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonFloating from '@/components/organisms/ButtonFloating.vue'

describe('ButtonFloating', () => {
  const mountComponent = () =>
    mount(ButtonFloating, {
      global: {
        stubs: {
          ButtonComponent: {
            name: 'ButtonComponent',
            emits: ['click'],
            template: `
              <button
                class="button-component floating-button"
                @click="$emit('click')"
              >
                <slot />
              </button>
            `,
          },
          BiChevronRight: {
            name: 'BiChevronRight',
            template: `<svg class="floating-button__icon" :class="$attrs.class"></svg>`,
          },
        },
      },
    })

  beforeEach(() => vi.clearAllMocks())

  it('when mounted, should render the floating button and have the icon not rotated', () => {
    const wrapper = mountComponent()

    const btn = wrapper.find('button.floating-button')
    expect(btn.exists()).toBe(true)

    const icon = wrapper.find('svg.floating-button__icon')
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).not.toContain('floating-button__icon--rotated')

    wrapper.unmount()
  })

  it('when the floating button is clicked, should toggle the rotated class on the icon', async () => {
    const wrapper = mountComponent()
    const componentStub = wrapper.findComponent({ name: 'ButtonComponent' })
    const icon = wrapper.find('svg.floating-button__icon')

    await componentStub.vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(icon.classes()).toContain('floating-button__icon--rotated')

    await componentStub.vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(icon.classes()).not.toContain('floating-button__icon--rotated')

    wrapper.unmount()
  })

  it('when the floating button is clicked, should updates the internal rotated state correctly', async () => {
    const wrapper = mountComponent()
    const comp = wrapper.findComponent({ name: 'ButtonComponent' })

    expect(wrapper.vm.rotated).toBe(false)

    await comp.vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.rotated).toBe(true)

    await comp.vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.rotated).toBe(false)

    wrapper.unmount()
  })
})
