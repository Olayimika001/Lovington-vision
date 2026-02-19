<template>
  <div class="legal-page">
    <PageHero
      :image="heroImages.legal"
      :title="t('footer.terms')"
      :description="t('legal.termsIntro')"
    />
    <div class="container legal-content">
      <p>{{ t('legal.termsPlaceholder') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '@/components/PageHero.vue'
import { heroImages } from '@/constants/heroImages'

const { t } = useI18n()
</script>

<style scoped>
.legal-content { padding: var(--space-xl) var(--space-md); max-width: 720px; margin: 0 auto; }
.legal-content p { color: var(--earth-700); line-height: 1.7; }
</style>
