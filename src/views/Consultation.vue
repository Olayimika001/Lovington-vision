<template>
  <div class="consultation-page">
    <PageHero
      :image="heroImages.consultation"
      :title="t('consultation.title')"
      :description="t('consultation.subtitle')"
    />

    <div class="container consultation-content">
      <section id="how-it-works" class="consultation-section how-it-works-section" aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading" class="section-heading">{{ t('policies.howConsultationWorksTitle') }}</h2>
        <p class="section-intro">{{ t('policies.howConsultationWorksCopy') }}</p>
        <ol class="how-it-works-steps" start="1">
          <li v-for="(step, index) in howItWorksSteps" :key="index" class="step">
            <span class="step-num" aria-hidden="true">{{ index + 1 }}</span>
            <div class="step-content">
              <h3>{{ t(`howItWorks.step${index + 1}Title`) }}</h3>
              <p>{{ t(`howItWorks.step${index + 1}Desc`) }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="consultation-section services-section" aria-labelledby="services-heading">
        <h2 id="services-heading" class="section-heading">{{ t('consultation.coreServicesTitle') }}</h2>
        <div class="core-services-list">
          <article
            v-for="service in coreServices"
            :key="service.key"
            class="core-service-card"
          >
            <h3 class="core-service-title">{{ t(`consultation.${service.titleKey}`) }}</h3>
            <p v-if="service.deliveryKey" class="core-service-delivery">{{ t(`consultation.${service.deliveryKey}`) }}</p>
            <ul class="core-service-items">
              <li v-for="(item, idx) in serviceItems(service.itemsKey)" :key="idx">{{ item }}</li>
            </ul>
            <button
              type="button"
              class="btn btn-primary core-service-book-btn"
              @click="openBookingModal(service)"
            >
              {{ t('consultation.bookSession') }}
            </button>
          </article>
        </div>
      </section>

      <section id="availability" class="consultation-section availability-section" aria-labelledby="availability-heading">
        <h2 id="availability-heading" class="section-heading">{{ t('consultation.availability') }}</h2>
        <p class="section-intro availability-timezone-note">{{ t('consultation.availabilityTimezoneNote') }}</p>
        <p v-if="availability.length === 0" class="availability-loading">{{ t('consultation.availabilityLoading') }}</p>
        <div v-else class="availability-grid">
          <div v-for="dayOption in availability" :key="dayOption.dateStr" class="day-card">
            <h4 class="day-card-title">{{ locale === 'yo' ? dayOption.dayYo : dayOption.day }}, {{ dayOption.dateLabel }}</h4>
            <div class="time-slots">
              <span v-for="slot in dayOption.slots" :key="slot" class="time-slot">
                {{ formatSlotLabel(slot, localeTag) }}
              </span>
            </div>
            <p v-if="dayOption.slots.length === 0" class="day-no-slots">{{ t('consultation.availabilityLoading') }}</p>
          </div>
        </div>
      </section>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showBookingModal"
          class="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          @click="closeBookingModal"
        >
          <div class="modal-content" @click.stop>
            <button
              type="button"
              class="modal-close"
              :aria-label="t('common.close')"
              @click="closeBookingModal"
            >
              ✕
            </button>

            <template v-if="bookingSubmitted">
              <div class="booking-success">
                <div class="success-icon" aria-hidden="true">✓</div>
                <h2 id="booking-success-title">{{ t('consultationForm.bookingSuccess') }}</h2>
                <p class="booking-success-detail">{{ t('consultationForm.bookingSuccessDetail') }}</p>
                <button type="button" class="btn btn-primary" @click="closeBookingModal">
                  {{ t('common.close') }}
                </button>
              </div>
            </template>
            <template v-else>
              <h2 id="booking-modal-title">{{ t('consultation.bookSession') }}</h2>
              <p v-if="selectedService" class="modal-service-name">{{ t(`consultation.${selectedService.titleKey}`) }}</p>

              <form
                class="booking-form"
                @submit.prevent="submitBooking"
              >
                <div class="form-group">
                  <label for="booking-name">{{ t('consultationForm.fullName') }}</label>
                  <input id="booking-name" v-model="bookingForm.name" type="text" required />
                </div>
                <div class="form-group">
                  <label for="booking-email">{{ t('consultationForm.email') }}</label>
                  <input id="booking-email" v-model="bookingForm.email" type="email" required />
                </div>
                <div class="form-group">
                  <label for="booking-phone">{{ t('consultationForm.phone') }}</label>
                  <input id="booking-phone" v-model="bookingForm.phone" type="tel" required />
                </div>
                <div class="form-group">
                  <label for="booking-day">{{ t('consultationForm.preferredDay') }}</label>
                  <select id="booking-day" v-model="bookingForm.day" required>
                    <option value="">{{ t('consultationForm.selectDay') }}</option>
                    <option
                      v-for="dayOption in availability"
                      :key="dayOption.dateStr"
                      :value="dayOption.dateStr"
                    >
                      {{ locale === 'yo' ? dayOption.dayYo : dayOption.day }}, {{ dayOption.dateLabel }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="booking-time">{{ t('consultationForm.preferredTime') }}</label>
                  <select id="booking-time" v-model="bookingForm.time" required>
                    <option value="">{{ t('consultationForm.selectTime') }}</option>
                    <option
                      v-for="slot in availableSlotsForDay"
                      :key="slot"
                      :value="slot"
                    >
                      {{ formatSlotLabel(slot, localeTag) }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="booking-country">{{ t('consultationForm.yourCountry') }}</label>
                  <select id="booking-country" v-model="bookingForm.country">
                    <option value="">{{ t('consultationForm.countryPlaceholder') }}</option>
                    <option value="NG">{{ t('consultationForm.countryNigeria') }}</option>
                    <option value="GB">{{ t('consultationForm.countryUK') }}</option>
                    <option value="US">{{ t('consultationForm.countryUS') }}</option>
                    <option value="OTHER">{{ t('consultationForm.countryOther') }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="booking-message">{{ t('consultationForm.messageOptional') }}</label>
                  <textarea id="booking-message" v-model="bookingForm.message" rows="4" placeholder=" "></textarea>
                </div>
                <button type="submit" class="btn btn-primary submit-btn">
                  {{ t('consultationForm.confirmBooking') }}
                </button>
              </form>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConsultation } from '@/composables/useConsultation'
import PageHero from '@/components/PageHero.vue'
import { heroImages } from '@/constants/heroImages'

const { locale, t } = useI18n()
const { availability, formatSlotLabel } = useConsultation()

const localeTag = computed(() => (locale.value === 'yo' ? 'en-NG' : 'en'))

const howItWorksSteps = [1, 2, 3, 4]

const coreServices = [
  { key: 'service1', titleKey: 'service1Title', deliveryKey: 'service1Delivery', itemsKey: 'service1Items' },
  { key: 'service2', titleKey: 'service2Title', deliveryKey: null, itemsKey: 'service2Items' },
  { key: 'service3', titleKey: 'service3Title', deliveryKey: null, itemsKey: 'service3Items' }
]

function serviceItems(itemsKey) {
  const text = t(`consultation.${itemsKey}`)
  if (!text || text === itemsKey) return []
  return text.split('\n').map((s) => s.trim()).filter(Boolean)
}

const showBookingModal = ref(false)
const selectedService = ref(null)
const bookingSubmitted = ref(false)
const bookingForm = reactive({
  name: '',
  email: '',
  phone: '',
  day: '',
  time: '',
  country: '',
  message: ''
})

const availableSlotsForDay = computed(() => {
  if (!bookingForm.day) return []
  const dayOption = availability.value.find((d) => d.dateStr === bookingForm.day)
  return dayOption ? dayOption.slots : []
})

function openBookingModal(service) {
  selectedService.value = service
  showBookingModal.value = true
}

function closeBookingModal() {
  showBookingModal.value = false
  selectedService.value = null
  bookingSubmitted.value = false
  bookingForm.name = ''
  bookingForm.email = ''
  bookingForm.phone = ''
  bookingForm.day = ''
  bookingForm.time = ''
  bookingForm.country = ''
  bookingForm.message = ''
}

function submitBooking() {
  bookingSubmitted.value = true
}
</script>

<style scoped>
.consultation-content {
  padding: var(--space-xl) var(--space-md);
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.consultation-section {
  margin-bottom: var(--space-xl);
  scroll-margin-top: 5rem;
  width: 100%;
}

.section-heading {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 var(--space-md);
  text-align: center;
}

.section-intro {
  color: var(--earth-600);
  font-size: 1rem;
  line-height: 1.6;
  text-align: center;
  max-width: 560px;
  margin: 0 auto var(--space-lg);
}

/* How it works */
.how-it-works-section .section-intro {
  margin-bottom: var(--space-md);
}

.how-it-works-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  align-items: stretch;
}

.step {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  align-items: center;
  text-align: center;
  background: white;
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(15, 23, 42, 0.06);
  min-height: 160px;
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--accent);
  color: var(--text);
  border-radius: 50%;
  font-weight: 700;
  flex-shrink: 0;
  font-size: 1.15rem;
}

.step-content h3 {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
  color: var(--earth-900);
}

.step-content p {
  margin: 0;
  color: var(--earth-600);
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 992px) {
  .how-it-works-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .how-it-works-steps {
    grid-template-columns: 1fr;
  }

  .step {
    min-height: auto;
  }
}

/* Core Services - 3 in a row */
.core-services-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-top: var(--space-md);
  align-items: stretch;
}

.core-service-card {
  background: white;
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(15, 23, 42, 0.06);
  text-align: left;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.core-service-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 var(--space-sm);
  line-height: 1.3;
}

.core-service-delivery {
  font-size: 0.85rem;
  color: var(--earth-600);
  margin: 0 0 var(--space-sm);
  font-style: italic;
}

.core-service-items {
  margin: 0 0 var(--space-md);
  padding-left: 1.25rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.55;
  flex: 1;
}

.core-service-items li {
  margin-bottom: 0.35rem;
}

.core-service-items li:last-child {
  margin-bottom: 0;
}

.core-service-book-btn {
  width: 100%;
  margin-top: auto;
  padding: 0.65rem 1rem;
  font-size: 0.9rem;
}

@media (max-width: 992px) {
  .core-services-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .core-services-list {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .core-service-card {
    padding: var(--space-md);
  }

  .core-service-title {
    font-size: 1.05rem;
  }
}

/* Availability */
.availability-timezone-note {
  margin-bottom: var(--space-lg);
}

.availability-loading {
  text-align: center;
  color: var(--earth-500);
  font-size: 0.9375rem;
  margin: 0;
}

.availability-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  align-items: stretch;
  width: 100%;
}

.day-card {
  background: white;
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-soft);
  border-left: 4px solid var(--harvest-gold);
  display: flex;
  flex-direction: column;
  min-height: 140px;
}

