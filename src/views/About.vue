<template>
  <div class="about-page">
    <PageHero
      :image="heroImages.about"
      :title="t('about.title')"
      :description="t('about.subtitle')"
    />

    <div class="container about-content">
      <div class="about-cards">
        <article class="about-card" aria-labelledby="farm-heading">
          <h2 id="farm-heading" class="about-card-title">{{ t('about.farmTitle') }}</h2>
          <div class="about-card-body">
            <p>{{ t('about.farmText') }}</p>
            <p>{{ t('about.farmText2') }}</p>
          </div>
        </article>

        <article class="about-card" aria-labelledby="consult-heading">
          <h2 id="consult-heading" class="about-card-title">{{ t('about.consultTitle') }}</h2>
          <div class="about-card-body">
            <p>{{ t('about.consultText') }}</p>
            <p>{{ t('about.consultText2') }}</p>
          </div>
        </article>

        <article class="about-card" aria-labelledby="mission-heading">
          <h2 id="mission-heading" class="about-card-title">{{ t('about.missionTitle') }}</h2>
          <div class="about-card-body">
            <p>{{ t('about.missionText1') }}</p>
            <p>{{ t('about.missionText2') }}</p>
          </div>
        </article>
      </div>

      <section class="interpreter-section" aria-labelledby="interpreter-heading">
        <h2 id="interpreter-heading" class="visually-hidden">{{ t('about.interpreterTitle') }}</h2>
        <figure class="interpreter-figure">
          <img
            :src="aboutImageSrc"
            alt=""
            class="interpreter-image"
            width="1200"
            height="800"
            loading="lazy"
          />
          <figcaption class="interpreter-caption">
            <h3 class="interpreter-caption-title">{{ t('about.interpreterTitle') }}</h3>
            <p class="interpreter-caption-desc">{{ t('about.interpreterDesc') }}</p>
          </figcaption>
        </figure>
      </section>

      <section class="values-section" aria-labelledby="values-heading">
        <h2 id="values-heading" class="values-heading">{{ t('about.values') }}</h2>
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/PageHero.vue'
import { heroImages } from '@/constants/heroImages'

const { t } = useI18n()

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const aboutImageSrc = computed(() => `${base}/images/about_image.jpeg`)

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
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Main content cards - spread across page */
.about-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.about-card {
  background: var(--cream);
  border-radius: var(--border-radius);
  padding: var(--space-lg);
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(45, 106, 79, 0.1);
  display: flex;
  flex-direction: column;
  scroll-margin-top: 5rem;
}

.about-card-title {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
  font-weight: 700;
  color: var(--text);
  margin: 0 0 var(--space-md);
  line-height: 1.3;
}

.about-card-body {
  color: var(--text-muted);
  line-height: 1.75;
  font-size: clamp(0.9375rem, 1.2vw, 1rem);
  flex: 1;
}

.about-card-body p {
  margin: 0 0 var(--space-md);
}

.about-card-body p:last-child {
  margin-bottom: 0;
}

/* Interpreter section - before Our Values */
.interpreter-section {
  margin-bottom: var(--space-xl);
}
.interpreter-figure {
  margin: 0;
  background: var(--cream);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(45, 106, 79, 0.1);
}
.interpreter-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  object-position: center;
  max-height: 480px;
}
.interpreter-caption {
  padding: var(--space-lg);
  text-align: left;
}
.interpreter-caption-title {
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.35rem);
  font-weight: 700;
  color: var(--text);
  margin: 0 0 var(--space-sm);
  line-height: 1.3;
}
.interpreter-caption-desc {
  font-size: clamp(0.9375rem, 1.2vw, 1rem);
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
}
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

/* Values section */
.values-section {
  margin-top: 0;
  margin-bottom: 0;
}

.values-heading {
  font-family: var(--font-display);
  text-align: center;
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 700;
  color: var(--text);
  margin: 0 0 var(--space-lg);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
}

.value-card {
  background: var(--cream);
  padding: var(--space-lg);
  border-radius: var(--border-radius);
  text-align: center;
  border: 1px solid rgba(45, 106, 79, 0.1);
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 0;
}

.value-icon {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  margin-bottom: var(--space-sm);
  line-height: 1;
}

.value-card h3 {
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 600;
  color: var(--text);
  margin: 0 0 0.35rem;
}

.value-card p {
  font-size: clamp(0.8125rem, 1.2vw, 0.9rem);
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
  flex: 1;
}

/* Responsive */
@media (max-width: 992px) {
  .about-cards {
    grid-template-columns: 1fr;
    gap: var(--space-md);
    margin-bottom: var(--space-xl);
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }
}

@media (max-width: 768px) {
  .about-content {
    padding: var(--space-lg) var(--space-sm);
  }

  .about-cards {
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }

  .about-card {
    padding: var(--space-md);
  }

  .interpreter-section {
    margin-bottom: var(--space-lg);
  }

  .interpreter-caption {
    padding: var(--space-md);
  }

  .values-section {
    margin-top: var(--space-md);
  }

  .values-heading {
    margin-bottom: var(--space-md);
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .value-card {
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
    padding: var(--space-md) var(--space-xs);
  }

  .about-card-body {
    font-size: 0.9375rem;
  }

  .interpreter-section {
    margin-bottom: var(--space-md);
  }

  .interpreter-caption {
    padding: var(--space-sm);
  }

  .interpreter-image {
    max-height: 320px;
  }

  .values-grid {
    gap: var(--space-sm);
  }
}
</style>
