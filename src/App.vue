<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const { locale } = useI18n()

// Set <html lang> from i18n locale for accessibility and i18n
watch(
  locale,
  (newLocale) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale === 'yo' ? 'yo' : 'en'
    }
  },
  { immediate: true }
)
</script>
