<template>
  <footer class="site-footer">
    <!-- 1. Newsletter strip (light background) -->
    <section class="footer-newsletter-strip">
      <div class="container newsletter-inner">
        <div class="newsletter-text">
          <h2 class="newsletter-title">{{ t('footer.newsletter').toUpperCase() }}</h2>
          <p class="newsletter-desc">{{ t('footer.newsletterDesc') }}</p>
        </div>
        <div class="newsletter-form-wrap">
          <p v-if="newsletterSubmitted" class="newsletter-success">{{ t('footer.newsletterSuccess') }}</p>
          <form v-else class="newsletter-form" @submit.prevent="submitNewsletter">
            <input
              v-model="newsletterEmail"
              type="email"
              :placeholder="t('footer.emailPlaceholder')"
              required
              class="newsletter-input"
            />
            <button type="submit" class="btn-newsletter">{{ t('footer.subscribe') }}</button>
          </form>
        </div>
      </div>
    </section>

    <!-- 2. Main footer (dark, multi-column) -->
    <div class="footer-main">
      <div class="container footer-content">
        <div class="footer-col footer-company">
          <h3 class="footer-brand">{{ t('brand.name') }}</h3>
          <p class="footer-address">{{ t('contact.addressLine1') }}<br />{{ t('contact.addressLine2') }}</p>
          <p class="footer-contact"><strong>{{ t('contact.phone') }}</strong> +234 123 456 7890</p>
          <p class="footer-contact"><strong>{{ t('contact.email') }}</strong> info@lovingtonvision.com</p>
        </div>
        <div class="footer-col">
          <h4 class="footer-col-title">{{ t('footer.usefulLinks') }}</h4>
          <ul class="footer-list">
            <li><RouterLink to="/">{{ t('nav.home') }}</RouterLink></li>
            <li><RouterLink to="/about">{{ t('nav.about') }}</RouterLink></li>
            <li><RouterLink to="/consultation">{{ t('nav.consultation') }}</RouterLink></li>
            <li><RouterLink to="/terms">{{ t('footer.terms') }}</RouterLink></li>
            <li><RouterLink to="/privacy">{{ t('footer.privacy') }}</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-col-title">{{ t('footer.ourServices') }}</h4>
          <ul class="footer-list">
            <li><RouterLink to="/shop">{{ t('nav.shop') }}</RouterLink></li>
            <li><RouterLink to="/consultation">{{ t('nav.consultation') }}</RouterLink></li>
            <li><RouterLink to="/consultation#how-it-works">{{ t('footer.howConsultationWorks') }}</RouterLink></li>
            <li><RouterLink to="/shop">{{ t('footer.shippingReturns') }}</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-col-title">{{ t('footer.legal') }}</h4>
          <ul class="footer-list">
            <li><RouterLink to="/privacy">{{ t('footer.privacy') }}</RouterLink></li>
            <li><RouterLink to="/terms">{{ t('footer.terms') }}</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 3. Bottom bar: copyright, social, scroll-to-top -->
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <div class="footer-copyright">
          <p>© {{ currentYear }} <strong>{{ t('brand.companyLegal') }}</strong>. {{ t('footer.rights') }}</p>
        </div>
        <div class="footer-social-wrap">
          <div class="social-links">
            <a href="javascript:void(0)" class="social-icon" aria-label="X (Twitter)" :title="t('footer.comingSoon')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="javascript:void(0)" class="social-icon" aria-label="Facebook" :title="t('footer.comingSoon')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="javascript:void(0)" class="social-icon" aria-label="Instagram" :title="t('footer.comingSoon')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="javascript:void(0)" class="social-icon" aria-label="LinkedIn" :title="t('footer.comingSoon')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
          <button
            type="button"
            class="scroll-to-top"
            aria-label="Scroll to top"
            @click="scrollToTop"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
const newsletterEmail = ref('')
const newsletterSubmitted = ref(false)

