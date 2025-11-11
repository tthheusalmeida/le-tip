<script setup lang="ts">
import { ref } from 'vue'
import ButtonComponent from '../atoms/ButtonComponent.vue'
import { BiChevronRight } from 'vue3-icons/bi'

const rotated = ref(false)

function toggleRotation() {
  rotated.value = !rotated.value
}
</script>

<template>
  <ButtonComponent class="floating-button" rounded @click="toggleRotation">
    <BiChevronRight
      class="floating-button__icon"
      :class="{ 'floating-button__icon--rotated': rotated }"
    />
  </ButtonComponent>
</template>

<style scoped lang="css">
.floating-button {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  width: 4rem;
  height: 4rem;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;

  &__icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    color: white;
    transition: transform 0.3s ease;
  }

  &__icon--rotated {
    transform: rotate(-180deg);
  }
}
</style>
