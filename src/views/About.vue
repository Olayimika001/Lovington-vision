<template>
  <div class="about-page">
    <PageHero
      :image="heroImages.about"
      :title="t('about.title')"
      :description="t('about.subtitle')"
      :secondary-cta-text="t('nav.contact')"
      secondary-cta-to="/contact"
    />

    <div class="container about-content">
      <section class="about-section" aria-labelledby="farm-heading">
        <h2 id="farm-heading" class="about-heading">{{ t('about.farmTitle') }}</h2>
        <div class="about-prose">
          <p>{{ t('about.farmText') }}</p>
          <p>{{ t('about.farmText2') }}</p>
        </div>
      </section>

      <section class="about-section" aria-labelledby="consult-heading">
        <h2 id="consult-heading" class="about-heading">{{ t('about.consultTitle') }}</h2>
        <div class="about-prose">
          <p>{{ t('about.consultText') }}</p>
          <p>{{ t('about.consultText2') }}</p>
        </div>
      </section>

      <section class="about-section" aria-labelledby="mission-heading">
        <h2 id="mission-heading" class="about-heading">{{ t('about.missionTitle') }}</h2>
        <div class="about-prose">
          <p>{{ t('about.missionText1') }}</p>
          <p>{{ t('about.missionText2') }}</p>
        </div>
      </section>

      <section class="values-section" aria-labelledby="values-heading">
        <h2 id="values-heading" class="about-heading values-heading">{{ t('about.values') }}</h2>
        <div class="values-grid">
          <article class="value-card" v-for="value in values" :key="value.titleKey">
            <div class="value-icon" aria-hidden="true">{{ value.icon }}</div>
            <h3>{{ t(value.titleKey) }}</h3>
            <p>{{ t(value.descKey) }}</p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/PageHero.vue'
import { heroImages } from '@/constants/heroImages'

const { t } = useI18n()

const values = [
  { icon: '🌱', titleKey: 'values.sustainable', descKey: 'values.sustainableDesc' },
  { icon: '🤝', titleKey: 'values.community', descKey: 'values.communityDesc' },
  { icon: '✨', titleKey: 'values.quality', descKey: 'values.qualityDesc' },
  { icon: '🌍', titleKey: 'values.heritage', descKey: 'values.heritageDesc' }
]
</script>

<style scoped>
.about-content {
  padding: var(--space-xl) var(--space-md);
  max-width: 820px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.about-section {
  margin-bottom: var(--space-xl);
  scroll-margin-top: 5rem;
}

.about-heading {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: var(--earth-900);
  margin: 0 0 var(--space-md);
  line-height: 1.3;
}

.about-prose {
  color: var(--earth-700);
  line-height: 1.75;
  font-size: clamp(0.9375rem, 1.5vw, 1rem);
}

.about-prose p {
  margin: 0 0 var(--space-md);
}

.about-prose p:last-child {
  margin-bottom: 0;
}

/* Values */
.values-section {
  margin-top: var(--space-xl);
  margin-bottom: 0;
}

.values-heading {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  margin-top: 0;
}

.value-card {
  background: var(--sand);
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  text-align: center;
  border: 1px solid rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 160px;
}

.value-icon {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  margin-bottom: var(--space-sm);
  line-height: 1;
}

.value-card h3 {
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 600;
  color: var(--earth-900);
  margin: 0 0 0.35rem;
}

.value-card p {
  font-size: clamp(0.8125rem, 1.2vw, 0.9rem);
  color: var(--earth-600);
  margin: 0;
  line-height: 1.5;
  flex: 1;
}

/* Responsive */
@media (max-width: 992px) {
  .about-content {
    padding: var(--space-lg) var(--space-md);
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }

  .value-card {
    min-height: 140px;
  }
}

@media (max-width: 768px) {
  .about-content {
    padding: var(--space-lg) var(--space-sm);
  }

  .about-section {
    margin-bottom: var(--space-lg);
  }

  .about-heading {
    margin-bottom: var(--space-sm);
  }

  .about-prose p {
    margin-bottom: var(--space-sm);
  }

  .values-section {
    margin-top: var(--space-lg);
  }

  .values-heading {
    margin-bottom: var(--space-md);
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .value-card {
    min-height: auto;
    padding: var(--space-md);
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
    gap: var(--space-md);
  }

  .value-icon {
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .value-card h3 {
    margin-bottom: 0.25rem;
  }
}

@media (max-width: 480px) {
  .about-content {
    padding: var(--space-md) var(--space-sm);
  }

  .about-prose {
    font-size: 0.9375rem;
  }
}
</style>
