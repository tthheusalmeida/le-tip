<template>
  <div class="range-slider" :class="themeClass">
    <div class="range-slider__header">
      <label :for="id" class="range-slider__label">{{ props.label }}:</label>

      <span class="range-slider__current-value">
        {{ formattedValue }}
      </span>
    </div>

    <div class="range-slider__input-wrapper">
      <input
        :id="id"
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :value="props.modelValue"
        @input="onInput"
        class="range-slider__input"
        :style="inputStyle"
      />
    </div>

    <div class="range-slider__limits">
      <span class="range-slider__limit">{{ props.min }}</span>
      <span class="range-slider__limit">{{ props.max }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CURRENCY } from '@/utils/consts'
import { useCurrency } from '@/composables/useCurrency'

const { currency } = useCurrency()

const themeClass = computed(() => {
  const currentCurrency = currency.value?.toLowerCase()
  if (currentCurrency === CURRENCY.EUR.toLowerCase()) {
    return 'range-slider--eur'
  }
  if (currentCurrency === CURRENCY.USD.toLowerCase()) {
    return 'range-slider--usd'
  }
  return ''
})

export type FormatterFn = (value: number) => string

interface RangeSliderProps {
  modelValue: number | string
  label: string
  min?: number | string
  max?: number | string
  step?: number | string
  formatter?: FormatterFn
}

interface RangeSliderEmits {
  (e: 'update:modelValue', value: number): void
}

const props = withDefaults(defineProps<RangeSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  formatter: (value: number) => String(value),
})

const emit = defineEmits<RangeSliderEmits>()

const id = computed(() => `range-slider-${props.label.toLowerCase().replace(/\s/g, '-')}`)

const formattedValue = computed(() => {
  const numericValue = Number(props.modelValue)
  return props.formatter(numericValue)
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', Number(target.value))
}

const inputStyle = computed(() => {
  const minVal = Number(props.min)
  const maxVal = Number(props.max)
  const currentVal = Number(props.modelValue)

  const progress = (Math.max(minVal, Math.min(maxVal, currentVal)) - minVal) / (maxVal - minVal)
  const percentage = isNaN(progress) ? 0 : progress * 100

  return {
    '--range-progress': `${percentage}%`,
  }
})
</script>

<style scoped lang="css">
.range-slider {
  width: 100%;
  margin: 0;
  --track-color-after: #ccc;
  --range-color: #3498db;

  &--eur {
    --range-color: #0055cc;
  }

  &--usd {
    --range-color: #dc143c;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    font-size: 1.2em;
  }

  &__label {
    margin-right: 8px;
    font-weight: 600;
    color: #333;
  }

  &__current-value {
    font-weight: normal;
    color: var(--range-color);
    transition: color 0.3s ease;
  }

  &__input-wrapper {
    padding: 0 5px;
  }

  &__input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: transparent;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 8px;
      cursor: pointer;
      background: linear-gradient(
        to right,
        var(--range-color) 0%,
        var(--range-color) var(--range-progress),
        var(--track-color-after) var(--range-progress),
        var(--track-color-after) 100%
      );
      border-radius: 4px;
      transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 18px;
      width: 18px;
      border-radius: 50%;

      background: var(--range-color);
      cursor: pointer;
      margin-top: -5px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
      transition:
        background 0.3s ease,
        transform 0.1s ease;

      &:active {
        transform: scale(1.1);
      }
    }

    &::-moz-range-track {
      width: 100%;
      height: 8px;
      cursor: pointer;
      background: var(--track-color-after);
      border-radius: 4px;
    }

    &::-moz-range-thumb {
      height: 18px;
      width: 18px;
      border-radius: 50%;

      background: var(--range-color);
      cursor: pointer;
      border: none;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    }
  }

  &__limits {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    font-size: 0.9em;
    color: #666;
    padding: 0 5px;
  }
}
</style>
