<template>
  <button
    type="button"
    class="scroll-to-top-float"
    aria-label="Scroll to top"
    @click="scrollToTop"
  >
    ↑
  </button>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.scroll-to-top-float {
  position: fixed;
  bottom: var(--space-lg);
  right: var(--space-lg);
  z-index: 900;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--text);
  border: none;
  font-size: 1.35rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  box-shadow: var(--shadow-strong);
}
.scroll-to-top-float:hover {
  background: var(--accent-dark);
  transform: translateY(-2px);
}
.scroll-to-top-float:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(244, 168, 0, 0.5);
}
@media (max-width: 480px) {
  .scroll-to-top-float {
    bottom: var(--space-md);
    right: var(--space-md);
    width: 44px;
    height: 44px;
    font-size: 1.2rem;
  }
}
</style>
