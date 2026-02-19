import { createRouter, createWebHistory } from 'vue-router'

const DEFAULT_TITLE = 'Lovington Vision Int. Ltd — Yoruba Language Consulting & Sustainable Agriculture'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue'), meta: { layout: 'default', title: 'Home' } },
  { path: '/shop', name: 'Shop', component: () => import('@/views/Shop.vue'), meta: { layout: 'default', title: 'Shop' } },
  { path: '/consultation', name: 'Consultation', component: () => import('@/views/Consultation.vue'), meta: { layout: 'default', title: 'Consultation' } },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue'), meta: { layout: 'default', title: 'About' } },
  { path: '/contact', name: 'Contact', component: () => import('@/views/Contact.vue'), meta: { layout: 'default', title: 'Contact' } },
  { path: '/checkout', name: 'Checkout', component: () => import('@/views/Checkout.vue'), meta: { layout: 'default', title: 'Checkout' } },
  { path: '/privacy', name: 'Privacy', component: () => import('@/views/Privacy.vue'), meta: { layout: 'default', title: 'Privacy' } },
  { path: '/terms', name: 'Terms', component: () => import('@/views/Terms.vue'), meta: { layout: 'default', title: 'Terms' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue'), meta: { layout: 'default', title: 'Page not found' } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  if (typeof document !== 'undefined') {
    document.title = to.meta?.title ? `${to.meta.title} — Lovington Vision Int. Ltd` : DEFAULT_TITLE
  }
})

export default router