.day-card-title {
  margin: 0 0 var(--space-sm);
  color: var(--earth-900);
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  font-weight: 600;
  line-height: 1.3;
}

.time-slots {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.time-slot {
  padding: 0.5rem 0.75rem;
  background: var(--sand);
  border-radius: var(--border-radius);
  font-size: clamp(0.8125rem, 1vw, 0.9rem);
  text-align: center;
  color: var(--earth-700);
}

.day-no-slots {
  margin: 0;
  font-size: 0.875rem;
  color: var(--earth-500);
}

@media (max-width: 992px) {
  .availability-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }

  .day-card {
    min-height: 120px;
    padding: var(--space-md);
  }
}

@media (max-width: 576px) {
  .availability-grid {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .day-card {
    min-height: auto;
    padding: var(--space-md);
  }
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: var(--space-md);
}

.modal-content {
  background: var(--warm-white);
  border-radius: var(--border-radius);
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--space-lg);
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.modal-close {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: var(--earth-600);
  padding: 0.25rem;
}

.modal-close:hover {
  color: var(--clay-terracotta);
}

.modal-content h2 {
  margin: 0 0 var(--space-sm);
  color: var(--earth-900);
  font-size: 1.35rem;
}

.modal-service-name {
  margin: 0 0 var(--space-lg);
  color: var(--leaf-green);
  font-size: 1.1rem;
  font-weight: 600;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.booking-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.booking-form .form-group label {
  font-weight: 600;
  color: var(--earth-800);
  font-size: 0.9rem;
}

.booking-form .form-group input,
.booking-form .form-group select,
.booking-form .form-group textarea {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--earth-400);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: 1rem;
}

.submit-btn {
  margin-top: var(--space-sm);
  padding: 0.75rem 1rem;
}

.booking-success {
  text-align: center;
  padding: var(--space-md) 0;
}

.booking-success .success-icon {
  font-size: 3rem;
  color: var(--leaf-green);
  margin-bottom: var(--space-md);
  line-height: 1;
}

.booking-success h2 {
  margin-bottom: var(--space-sm);
  font-size: 1.25rem;
}

.booking-success-detail {
  color: var(--earth-600);
  margin-bottom: var(--space-lg);
  line-height: 1.6;
  font-size: 0.95rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.96);
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.25s ease;
}
</style>
