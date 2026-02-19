import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const CURRENCY_STORAGE_KEY = 'yoruba-farm-currency'
const RATES_FROM_USD = { USD: 1, GBP: 0.79, EUR: 0.92, NGN: 1500 }
const CURRENCY_LOCALES = { USD: 'en-US', GBP: 'en-GB', EUR: 'de-DE', NGN: 'en-NG' }

// Shared ref so all components (Navigation, CartSidebar, ProductCard, etc.) use the same currency
const stored =
  typeof localStorage !== 'undefined' ? localStorage.getItem(CURRENCY_STORAGE_KEY) : null
const currency = ref(stored && RATES_FROM_USD[stored] ? stored : 'USD')

export function useCurrency() {
  const { locale } = useI18n()

  function setCurrency(code) {
    if (!RATES_FROM_USD[code]) return
    currency.value = code
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CURRENCY_STORAGE_KEY, code)
    }
  }

  function formatPrice(amount) {
    const code = currency.value
    const rate = RATES_FROM_USD[code] ?? 1
    const converted = amount * rate
    const localeTag = CURRENCY_LOCALES[code] ?? 'en-US'
    return new Intl.NumberFormat(localeTag, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(converted)
  }

  function formatNumber(value) {
    const tag = locale.value === 'yo' ? 'en-NG' : 'en-US'
    return new Intl.NumberFormat(tag).format(value)
  }

  return {
    currency,
    setCurrency,
    formatPrice,
    formatNumber,
    currencyCodes: Object.keys(RATES_FROM_USD)
  }
}