function submitNewsletter() {
  newsletterSubmitted.value = true
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.site-footer {
  margin-top: auto;
}

/* 1. Newsletter strip - light background */
.footer-newsletter-strip {
  background: var(--warm-white);
  border-top: 1px solid var(--earth-400);
  padding: var(--space-xl) 0;
}
.newsletter-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  flex-wrap: wrap;
  text-align: center;
}
.newsletter-text {
  flex: 0 1 auto;
  min-width: 0;
  max-width: 100%;
}
.newsletter-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--earth-900);
  letter-spacing: 0.02em;
  margin: 0 0 var(--space-sm) 0;
}
.newsletter-desc {
  font-size: 0.95rem;
  color: var(--earth-600);
  margin: 0;
  line-height: 1.5;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
.newsletter-form-wrap {
  flex: 0 1 auto;
}
.newsletter-form {
  display: flex;
  gap: 0;
  align-items: stretch;
  justify-content: center;
}
.newsletter-input {
  padding: 0.75rem 1rem;
  border: 2px solid var(--leaf-green);
  border-right: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
  min-width: 0;
  width: 100%;
  max-width: 420px;
  font-family: inherit;
}
.newsletter-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.2);
}
.btn-newsletter {
  padding: 0.75rem 1.5rem;
  background: var(--leaf-green);
  color: white;
  border: 2px solid var(--leaf-green);
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s, color 0.2s;
}
.btn-newsletter:hover {
  background: var(--deep-forest);
  border-color: var(--deep-forest);
}
.newsletter-success {
  color: var(--leaf-green);
  font-weight: 600;
  margin: 0;
}
@media (min-width: 769px) {
  .newsletter-text { min-width: 280px; }
  .newsletter-input { min-width: 280px; }
}

@media (max-width: 768px) {
  .newsletter-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .newsletter-desc {
    max-width: none;
  }
  .newsletter-form {
    flex-direction: column;
    width: 100%;
    max-width: 420px;
  }
  .newsletter-input {
    border-right: 2px solid var(--leaf-green);
    border-radius: var(--border-radius);
    min-width: 0;
    max-width: none;
  }
  .btn-newsletter {
    border-radius: var(--border-radius);
    border-left: 2px solid var(--leaf-green);
  }
}

/* 2. Main footer - dark background, columns */
.footer-main {
  background: var(--earth-900);
  color: var(--cream);
  padding: var(--space-xl) 0;

}
.footer-content {
  display: grid;
  grid-template-columns: 1.2fr repeat(4, 1fr);
  gap: var(--space-lg);
  justify-items: center;
}
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
.footer-col {
  text-align: center;
}
.footer-col-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--cream);
  margin: 0 0 var(--space-sm) 0;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid var(--leaf-green);
  display: inline-block;
}
.footer-brand {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--cream);
  margin: 0 0 var(--space-md) 0;
}
.footer-address,
.footer-contact {
  font-size: 0.9rem;
  color: var(--earth-400);
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
}
.footer-contact strong {
  color: var(--cream);
}
.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-list li {
  margin-bottom: 0.5rem;
}
.footer-list a {
  color: var(--earth-400);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}
.footer-list a:hover {
  color: var(--leaf-green);
}
.footer-list li::before {
  content: '› ';
  color: var(--leaf-green);
  font-weight: 700;
  margin-right: 0.25rem;
}
.footer-company {
  text-align: center;
}
.social-icon {
  flex-shrink: 0;
}
.social-icon svg {
  display: block;
}

/* 3. Bottom bar */
.footer-bottom {
  background: var(--earth-800);
  padding: var(--space-md) 0;
  border-top: 1px solid var(--earth-700);
  text-align: center;
}
.footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  flex-wrap: wrap;
}
.footer-copyright p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--earth-400);
}
.footer-copyright strong {
  color: var(--cream);
}
.footer-social-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.social-links {
  display: flex;
  gap: 0.5rem;
}
.social-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--leaf-green);
  color: white;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.2s;
}
.social-icon:hover {
  background: var(--deep-forest);
}
.scroll-to-top {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--leaf-green);
  color: white;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
}
.scroll-to-top:hover {
  background: var(--deep-forest);
}
.scroll-to-top:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.5);
}
</style>
