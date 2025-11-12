import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useTheme } from '@/composables/useTheme'
import { useColorMode } from '@vueuse/core'

// Mock do vueuse/core
vi.mock('@vueuse/core', () => ({
  useColorMode: vi.fn(),
}))

describe('useTheme', () => {
  let mockMode: { value: string }

  beforeEach(() => {
    mockMode = { value: 'light' }
    ;(useColorMode as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockMode)
  })

  it('should initialize color mode with correct options', () => {
    useTheme()

    expect(useColorMode).toHaveBeenCalledWith({
      selector: 'html',
      attribute: 'data-theme',
      storageKey: 'theme',
      initialValue: 'auto',
    })
  })

  it('should return current theme and toggle function', () => {
    const { theme, toggleTheme } = useTheme()

    expect(theme.value).toBe('light')
    expect(typeof toggleTheme).toBe('function')
  })

  it('when change theme, should toggle from light to dark', () => {
    const { theme, toggleTheme } = useTheme()

    toggleTheme()
    expect(theme.value).toBe('dark')

    toggleTheme()
    expect(theme.value).toBe('light')
  })

  it('when initialized as dark, should respect current mode', () => {
    mockMode.value = 'dark'

    const { theme, toggleTheme } = useTheme()

    expect(theme.value).toBe('dark')

    toggleTheme()
    expect(theme.value).toBe('light')
  })
})
