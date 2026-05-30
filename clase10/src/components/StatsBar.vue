<template>
  <div class="stats">
    <div v-for="(stat, i) in stats" :key="i" class="stat">
      <span class="stat__value">{{ stat.value }}</span>
      <span class="stat__label">{{ lang === 'es' ? stat.es : stat.en }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ lang: String })

const stats = [
  { value: '10', es: 'Habitaciones', en: 'Rooms' },
  { value: '200m', es: 'De la plaza', en: 'From the square' },
  { value: '24h', es: 'Recepción', en: 'Reception' },
  { value: '★★', es: 'Estilo colonial', en: 'Colonial style' },
]
</script>

<style lang="scss" scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--forest);
  color: white;
  text-align: center;
}

.stat {
  padding: clamp(1.5rem, 4vw, 2.25rem) 1rem;
  border-right: 1px solid rgba(255,255,255,0.12);
  &:last-child { border-right: none; }

  &__value {
    display: block;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 0.4rem;
  }

  &__label {
    font-size: clamp(0.68rem, 1.8vw, 0.78rem);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.85;
  }
}

@media (max-width: 640px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
  .stat:nth-child(2) { border-right: none; }
  .stat { border-bottom: 1px solid rgba(255,255,255,0.12); }
}
</style>
