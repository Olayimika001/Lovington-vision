import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isOpen: false
  }),
  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state) =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    shipping: (state) => (state.items.length > 0 ? 5.99 : 0),
    total: (state) => {
      const sub = state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      return sub + (state.items.length > 0 ? 5.99 : 0)
    }
  },
  actions: {
    addItem(product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) existing.quantity++
      else this.items.push({ ...product, quantity: 1 })
      this.isOpen = true
    },
    removeItem(productId) {
      const i = this.items.findIndex((item) => item.id === productId)
      if (i > -1) this.items.splice(i, 1)
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId)
      if (item) {
        item.quantity = Math.max(0, quantity)
        if (item.quantity === 0) this.removeItem(productId)
      }
    },
    toggleCart() {
      this.isOpen = !this.isOpen
    },
    clearCart() {
      this.items = []
    }
  },
  persist: true
})
