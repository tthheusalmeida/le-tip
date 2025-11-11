<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCurrency } from '@/composables/useCurrency'
import { CURRENCY } from '@/utils/consts'
import { BiEuro, BiDollar } from 'vue3-icons/bi'
import { formatAmount } from '@/utils/formatter'

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

const icon = computed(() => (currency.value === CURRENCY.EUR ? BiEuro : BiDollar))

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
    <Transition name="fade" mode="out-in">
      <component v-if="icon" :is="icon" class="input-money__icon" />
    </Transition>

    <div class="input-money__wrapper">
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
  </div>
</template>

<style scoped lang="css">
.input-money {
  display: flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  gap: 0.5rem;

  &__label {
    font-size: 1.2em;
    font-weight: 600;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: #ffffff;
    transition:
      border-color 0.2s,
      outline 0.2s;
  }

  &__wrapper:focus-within {
    border-color: #3b82f6;
    outline: 2px solid #3b82f633;
  }

  &__icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
  }

  &__field {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #111827;
    background-color: transparent;
    text-align: right;
    max-width: fit-content;
  }

  &__field::placeholder {
    color: #9ca3af;
  }
}
</style>
