<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCurrency } from '@/composables/useCurrency'
import { formatAmount } from '@/utils/formatter'
import IconTheme from './IconTheme.vue'

const MAX_DIGITS = 11

const amount = defineModel('amount', {
  type: Number,
  default: 0,
})

defineProps({
  label: {
    type: String,
    default: '',
  },
})

const inputRef = ref<HTMLInputElement | null>(null)
const { currency } = useCurrency()

watch(
  () => amount.value,
  (val) => {
    const cents = Math.round(val * 100)
    if (cents !== Number(rawValue.value)) {
      rawValue.value = String(cents)
    }
  },
)

const rawValue = ref('0')
const formattedAmount = computed(() => formatAmount(rawValue.value, currency.value))

if (!amount.value) {
  amount.value = 0
}

function onInput(e: Event) {
  const input = (e.target as HTMLInputElement).value
  rawValue.value = input.replace(/\D/g, '') || '0'
  amount.value = parseFloat(rawValue.value) / 100
}
function onKeyDown(e: KeyboardEvent) {
  const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
  const isDigit = /^\d$/.test(e.key)

  if (!isDigit && !allowed.includes(e.key)) {
    e.preventDefault()
    return
  }

  if (isDigit && rawValue.value.length >= MAX_DIGITS) {
    e.preventDefault()
  }
}
</script>

<template>
  <div class="input-money">
    <span class="input-money__label">Valor</span>
    <IconTheme :current-currency="currency" />

    <input
      ref="inputRef"
      type="text"
      inputmode="numeric"
      class="input-money__field"
      :value="formattedAmount"
      @input="onInput"
      @keydown="onKeyDown"
      @paste.prevent
    />
  </div>
</template>

<style scoped lang="css">
.input-money {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;

  &__label {
    font-size: 1.2em;
    font-weight: 600;
  }

  &__wrapper &__icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
  }

  &__field {
    color: black;
    font-size: larger;
    font-weight: 600;
    text-align: right;
    padding: 0.75rem;
    min-height: 3rem;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--input-bg-color);

    border: none;
    outline: none;
    border-radius: 0.5rem;

    transition:
      border-color 0.2s,
      outline 0.2s;
  }
}
</style>
