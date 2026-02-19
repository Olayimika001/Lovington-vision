<template>
  <div class="not-found-page">
    <div class="container not-found-content">
      <h1>{{ t('error.notFound') }}</h1>
      <p>{{ t('error.description') }}</p>
      <div class="not-found-actions">
        <RouterLink to="/" class="btn btn-primary">{{ t('error.backHome') }}</RouterLink>
        <RouterLink to="/shop" class="btn btn-secondary">{{ t('error.goShop') }}</RouterLink>
        <RouterLink to="/consultation" class="btn btn-secondary">{{ t('error.goConsultation') }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.not-found-page { padding: var(--space-xl) var(--space-md); min-height: 50vh; display: flex; align-items: center; }
.not-found-content { max-width: 480px; margin: 0 auto; text-align: center; }
.not-found-content h1 { margin-bottom: var(--space-sm); }
.not-found-content p { color: var(--earth-600); margin-bottom: var(--space-lg); line-height: 1.6; }
.not-found-actions { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
</style>
