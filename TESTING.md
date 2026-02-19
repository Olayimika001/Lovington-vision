# Smoke test checklist (Phase 7)

Run through this list to verify full functionality after setup or changes.

## Build

- [ ] `npm run build` completes without errors
- [ ] `npm run preview` serves the built app

## Navigation & routes

- [ ] **Home** (`/`) – hero, featured products, consultation teaser, values section
- [ ] **Shop** (`/shop`) – category sidebar, product grid, category filter works
- [ ] **Consultation** (`/consultation`) – how-it-works, services, availability block, “Book a Session” opens modal
- [ ] **About** (`/about`) – farm, cultural bridge, mission, values
- [ ] **Contact** (`/contact`) – contact info, form
- [ ] **Checkout** (`/checkout`) – empty state when cart empty; with items: form + order summary
- [ ] **Privacy** (`/privacy`) – legal content
- [ ] **Terms** (`/terms`) – legal content

## i18n

- [ ] Switch language **EN** ↔ **YO** in nav; copy updates
- [ ] Locale persists after refresh (localStorage)

## Currency

- [ ] Change currency (USD / GBP / EUR / NGN) in nav; prices update across Shop, Cart, Checkout, Consultation
- [ ] Currency persists after refresh (localStorage)

## Cart

- [ ] **Add to cart** from Home or Shop; cart badge updates
- [ ] Open cart sidebar (nav cart button); items listed with quantity and totals
- [ ] **Increase / decrease** quantity in sidebar
- [ ] **Remove** item from cart
- [ ] Close sidebar (overlay or ✕)

## Checkout flow

- [ ] With items in cart, go to Checkout; fill shipping form; **Place order**
- [ ] Success message; cart empty; link to Shop works

## Contact & newsletter

- [ ] **Contact** – submit form; success message
- [ ] **Footer** – newsletter email + Subscribe; success message

## Consultation flow

- [ ] Click **Book a Session** on a service; modal opens
- [ ] Select day and time; fill name, email, phone, country, message; **Confirm Booking**
- [ ] Success state; Close closes modal

## Responsive & a11y

- [ ] **Mobile** (e.g. &lt; 968px): hamburger menu opens/closes; overlay click closes menu
- [ ] **Cart** on small screen: sidebar full width
- [ ] **Skip to main content** (Tab from top): skip link receives focus and moves focus to main

## Cleanup (Phase 7.28)

- [ ] No Nuxt references (`NuxtLink`, `useState`, `~/`, `#imports`) in `src/`
- [ ] All imports use `@/` alias for `src/`; build and dev work
