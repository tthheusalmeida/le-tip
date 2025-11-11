import { useColorMode } from '@vueuse/core'

export function useTheme() {
  const mode = useColorMode({
    selector: 'html',
    attribute: 'data-theme',
    storageKey: 'theme',
    initialValue: 'auto',
  })

  const toggleTheme = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme: mode,
    toggleTheme,
  }
}
