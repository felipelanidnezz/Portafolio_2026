<template>
  <section class="amenities">
    <div class="amenities__inner">
      <p class="section-tag">{{ lang === 'es' ? 'Comodidades' : 'Amenities' }}</p>
      <h2 class="section-title">{{ lang === 'es' ? 'Todo lo que necesitas' : 'Everything you need' }}</h2>
      <div class="divider"></div>
      <div class="amenities__grid">
        <div v-for="a in items" :key="a.icon" class="amenity">
          <span class="amenity__icon">{{ a.icon }}</span>
          <h3>{{ lang === 'es' ? a.es : a.en }}</h3>
          <p>{{ lang === 'es' ? a.descEs : a.descEn }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ lang: String })

const items = [
  { icon: '☕', es: 'Desayuno incluido', en: 'Breakfast included', descEs: 'Continental cada mañana', descEn: 'Continental every morning' },
  { icon: '📶', es: 'WiFi gratis', en: 'Free WiFi', descEs: 'En habitaciones y zonas comunes', descEn: 'In rooms and common areas' },
  { icon: '🅿️', es: 'Parqueadero', en: 'Parking', descEs: 'Gratuito para huéspedes', descEn: 'Free for guests' },
  { icon: '🍽️', es: 'Restaurante', en: 'Restaurant', descEs: 'Cocina tradicional paisa', descEn: 'Traditional local cuisine' },
  { icon: '🐾', es: 'Pet friendly', en: 'Pet friendly', descEs: 'Mascotas bajo petición', descEn: 'Pets upon request' },
  { icon: '🕐', es: 'Recepción 24h', en: '24h reception', descEs: 'Siempre disponibles para ti', descEn: 'Always available for you' },
  { icon: '🧺', es: 'Lavandería', en: 'Laundry', descEs: 'Servicio de planchado', descEn: 'Ironing service' },
  { icon: '🌿', es: 'Jardín & terraza', en: 'Garden & terrace', descEs: 'Espacios al aire libre', descEn: 'Outdoor spaces' },
]
</script>

<style lang="scss" scoped>
.amenities {
  padding: clamp(3.5rem, 8vw, 5rem) clamp(1.25rem, 4vw, 3rem);
  background: var(--dark);
  color: white;

  &__inner { max-width: 1100px; margin: 0 auto; text-align: center; }
  .section-title { color: white; }
  .divider { margin: 0 auto 2rem; background: linear-gradient(to right, var(--gold), transparent); }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.25rem;
    text-align: center;
  }
}

.amenity {
  padding: 1.5rem 1rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  transition: background 0.2s;

  &:hover { background: rgba(255,255,255,0.09); }

  &__icon { font-size: 2rem; display: block; margin-bottom: 0.65rem; }

  h3 {
    font-size: 1rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    margin-bottom: 0.35rem;
  }

  p { font-size: 0.82rem; opacity: 0.65; line-height: 1.5; }
}
</style>
