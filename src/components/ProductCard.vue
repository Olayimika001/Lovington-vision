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
      <div v-if="!product.image || imageError" class="placeholder-image">{{ product.icon || '🌱' }}</div>
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
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(15, 23, 42, 0.06);
  height: 100%;
  display: flex;
  flex-direction: column;
}
.product-card:hover { box-shadow: var(--shadow-strong); transform: translateY(-8px); }
.product-image { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; background: var(--sand); }
.product-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.placeholder-image {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, var(--sand), var(--harvest-gold));
  display: flex; align-items: center; justify-content: center; font-size: 4rem;
}
.out-of-stock-badge {
  position: absolute; top: 1rem; right: 1rem;
  background: var(--clay-terracotta); color: white; padding: 0.4rem 0.8rem;
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
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  word-wrap: break-word;
}
.product-description {
  color: var(--earth-600);
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
  color: var(--leaf-green);
  letter-spacing: -0.02em;
  word-break: break-word;
  line-height: 1.2;
}
.unit {
  font-size: 0.8rem;
  color: var(--earth-600);
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
</style>
