<template>
  <div class="product-card">
    <div class="product-image">
      <img
        v-if="product.image && !imageError"
        :src="product.image"
        :alt="locale === 'yo' ? product.nameYo : product.name"
        class="product-img"
        loading="lazy"
        @error="imageError = true"
      />
      <div v-if="!product.image || imageError" class="placeholder-image" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
      </div>
      <span v-if="!product.inStock" class="out-of-stock-badge">{{ t('shop.outOfStock') }}</span>
    </div>
    <div class="product-info">
      <h3>{{ locale === 'yo' ? product.nameYo : product.name }}</h3>
      <p class="product-description">{{ locale === 'yo' ? product.descriptionYo : product.description }}</p>
      <div class="product-footer">
        <div class="price-section">
          <span class="price">{{ formatPrice(product.price) }}</span>
          <span class="unit">{{ unitLabel }}</span>
        </div>
        <button type="button" @click="addToCart" :disabled="!product.inStock" class="btn btn-primary add-to-cart">
          {{ product.inStock ? t('shop.addToCart') : t('shop.outOfStock') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { useCurrency } from '@/composables/useCurrency'

const props = defineProps({
  product: { type: Object, required: true }
})

const { locale, t } = useI18n()
const imageError = ref(false)
watch(() => props.product.id, () => { imageError.value = false })
const { formatPrice } = useCurrency()
const cartStore = useCartStore()

const unitLabel = computed(() => {
  const u = props.product.unit || 'kg'
  const key = u === 'bunch' ? 'common.perBunch' : u === 'liter' ? 'common.perLiter' : 'common.perKg'
  return t(key)
})

function addToCart() {
  if (props.product.inStock) {
    cartStore.addItem({
      id: props.product.id,
      name: props.product.name,
      nameYo: props.product.nameYo,
      price: props.product.price,
      icon: props.product.icon || '🌱',
      image: props.product.image || null
    })
  }
}
</script>

<style scoped>
.product-card {
  background: var(--cream);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(45, 106, 79, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.product-card:hover { box-shadow: var(--shadow-strong); transform: translateY(-8px); }
.product-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  min-height: 0;
  overflow: hidden;
  background: var(--sand);
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.placeholder-image {
  width: 100%;
  height: 100%;
  min-height: 120px;
  background: linear-gradient(135deg, var(--sand), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}
.placeholder-image svg {
  width: 48px;
  height: 48px;
  opacity: 0.7;
}
.out-of-stock-badge {
  position: absolute; top: 1rem; right: 1rem;
  background: var(--secondary); color: white; padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius); font-size: 0.85rem; font-weight: 600;
}
.product-info {
  padding: 1.25rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.product-info h3 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  word-wrap: break-word;
  color: var(--text);
}
.product-description {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.55;
  margin: 0 0 1rem 0;
  flex: 1;
  min-height: 2.8em;
}
.product-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  margin-top: auto;
  flex-wrap: wrap;
}
.price-section {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
  flex-shrink: 0;
}
.price {
  font-size: clamp(1.25rem, 3.5vw, 1.6rem);
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.02em;
  word-break: break-word;
  line-height: 1.2;
}
.unit {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.add-to-cart {
  padding: 0.6rem 1rem;
  font-size: 0.875rem;
  white-space: nowrap;
  flex-shrink: 0;
  min-height: 2.75rem;
}
.add-to-cart:disabled { background: var(--earth-400); cursor: not-allowed; opacity: 0.6; }
@media (max-width: 768px) {
  .product-footer { flex-direction: column; align-items: stretch; gap: 0.75rem; }
  .price-section { flex-direction: row; align-items: baseline; gap: 0.35rem; }
  .add-to-cart { width: 100%; }
}
@media (max-width: 480px) {
  .product-info { padding: 0.75rem 0.75rem 1rem; }
  .product-info h3 { font-size: 1rem; }
  .product-description { font-size: 0.85rem; min-height: 2.6em; }
}
@media (max-width: 360px) {
  .placeholder-image { min-height: 80px; }
  .placeholder-image svg { width: 36px; height: 36px; }
  .product-info { padding: 0.5rem 0.5rem 0.75rem; }
  .product-info h3 { font-size: 0.95rem; }
}
</style>
