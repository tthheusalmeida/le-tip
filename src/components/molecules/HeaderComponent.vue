<script setup lang="ts"></script>

<template>
  <header class="header header--dark">
    <h3 class="header__title">Lip Tip</h3>
    <div class="header__theme">Tema</div>
  </header>
</template>

<style scoped lang="css">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    font-weight: 600;
    font-size: 1.25rem;
  }

  &__theme {
    opacity: 0.8;
  }
}
</style>
