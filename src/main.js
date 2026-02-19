import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import en from './locales/en.json'
import yo from './locales/yo.json'
import './assets/css/main.css'

const savedLocale = typeof localStorage !== 'undefined' ? localStorage.getItem('yoruba-farm-locale') : null
const i18n = createI18n({
  legacy: false,
  locale: savedLocale === 'yo' || savedLocale === 'en' ? savedLocale : 'en',
  fallbackLocale: 'en',
  messages: { en, yo }
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
