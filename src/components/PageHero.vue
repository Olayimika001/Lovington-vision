<template>
  <section
    class="page-hero"
    :style="bgStyle"
  >
    <div class="page-hero-overlay" aria-hidden="true"></div>
    <div class="container page-hero-content">
      <p v-if="subtitle" class="page-hero-subtitle">{{ subtitle }}</p>
      <h1 class="page-hero-title">
        <template v-if="titleHighlightWords && titleHighlightWords.length">
          <span v-for="(part, i) in titleParts" :key="i" :class="{ 'page-hero-title-accent': part.highlight }">{{ part.text }}</span>
        </template>
        <template v-else>{{ title }}</template>
      </h1>
      <p v-if="description" class="page-hero-description">{{ description }}</p>
      <div v-if="primaryCtaText || secondaryCtaText" class="page-hero-cta">
        <RouterLink
          v-if="primaryCtaText"
          :to="primaryCtaTo"
          class="btn btn-hero-primary"
        >
          {{ primaryCtaText }}
        </RouterLink>
        <RouterLink
          v-if="secondaryCtaText"
          :to="secondaryCtaTo"
          class="btn btn-hero-secondary"
        >
          {{ secondaryCtaText }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  image: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  title: { type: String, required: true },
  /** Words in title to highlight with accent color (e.g. ['Culture', 'Nature']) */
  titleHighlightWords: { type: Array, default: () => [] },
  description: { type: String, default: '' },
  primaryCtaText: { type: String, default: '' },
  primaryCtaTo: { type: String, default: '/' },
  secondaryCtaText: { type: String, default: '' },
  secondaryCtaTo: { type: String, default: '/' },
})

const bgStyle = computed(() =>
  props.image
    ? { backgroundImage: `url(${props.image})` }
    : {}
)

function splitByHighlightWords(text, words) {
  if (!text || !words.length) return [{ text, highlight: false }]
  const parts = []
  let remaining = text
  for (const word of words) {
    const i = remaining.indexOf(word)
    if (i === -1) continue
    if (i > 0) parts.push({ text: remaining.slice(0, i), highlight: false })
    parts.push({ text: word, highlight: true })
    remaining = remaining.slice(i + word.length)
  }
  if (remaining) parts.push({ text: remaining, highlight: false })
  return parts.length ? parts : [{ text, highlight: false }]
}

const titleParts = computed(() =>
  splitByHighlightWords(props.title, props.titleHighlightWords || [])
)
</script>

<style scoped>
.page-hero {
  position: relative;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-color: var(--deep-forest);
}
.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(4, 120, 87, 0.82) 0%,
    rgba(15, 23, 42, 0.72) 100%
  );
}
.page-hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: var(--space-xl) var(--space-md);
  max-width: 820px;
  margin: 0 auto;
}
.page-hero-subtitle {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.88);
  margin: 0 0 var(--space-sm);
}
.page-hero-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1.85rem, 4.5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 var(--space-md);
  color: white;
}
.page-hero-title-accent {
  color: #d4a574;
}
.page-hero-description {
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
  margin: 0 0 var(--space-lg);
}
.page-hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-hero-primary {
  background: var(--deep-forest);
  color: white;
  border: 2px solid var(--deep-forest);
  padding: 0.65rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}
.btn-hero-secondary {
  background: white;
  color: var(--deep-forest);
  border: 2px solid var(--deep-forest);
  padding: 0.65rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-hero-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}
</style>
