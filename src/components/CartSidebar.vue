<template>
  <Transition name="slide">
    <div v-if="cartStore.isOpen" class="cart-sidebar">
      <div class="cart-overlay" @click="cartStore.toggleCart()"></div>
      <div class="cart-panel">
        <div class="cart-header">
          <h2>{{ t('cart.title') }}</h2>
          <button type="button" @click="cartStore.toggleCart()" class="close-btn" :aria-label="t('common.close')">✕</button>
        </div>
        <div v-if="cartStore.items.length === 0" class="cart-empty">
          <p>{{ t('cart.empty') }}</p>
          <RouterLink to="/shop" class="btn btn-primary" @click="cartStore.toggleCart()">{{ t('cart.continueShopping') }}</RouterLink>
        </div>
        <div v-else class="cart-content">
          <div class="cart-items">
            <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
              <div class="item-image">
                <img
                  v-if="item.image && !imageErrors[item.id]"
                  :src="item.image"
                  :alt="locale === 'yo' ? item.nameYo : item.name"
                  class="item-img"
                  @error="imageErrors[item.id] = true"
                />
                <div v-else class="placeholder-image">{{ item.icon || '🌱' }}</div>
              </div>
              <div class="item-details">
                <h4>{{ locale === 'yo' ? item.nameYo : item.name }}</h4>
                <p class="item-price">{{ formatPrice(item.price) }}</p>
                <div class="quantity-controls">
                  <button type="button" @click="cartStore.updateQuantity(item.id, item.quantity - 1)" aria-label="Decrease">−</button>
                  <span>{{ item.quantity }}</span>
                  <button type="button" @click="cartStore.updateQuantity(item.id, item.quantity + 1)" aria-label="Increase">+</button>
                </div>
              </div>
              <div class="item-actions">
                <button type="button" @click="cartStore.removeItem(item.id)" class="remove-btn">{{ t('cart.remove') }}</button>
                <p class="item-total">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>
          </div>
          <div class="cart-summary">
            <div class="summary-row"><span>{{ t('cart.subtotal') }}</span><span>{{ formatPrice(cartStore.subtotal) }}</span></div>
            <div class="summary-row"><span>{{ t('cart.shipping') }}</span><span>{{ formatPrice(cartStore.shipping) }}</span></div>
            <div class="summary-row total"><span>{{ t('cart.total') }}</span><span>{{ formatPrice(cartStore.total) }}</span></div>
            <RouterLink to="/checkout" class="btn btn-primary checkout-btn" @click="cartStore.toggleCart()">{{ t('cart.checkout') }}</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { useCurrency } from '@/composables/useCurrency'

const { locale, t } = useI18n()
const { formatPrice } = useCurrency()
const cartStore = useCartStore()
const imageErrors = reactive({})
</script>

<style scoped>
.cart-sidebar { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 2000; }
.cart-overlay { position: absolute; inset: 0; background: rgba(26, 21, 6, 0.6); backdrop-filter: blur(4px); }
.cart-panel { position: absolute; top: 0; right: 0; bottom: 0; width: 100%; max-width: 450px; background: var(--warm-white); box-shadow: -4px 0 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; }
.cart-header { display: flex; justify-content: space-between; align-items: center; padding: var(--space-md); border-bottom: 1px solid rgba(15,23,42,0.08); background: white; }
.cart-header h2 { font-size: 1.75rem; margin: 0; }
.close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--earth-700); padding: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
.cart-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; padding: var(--space-lg); text-align: center; }
.cart-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.cart-items { flex: 1; overflow-y: auto; padding: var(--space-md); }
.cart-item { display: grid; grid-template-columns: 80px 1fr auto; gap: 1rem; padding: 1rem; background: white; border-radius: var(--border-radius); margin-bottom: 1rem; box-shadow: var(--shadow-soft); }
.item-image { width: 80px; height: 80px; border-radius: var(--border-radius); overflow: hidden; background: var(--sand); flex-shrink: 0; }
.item-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.placeholder-image { width: 100%; height: 100%; background: linear-gradient(135deg, var(--sand), var(--accent)); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }
.item-details h4 { font-size: 1rem; margin: 0 0 0.25rem 0; }
.item-price { color: var(--earth-600); font-size: 0.95rem; margin: 0 0 0.5rem 0; }
.quantity-controls { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem; }
.quantity-controls button { width: 28px; height: 28px; border: 1px solid var(--earth-400); background: white; border-radius: var(--border-radius); cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; }
.quantity-controls button:hover { background: var(--primary); color: white; border-color: var(--primary); }
.item-actions { display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; }
.remove-btn { background: none; border: none; color: var(--secondary); cursor: pointer; font-size: 0.85rem; text-decoration: underline; padding: 0; }
.item-total { font-weight: 700; font-size: 1.1rem; }
.cart-summary { padding: var(--space-md); background: white; border-top: 1px solid rgba(15,23,42,0.08); }
.summary-row { display: flex; justify-content: space-between; padding: 0.75rem 0; }
.summary-row.total { border-top: 2px solid var(--earth-600); margin-top: 0.5rem; padding-top: 1rem; font-weight: 700; font-size: 1.25rem; }
.checkout-btn { display: block; width: 100%; margin-top: 1rem; padding: 1rem; text-align: center; text-decoration: none; color: inherit; }
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from .cart-overlay, .slide-leave-to .cart-overlay { opacity: 0; }
.slide-enter-from .cart-panel, .slide-leave-to .cart-panel { transform: translateX(100%); }
@media (max-width: 768px) { .cart-panel { max-width: 100%; } }
</style>
