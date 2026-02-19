<template>
  <div class="checkout-page">
    <div v-if="orderPlaced" class="checkout-success">
      <div class="container">
        <div class="success-card">
          <div class="success-icon">✓</div>
          <h1>{{ t('checkout.successTitle') }}</h1>
          <p>{{ t('checkout.successMessage') }}</p>
          <RouterLink to="/shop" class="btn btn-primary">{{ t('cart.continueShopping') }}</RouterLink>
        </div>
      </div>
    </div>

    <template v-else>
      <div v-if="cartStore.items.length === 0" class="checkout-empty">
        <div class="container">
          <h1>{{ t('checkout.title') }}</h1>
          <p>{{ t('checkout.emptyCart') }}</p>
          <RouterLink to="/shop" class="btn btn-primary">{{ t('checkout.emptyCartLink') }}</RouterLink>
        </div>
      </div>

      <div v-else class="checkout-content">
        <!-- <div class="page-header">
          <div class="container">
            <h1>{{ t('checkout.title') }}</h1>
          </div>
        </div> -->
        <div class="container checkout-grid">
          <div class="checkout-form-section">
            <h2>{{ t('checkout.shippingAddress') }}</h2>
            <form @submit.prevent="placeOrder" class="address-form">
              <div class="form-group">
                <label>{{ t('checkout.fullName') }}</label>
                <input v-model="form.fullName" type="text" required />
              </div>
              <div class="form-group">
                <label>{{ t('checkout.email') }}</label>
                <input v-model="form.email" type="email" required />
              </div>
              <div class="form-group">
                <label>{{ t('checkout.phone') }}</label>
                <input v-model="form.phone" type="tel" required />
              </div>
              <div class="form-group">
                <label>{{ t('checkout.addressLine1') }}</label>
                <input v-model="form.addressLine1" type="text" required />
              </div>
              <div class="form-group">
                <label>{{ t('checkout.addressLine2') }}</label>
                <input v-model="form.addressLine2" type="text" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>{{ t('checkout.city') }}</label>
                  <input v-model="form.city" type="text" required />
                </div>
                <div class="form-group">
                  <label>{{ t('checkout.stateRegion') }}</label>
                  <input v-model="form.stateRegion" type="text" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>{{ t('checkout.postalCode') }}</label>
                  <input v-model="form.postalCode" type="text" required />
                </div>
                <div class="form-group">
                  <label>{{ t('checkout.country') }}</label>
                  <select v-model="form.country" required>
                    <option value="">{{ t('checkout.countryPlaceholder') }}</option>
                    <option value="NG">Nigeria</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="OTHER">{{ t('consultationForm.countryOther') }}</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-primary submit-btn">{{ t('checkout.placeOrder') }}</button>
            </form>
          </div>
          <aside class="order-summary-section">
            <h2>{{ t('checkout.orderSummary') }}</h2>
            <div class="summary-items">
              <div v-for="item in cartStore.items" :key="item.id" class="summary-item">
                <div class="summary-item-thumb">
                  <img
                    v-if="item.image && !checkoutImageErrors[item.id]"
                    :src="item.image"
                    :alt="locale === 'yo' ? item.nameYo : item.name"
                    @error="checkoutImageErrors[item.id] = true"
                  />
                  <span v-else class="summary-item-icon">{{ item.icon || '🌱' }}</span>
                </div>
                <div class="summary-item-info">
                  <span class="item-name">{{ locale === 'yo' ? item.nameYo : item.name }}</span>
                  <span class="item-qty">× {{ item.quantity }}</span>
                </div>
                <span class="item-price">{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
            <div class="summary-totals">
              <div class="summary-row">
                <span>{{ t('cart.subtotal') }}</span>
                <span>{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div class="summary-row">
                <span>{{ t('cart.shipping') }}</span>
                <span>{{ formatPrice(cartStore.shipping) }}</span>
              </div>
              <div class="summary-row total">
                <span>{{ t('cart.total') }}</span>
                <span>{{ formatPrice(cartStore.total) }}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { useCurrency } from '@/composables/useCurrency'
import PageHero from '@/components/PageHero.vue'
import { heroImages } from '@/constants/heroImages'

const { locale, t } = useI18n()
const cartStore = useCartStore()
const { formatPrice } = useCurrency()
const orderPlaced = ref(false)
const checkoutImageErrors = reactive({})
const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  stateRegion: '',
  postalCode: '',
  country: ''
})

function placeOrder() {
  orderPlaced.value = true
  cartStore.clearCart()
}
</script>

<style scoped>
.checkout-success { padding: var(--space-xl) 0; min-height: 50vh; display: flex; align-items: center; }
.success-card { text-align: center; max-width: 480px; margin: 0 auto; background: white; padding: var(--space-xl); border-radius: var(--border-radius); box-shadow: var(--shadow-strong); }
.success-icon { font-size: 4rem; color: var(--leaf-green); margin-bottom: var(--space-md); }
.success-card h1 { margin-bottom: var(--space-sm); }
.success-card p { margin-bottom: var(--space-lg); color: var(--earth-600); }
.checkout-empty { padding: var(--space-xl) 0; text-align: center; }
.checkout-empty p { margin: var(--space-md) 0; }
.checkout-grid { display: grid; grid-template-columns: 1fr 380px; gap: var(--space-xl); padding: var(--space-xl) var(--space-md); }
.checkout-form-section h2, .order-summary-section h2 { margin-bottom: var(--space-md); }
.address-form { display: flex; flex-direction: column; gap: var(--space-md); }
.form-group label { display: block; margin-bottom: 0.25rem; font-weight: 600; }
.form-group input, .form-group select { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid var(--earth-400); border-radius: var(--border-radius); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
.submit-btn { margin-top: var(--space-sm); }
.order-summary-section { background: var(--sand); padding: var(--space-lg); border-radius: var(--border-radius); height: fit-content; position: sticky; top: 100px; }
.summary-items { margin-bottom: var(--space-md); }
.summary-item { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.75rem; font-size: 0.95rem; }
.summary-item-thumb { width: 44px; height: 44px; border-radius: var(--border-radius); overflow: hidden; background: var(--sand); flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.summary-item-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.summary-item-icon { font-size: 1.5rem; }
.summary-item-info { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.25rem 0.5rem; }
.item-name { width: 100%; }
.item-qty { color: var(--earth-600); font-size: 0.9rem; }
.item-price { font-weight: 600; flex-shrink: 0; }
.summary-row { display: flex; justify-content: space-between; padding: 0.5rem 0; }
.summary-row.total { border-top: 2px solid var(--earth-600); margin-top: 0.5rem; padding-top: 0.75rem; font-weight: 700; font-size: 1.1rem; }
@media (max-width: 968px) {
  .checkout-grid { grid-template-columns: 1fr; }
  .order-summary-section { position: static; }
}
</style>
