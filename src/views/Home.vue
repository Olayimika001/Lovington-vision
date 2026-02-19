<template>
  <div class="home-page">
    <PageHero
      :image="heroImages.home"
      :subtitle="t('hero.tagline')"
      :title="t('hero.heroTitle')"
      :title-highlight-words="locale === 'yo' ? ['Àṣà', 'Ọ̀dị'] : ['Culture', 'Nature']"
      :description="t('hero.heroDesc')"
      :primary-cta-text="t('hero.ctaExplore')"
      primary-cta-to="/shop"
      :secondary-cta-text="t('hero.ctaGetInTouch')"
      secondary-cta-to="/consultation"
    />

    <section class="language-meets-land">
      <div class="container">
        <h2 class="land-title">
          <span class="land-title-line">{{ t('hero.languageMeetsLandLine1') }}</span>
          <span class="land-title-line">{{ t('hero.languageMeetsLandLine2') }}</span>
        </h2>
        <div class="land-underline" aria-hidden="true"></div>
        <p class="land-intro">{{ t('hero.languageMeetsLandIntro') }}</p>
        <div class="land-cards">
          <div class="land-card">
            <div class="land-card-icon land-card-icon--green" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h8"/></svg>
            </div>
            <h3 class="land-card-title">{{ t('hero.serviceYorubaTitle') }}</h3>
            <p class="land-card-desc">{{ t('hero.serviceYorubaDesc') }}</p>
          </div>
          <div class="land-card">
            <div class="land-card-icon land-card-icon--tan" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
            </div>
            <h3 class="land-card-title">{{ t('hero.serviceAgricultureTitle') }}</h3>
            <p class="land-card-desc">{{ t('hero.serviceAgricultureDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-products">
      <div class="container">
        <h2 class="section-title">{{ t('shop.title') }}</h2>
        <p class="section-subtitle">{{ t('shop.subtitle') }}</p>
        <div class="products-grid">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
        <div class="cta-center">
          <RouterLink to="/shop" class="btn btn-secondary">{{ t('common.learnMore') }}</RouterLink>
        </div>
      </div>
    </section>

    <section class="consultation-teaser" :style="{ backgroundImage: `url(${heroImages.consultation})` }">
      <div class="consultation-teaser-overlay" aria-hidden="true"></div>
      <div class="container consultation-teaser-inner">
        <div class="teaser-content">
          <div class="teaser-text">
            <h2>{{ t('consultation.title') }}</h2>
            <p>{{ t('consultation.subtitle') }}</p>
            <p class="teaser-description">{{ t('consultation.description') }}</p>
            <RouterLink to="/consultation" class="btn btn-teaser">{{ t('consultation.bookSession') }}</RouterLink>
          </div>
          <div class="teaser-visual">
            <div class="consultation-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h6"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="values-section">
      <div class="container">
        <h2 class="section-title">{{ t('about.values') }}</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">🌱</div>
            <h3>{{ t('values.sustainable') }}</h3>
            <p>{{ t('values.sustainableDesc') }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🤝</div>
            <h3>{{ t('values.community') }}</h3>
            <p>{{ t('values.communityDesc') }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">✨</div>
            <h3>{{ t('values.quality') }}</h3>
            <p>{{ t('values.qualityDesc') }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">🌍</div>
            <h3>{{ t('values.heritage') }}</h3>
            <p>{{ t('values.heritageDesc') }}</p>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProducts } from '@/composables/useProducts'
import ProductCard from '@/components/ProductCard.vue'
import PageHero from '@/components/PageHero.vue'
import { heroImages } from '@/constants/heroImages'

const { locale, t } = useI18n()
const { getProductsByCategory } = useProducts()
const featuredProducts = computed(() => getProductsByCategory('all').slice(0, 4))
</script>

<style scoped>
/* Where Language Meets the Land */
.language-meets-land { padding: var(--space-xl) 0; background: white; }
.land-title { font-family: Georgia, 'Times New Roman', serif; font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; color: var(--earth-900); text-align: center; margin: 0 0 0.25rem; line-height: 1.2; }
.land-title-line { display: block; }
.land-underline { display: flex; justify-content: center; gap: 0; margin: 0 auto var(--space-lg); width: 120px; height: 4px; }
.land-underline::before { content: ''; width: 60px; height: 4px; background: var(--deep-forest); border-radius: 2px; }
.land-underline::after { content: ''; width: 60px; height: 4px; background: #c4a574; border-radius: 2px; }
.land-intro { max-width: 720px; margin: 0 auto var(--space-xl); text-align: center; color: var(--earth-700); font-size: 1rem; line-height: 1.65; }
.land-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: var(--space-lg); max-width: 900px; margin: 0 auto; }
.land-card { background: white; padding: var(--space-lg); border-radius: var(--border-radius); box-shadow: var(--shadow-soft); border: 1px solid rgba(15,23,42,0.06); }
.land-card-icon { width: 52px; height: 52px; border-radius: var(--border-radius); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-md); color: white; }
.land-card-icon--green { background: var(--deep-forest); }
.land-card-icon--tan { background: #c4a574; }
.land-card-title { font-size: 1.2rem; font-weight: 700; color: var(--earth-900); margin: 0 0 var(--space-sm); }
.land-card-desc { font-size: 0.95rem; color: var(--earth-600); line-height: 1.6; margin: 0; }

.featured-products, .values-section { padding: var(--space-xl) 0; }
.section-title { text-align: center; margin-bottom: var(--space-sm); }
.section-subtitle { text-align: center; color: var(--earth-600); margin-bottom: var(--space-lg); }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr)); gap: var(--space-lg); margin-bottom: var(--space-lg); }
.cta-center { text-align: center; }
.consultation-teaser {
  position: relative;
  padding: var(--space-xl) 0;
  background-size: cover;
  background-position: center;
  background-color: var(--deep-forest);
}
.consultation-teaser-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, rgba(4, 120, 87, 0.88) 0%, rgba(15, 23, 42, 0.78) 100%);
}
.consultation-teaser-inner { position: relative; z-index: 1; }
.teaser-content { display: flex; align-items: center; justify-content: space-between; gap: var(--space-lg); flex-wrap: wrap; }
.teaser-text { flex: 1 1 280px; min-width: 0; color: white; }
.teaser-text h2 { color: white; margin-bottom: var(--space-sm); }
.teaser-text p { color: rgba(255, 255, 255, 0.92); margin: 0 0 var(--space-sm); }
.teaser-description { color: rgba(255, 255, 255, 0.9); margin: var(--space-sm) 0 var(--space-md); line-height: 1.6; }
.btn-teaser {
  background: white;
  color: var(--deep-forest);
  border: 2px solid white;
  padding: 0.65rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-teaser:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2); background: var(--warm-white); }
.consultation-icon {
  width: 120px;
  height: 120px;
  color: rgba(255, 255, 255, 0.95);
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));
}
.consultation-icon svg { width: 100%; height: 100%; display: block; }
.values-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-lg); margin-top: var(--space-md); }
.value-card { background: white; padding: var(--space-lg); border-radius: var(--border-radius); box-shadow: var(--shadow-soft); text-align: center; }
.value-icon { font-size: 2.5rem; margin-bottom: var(--space-sm); }
.value-card h3 { margin-bottom: 0.5rem; }
.value-card p { color: var(--earth-600); font-size: 0.95rem; margin: 0; }
</style>
