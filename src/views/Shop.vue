<template>
  <div class="shop-page">
    <PageHero
      :image="heroImages.shop"
      :title="t('shop.title')"
      :description="t('shop.subtitle')"
      :primary-cta-text="t('common.learnMore')"
      primary-cta-to="#products"
    />

    <div id="products" class="shop-main">
      <div class="container shop-layout">
        <aside class="shop-sidebar">
          <div class="sidebar-card">
            <h2 class="sidebar-title">{{ t('shop.categories') }}</h2>
            <nav class="category-nav" aria-label="Product categories">
              <button
                v-for="category in categories"
                :key="category.id"
                type="button"
                class="category-btn"
                :class="{ active: selectedCategory === category.id }"
                @click="selectedCategory = category.id"
              >
                <span class="category-btn-text">{{ locale === 'yo' ? category.nameYo : category.name }}</span>
              </button>
            </nav>
          </div>
          <p class="shipping-note">{{ t('policies.shippingDeliveryShort') }}</p>
        </aside>

        <section class="shop-products" aria-labelledby="products-heading">
          <header class="products-header">
            <h2 id="products-heading" class="products-heading">
              {{ selectedCategory === 'all' ? t('shop.allProducts') : (locale === 'yo' ? currentCategoryNameYo : currentCategoryName) }}
            </h2>
            <p class="products-count">
              {{ filteredProducts.length === 1 ? t('shop.showingCountOne') : t('shop.showingCount', { count: filteredProducts.length }) }}
            </p>
          </header>

          <div v-if="filteredProducts.length > 0" class="products-grid">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
          </div>

          <div v-else class="empty-state">
            <div class="empty-state-icon" aria-hidden="true">🌾</div>
            <p class="empty-state-title">{{ t('shop.noProducts') }}</p>
            <p class="empty-state-hint">{{ t('shop.noProductsHint') }}</p>
            <button type="button" class="btn btn-secondary" @click="selectedCategory = 'all'">
              {{ t('shop.allProducts') }}
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProducts } from '@/composables/useProducts'
import ProductCard from '@/components/ProductCard.vue'
import PageHero from '@/components/PageHero.vue'
import { heroImages } from '@/constants/heroImages'

const { locale, t } = useI18n()
const { categories, getProductsByCategory } = useProducts()
const selectedCategory = ref('all')
const filteredProducts = computed(() => getProductsByCategory(selectedCategory.value))

const currentCategoryName = computed(() => {
  const cat = categories.value.find((c) => c.id === selectedCategory.value)
  return cat ? cat.name : ''
})
const currentCategoryNameYo = computed(() => {
  const cat = categories.value.find((c) => c.id === selectedCategory.value)
  return cat ? cat.nameYo : ''
})
</script>

<style scoped>
.shop-main { background: var(--warm-white); padding: var(--space-xl) 0; }
.shop-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--space-xl);
  padding: 0 var(--space-md);
  max-width: 1280px;
  margin: 0 auto;
  align-items: start;
}

/* Sidebar */
.shop-sidebar { position: sticky; top: 5.5rem; }
.sidebar-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(15, 23, 42, 0.06);
  padding: var(--space-lg);
  margin-bottom: var(--space-md);
}
.sidebar-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--earth-900);
  margin: 0 0 var(--space-md);
  letter-spacing: -0.01em;
}
.category-nav { display: flex; flex-direction: column; gap: 0.25rem; }
.category-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  background: transparent;
  font: inherit;
  font-weight: 500;
  color: var(--earth-700);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-left: 3px solid transparent;
}
.category-btn:hover { background: var(--sand); color: var(--earth-900); }
.category-btn.active {
  background: var(--leaf-green);
  color: white;
  border-left-color: var(--deep-forest);
  font-weight: 600;
}
.category-btn-text { display: block; }
.shipping-note {
  font-size: 0.875rem;
  color: var(--earth-500);
  line-height: 1.5;
  margin: 0;
}

/* Products section */
.shop-products { min-width: 0; }
.products-header { margin-bottom: var(--space-lg); }
.products-heading {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--earth-900);
  margin: 0 0 0.25rem;
}
.products-count {
  font-size: 0.9375rem;
  color: var(--earth-600);
  margin: 0;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-lg);
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: var(--space-xl) var(--space-md);
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-soft);
  border: 1px dashed var(--earth-400);
}
.empty-state-icon { font-size: 4rem; margin-bottom: var(--space-md); opacity: 0.9; }
.empty-state-title { font-size: 1.25rem; font-weight: 600; color: var(--earth-800); margin: 0 0 var(--space-sm); }
.empty-state-hint { color: var(--earth-600); margin: 0 0 var(--space-lg); max-width: 360px; margin-left: auto; margin-right: auto; line-height: 1.5; }

@media (max-width: 768px) {
  .shop-layout { grid-template-columns: 1fr; }
  .shop-sidebar { position: static; }
  .category-nav { flex-direction: row; flex-wrap: wrap; }
  .category-btn { width: auto; padding: 0.5rem 1rem; font-size: 0.9375rem; border-left: none; border-bottom: 3px solid transparent; }
  .category-btn.active { border-left: none; border-bottom-color: var(--deep-forest); }
  .products-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-md); }
}
</style>
