<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { FaMoon, FaSun } from 'vue3-icons/fa'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <header class="header">
    <h3 class="header__title">Le/Tip</h3>

    <button @click="toggleTheme" class="header__theme">
      <Transition name="fade" mode="out-in">
        <FaMoon class="header__theme--moon" v-if="theme === 'light'" />
        <FaSun class="header__theme--moon" v-else />
      </Transition>
    </button>
  </header>
</template>

<style scoped lang="css">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  &__title {
    font-weight: 600;
    font-size: 1.25rem;
  }

  &__theme {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 0.2rem;
    background: var(--bg-color);
    cursor: pointer;

    height: 2.5rem;
    width: 2.5rem;

    &--moon,
    &--sun {
      height: 2rem;
      width: 2rem;
      color: var(--fg-color);
    }
  }
}
</style>
