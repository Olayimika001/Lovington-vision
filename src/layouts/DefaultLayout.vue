<template>
  <div class="app-layout">
    <a href="#main-content" class="skip-link">{{ t('a11y.skipToContent') }}</a>
    <Navigation />
    <main id="main-content" class="main-content" tabindex="-1">
      <slot />
    </main>
    <Footer />
    <CartSidebar />
    <ScrollToTop />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import CartSidebar from '@/components/CartSidebar.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

const { t } = useI18n()
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
.skip-link {
  position: absolute;
  top: -3.5rem;
  left: var(--space-md);
  z-index: 9999;
  padding: 0.75rem 1.25rem;
  background: var(--primary);
  color: var(--cream);
  font-weight: 600;
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: top 0.2s ease;
}
.skip-link:focus-visible {
  top: var(--space-md);
  outline: none;
  box-shadow: var(--focus-ring);
}
.main-content {
  flex: 1;
}
</style>
