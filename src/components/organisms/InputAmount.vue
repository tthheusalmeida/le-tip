<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCurrency } from '@/composables/useCurrency'
import { CURRENCY, LOCALE_MAP } from '@/utils/consts'
import { BiEuro, BiDollar } from 'vue3-icons/bi'

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
const formattedAmount = computed(() => {
  const locale = LOCALE_MAP[currency.value]
  const digits = rawValue.value.replace(/\D/g, '')

  if (!digits) return '0'

  let intPart = digits
  let decPart = ''

  if (digits.length > 2) {
    intPart = digits.slice(0, -2)
    decPart = digits.slice(-2)
  }

  const number = parseFloat(`${intPart}.${decPart || ''}`)

  const fractionDigits = decPart ? 2 : 0

  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(number)
})

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
    <label class="input-money__label">Valor</label>
    <div class="input-money__wrapper">
      <component v-if="icon" :is="icon" class="input-money__icon" />

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
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;

  &__label {
    font-size: 0.875rem;
    width: 80px;
    font-weight: 500;
    color: #374151;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: #ffffff;
    transition: border-color 0.2s;
  }

  &__wrapper:focus-within {
    border-color: #3b82f6;
    outline: 2px solid #3b82f633;
  }

  &__icon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    color: #6b7280;
  }

  &__field {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #111827;
    background-color: transparent;
  }

  &__field::placeholder {
    color: #9ca3af;
  }
}
</style>
