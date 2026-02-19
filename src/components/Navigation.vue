<template>
  <nav class="main-nav">
    <div class="container nav-content">
      <RouterLink to="/" class="logo">
        <!-- <span class="logo-icon">🌾</span> -->
        <span class="logo-text">
          <span class="logo-main">{{ t('brand.name') }}</span>
          <span class="logo-sub">{{ t('footer.tagline') }}</span>
        </span>
      </RouterLink>

      <button
        v-if="mobileMenuOpen"
        type="button"
        class="nav-overlay"
        aria-label="Close menu"
        @click="closeMobileMenu"
      ></button>
      <div class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
        <RouterLink to="/" @click="closeMobileMenu">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/shop" @click="closeMobileMenu">{{ t('nav.shop') }}</RouterLink>
        <RouterLink to="/consultation" @click="closeMobileMenu">{{ t('nav.consultation') }}</RouterLink>
        <RouterLink to="/about" @click="closeMobileMenu">{{ t('nav.about') }}</RouterLink>
        <RouterLink to="/contact" @click="closeMobileMenu">{{ t('nav.contact') }}</RouterLink>
      </div>

      <div class="nav-actions">
        <div class="currency-switcher">
          <select :value="currency" @change="setCurrency($event.target.value)" class="currency-select" :aria-label="t('common.currency')">
            <option value="USD">{{ t('common.currencyUSD') }}</option>
            <option value="GBP">{{ t('common.currencyGBP') }}</option>
            <option value="EUR">{{ t('common.currencyEUR') }}</option>
            <option value="NGN">{{ t('common.currencyNGN') }}</option>
          </select>
        </div>
        <div class="language-switcher">
          <button type="button" @click="switchLocale('en')" :class="{ active: locale === 'en' }" class="lang-btn" aria-label="English">EN</button>
          <button type="button" @click="switchLocale('yo')" :class="{ active: locale === 'yo' }" class="lang-btn" aria-label="Yorùbá">YO</button>
        </div>
        <button type="button" @click="cartStore.toggleCart()" class="cart-btn" :aria-label="t('nav.cart')">
          🛒
          <span v-if="cartStore.itemCount > 0" class="cart-badge">{{ cartStore.itemCount }}</span>
        </button>
        <button type="button" @click="toggleMobileMenu" class="mobile-toggle" aria-label="Toggle menu" :aria-expanded="mobileMenuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { useCurrency } from '@/composables/useCurrency'

const { locale, setLocale, t } = useI18n()
const { currency, setCurrency } = useCurrency()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)

const LOCALE_KEY = 'yoruba-farm-locale'
function switchLocale(newLocale) {
  setLocale(newLocale)
  localStorage.setItem(LOCALE_KEY, newLocale)
}
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.main-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: var(--shadow-soft);
}
.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem var(--space-md);
  gap: 1rem;
  min-height: 64px;
  flex-wrap: nowrap;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
  min-width: 0;
  flex-shrink: 0;
}
.logo:hover { transform: scale(1.02); }
.logo-icon { font-size: 2rem; }
.logo-text { display: flex; flex-direction: column; line-height: 1.2; min-width: 0; }
.logo-main { font-family: var(--font-display); font-size: clamp(1.15rem, 2.5vw, 1.5rem); font-weight: 700; color: var(--earth-900); }
.logo-sub { font-size: 0.7rem; color: var(--earth-600); }
.nav-links {
  display: flex;
  gap: clamp(1rem, 2vw, 2rem);
  align-items: center;
}
.nav-links a {
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  color: var(--earth-700);
  position: relative;
  transition: color 0.3s ease;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--leaf-green);
  transition: width 0.3s ease;
}
.nav-links a:hover,
.nav-links a.router-link-active { color: var(--leaf-green); }
.nav-links a:hover::after,
.nav-links a.router-link-active::after { width: 100%; }
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}
.currency-select {
  padding: 0.5rem 0.6rem;
  border: 1px solid rgba(15, 23, 42, 0.15);
  border-radius: var(--border-radius);
  font-family: var(--font-body);
  font-size: clamp(0.8rem, 1.5vw, 0.85rem);
  background: var(--sand);
  cursor: pointer;
  min-height: 40px;
}
.language-switcher { display: flex; gap: 0.25rem; background: var(--sand); padding: 0.25rem; border-radius: var(--border-radius); }
.lang-btn {
  padding: 0.5rem 0.75rem;
  min-width: 44px;
  min-height: 40px;
  border: none;
  background: transparent;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  color: var(--earth-700);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.lang-btn.active { background: white; color: var(--leaf-green); box-shadow: var(--shadow-soft); }
.cart-btn {
  position: relative;
  background: var(--leaf-green);
  border: none;
  padding: 0.5rem 0.875rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.cart-btn:hover { background: var(--deep-forest); transform: translateY(-2px); }
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--clay-terracotta);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  min-width: 20px;
  text-align: center;
}
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
}
.mobile-toggle span { width: 22px; height: 2.5px; background: var(--earth-700); border-radius: 2px; }
.mobile-toggle:hover span { background: var(--earth-900); }
.nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  z-index: 999;
  border: none;
  cursor: pointer;
  backdrop-filter: blur(2px);
}

@media (max-width: 992px) {
  .nav-overlay { display: block; }
  .nav-links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    z-index: 1000;
    flex-direction: column;
    background: white;
    padding: var(--space-lg);
    gap: 0;
    transform: translateY(-120%);
    transition: transform 0.3s ease;
    box-shadow: var(--shadow-strong);
    max-height: calc(100vh - 64px);
    overflow-y: auto;
  }
  .nav-links a {
    padding: 1rem 0;
    border-bottom: 1px solid var(--earth-400);
    width: 100%;
    text-align: center;
    font-size: 1rem;
  }
  .nav-links a:last-child { border-bottom: none; }
  .nav-links.mobile-open { transform: translateY(0); }
  .mobile-toggle { display: flex; }
  .logo-sub { display: none; }
  .nav-content { gap: 0.5rem; }
}

@media (max-width: 480px) {
  .nav-content { padding: 0.75rem var(--space-sm); min-height: 56px; }
  .nav-links { top: 56px; max-height: calc(100vh - 56px); padding: var(--space-md); }
  .logo-main { font-size: 1.1rem; }
  .currency-select { padding: 0.4rem 0.5rem; font-size: 0.8rem; min-height: 36px; }
  .lang-btn { min-width: 40px; min-height: 36px; padding: 0.4rem; }
  .cart-btn { min-width: 40px; min-height: 40px; padding: 0.5rem; }
  .mobile-toggle { min-width: 40px; min-height: 40px; }
}
</style>
