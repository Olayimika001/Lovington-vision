<template>
  <div class="contact-page">
    <PageHero
      :image="heroImages.contact"
      :title="t('nav.contact')"
      :description="t('contact.intro')"
      :primary-cta-text="t('contact.sendMessage')"
      primary-cta-to="#contact-form"
    />
    <div id="contact-form" class="container contact-wrap">
      <div class="contact-grid">
        <aside class="contact-info-card">
          <h2 class="contact-info-title">{{ t('contact.getInTouch') }}</h2>
          <p class="contact-info-intro">{{ t('contact.intro') }}</p>
          <div class="contact-details">
            <div class="contact-detail-row">
              <span class="contact-detail-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <div class="contact-detail-text">
                <strong class="contact-detail-label">{{ t('contact.location') }}:</strong>
                <span class="contact-detail-value">{{ t('contact.addressFull') }}</span>
              </div>
            </div>
            <div class="contact-detail-divider" aria-hidden="true"></div>
            <div class="contact-detail-row">
              <span class="contact-detail-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <div class="contact-detail-text">
                <strong class="contact-detail-label">{{ t('contact.email') }}:</strong>
                <span class="contact-detail-value">info@lovingtonvision.com</span>
              </div>
            </div>
            <div class="contact-detail-divider" aria-hidden="true"></div>
            <div class="contact-detail-row">
              <span class="contact-detail-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <div class="contact-detail-text">
                <strong class="contact-detail-label">{{ t('contact.call') }}:</strong>
                <span class="contact-detail-value">+234 123 456 7890</span>
              </div>
            </div>
          </div>
        </aside>
        <div class="contact-form-block">
          <p v-if="submitted" class="success-message">{{ t('contact.successMessage') }}</p>
          <form v-else class="contact-form" @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label for="contact-name" class="visually-hidden">{{ t('contact.yourName') }}</label>
                <input id="contact-name" v-model="form.name" type="text" :placeholder="t('contact.yourName')" required />
              </div>
              <div class="form-group">
                <label for="contact-email" class="visually-hidden">{{ t('contact.yourEmail') }}</label>
                <input id="contact-email" v-model="form.email" type="email" :placeholder="t('contact.yourEmail')" required />
              </div>
            </div>
            <div class="form-group">
              <label for="contact-subject" class="visually-hidden">{{ t('contact.subject') }}</label>
              <input id="contact-subject" v-model="form.subject" type="text" :placeholder="t('contact.subject')" required />
            </div>
            <div class="form-group">
              <label for="contact-message" class="visually-hidden">{{ t('contact.message') }}</label>
              <textarea id="contact-message" v-model="form.message" rows="5" :placeholder="t('contact.message')" required></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary btn-send">{{ t('contact.submitBtn') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/PageHero.vue'
import { heroImages } from '@/constants/heroImages'

const { t } = useI18n()
const submitted = ref(false)
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

function submitForm() {
  submitted.value = true
}
</script>

<style scoped>
.contact-wrap { padding: var(--space-xl) var(--space-md); }
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  max-width: 960px;
  margin: 0 auto;
  align-items: start;
}

/* Left: Get in touch card */
.contact-info-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--earth-400);
  padding: var(--space-lg);
}
.contact-info-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--earth-900);
  margin: 0 0 var(--space-sm);
}
.contact-info-intro {
  font-size: 0.9375rem;
  color: var(--earth-600);
  line-height: 1.6;
  margin: 0 0 var(--space-lg);
}
.contact-details { display: flex; flex-direction: column; }
.contact-detail-row {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}
.contact-detail-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--leaf-green);
}
.contact-detail-text { display: flex; flex-direction: column; gap: 0.25rem; }
.contact-detail-label { font-size: 0.9375rem; color: var(--earth-900); font-weight: 600; }
.contact-detail-value { font-size: 0.9375rem; color: var(--earth-600); }
.contact-detail-divider {
  height: 1px;
  background: var(--earth-400);
  margin: var(--space-sm) 0;
}

/* Right: Form */
.contact-form-block { min-width: 0; }
.success-message {
  color: var(--leaf-green);
  font-weight: 600;
  padding: var(--space-md);
  background: var(--sand);
  border-radius: var(--border-radius);
}
.contact-form { display: flex; flex-direction: column; gap: var(--space-md); }
.contact-form .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}
.contact-form .form-group { margin: 0; }
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--earth-400);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: 1rem;
  background: white;
}
.contact-form input::placeholder,
.contact-form textarea::placeholder { color: var(--earth-500); }
.contact-form textarea { resize: vertical; min-height: 120px; }
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.form-actions {
  display: flex;
  justify-content: center;
  margin-top: var(--space-md);
}
.btn-send {
  padding: 0.65rem 2rem;
  font-weight: 600;
  background: var(--deep-forest);
  border-color: var(--deep-forest);
}
.btn-send:hover { background: var(--earth-900); border-color: var(--earth-900); }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
  .contact-form .form-row { grid-template-columns: 1fr; }
}
</style>
