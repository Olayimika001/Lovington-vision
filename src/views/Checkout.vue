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
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import PageHero from '@/components/PageHero.vue'
import { heroImages } from '@/constants/heroImages'

const { locale, t } = useI18n()
const cartStore = useCartStore()
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
.success-icon { font-size: 4rem; color: var(--primary); margin-bottom: var(--space-md); }
.success-card h1 { margin-bottom: var(--space-sm); }
.success-card p { margin-bottom: var(--space-lg); color: var(--earth-600); }
.checkout-empty { padding: var(--space-xl) 0; text-align: center; }
.checkout-empty p { margin: var(--space-md) 0; }
.checkout-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-xl); padding: var(--space-xl) var(--space-md); }
.checkout-form-section h2 { margin-bottom: var(--space-md); }
.address-form { display: flex; flex-direction: column; gap: var(--space-md); }
.form-group label { display: block; margin-bottom: 0.25rem; font-weight: 600; }
.form-group input, .form-group select { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid var(--earth-400); border-radius: var(--border-radius); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
.submit-btn { margin-top: var(--space-sm); }
@media (max-width: 480px) {
  .checkout-grid { padding: var(--space-md); }
  .summary-item { gap: 0.5rem; font-size: 0.9rem; }
  .summary-item-thumb { width: 40px; height: 40px; }
  .summary-item-icon svg { width: 20px; height: 20px; }
}
</style>
