// tests/helpers/mountComposable.ts
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'

interface MountComposableOptions<T> {
  composable: () => T
  provider?: () => void
}

export function mountComposable<T>({ composable, provider }: MountComposableOptions<T>) {
  let context: T

  const Child = defineComponent({
    name: 'ChildComposableTester',
    setup() {
      context = composable()
      return () => h('div', 'child')
    },
    render() {
      return h('div', 'child')
    },
  })

  const Parent = defineComponent({
    name: 'ParentComposableTester',
    setup() {
      if (provider) provider()
      return () => h(Child)
    },
    render() {
      return h(Child)
    },
  })

  const wrapper = mount(Parent)

  return {
    wrapper,
    context: context as T,
    unmount: () => wrapper.unmount(),
  }
}
