<template>
  <section id="nosotros" class="about">
    <div class="about__text">
      <p class="section-tag">{{ lang === 'es' ? 'Nuestra historia' : 'Our story' }}</p>
      <h2 class="section-title">
        {{ lang === 'es' ? 'Colonial, cálido' : 'Colonial, warm' }}<br />
        {{ lang === 'es' ? 'y en el centro de todo' : 'and at the heart of it all' }}
      </h2>
      <div class="divider"></div>
      <p v-for="(p, i) in paragraphs" :key="i">{{ lang === 'es' ? p.es : p.en }}</p>
    </div>
    <div class="about__images">
      <div class="about__img about__img--main">
        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80" alt="Habitación colonial Hotel Monte Verde Salento" loading="lazy" />
      </div>
      <div class="about__img">
        <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80" alt="Patio y jardín del hotel en Salento" loading="lazy" />
      </div>
      <div class="about__img">
        <img src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ad?w=600&q=80" alt="Desayuno típico paisa en el hotel" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ lang: String })

const paragraphs = [
  {
    es: 'Hotel Monte Verde es un refugio de estilo colonial en Salento, el pueblo más pintoresco del Quindío. Cada rincón respira la tradición cafetera y la hospitalidad paisa.',
    en: 'Hotel Monte Verde is a colonial-style refuge in Salento, the most picturesque town in Quindío. Every corner breathes coffee tradition and local hospitality.',
  },
  {
    es: 'Ubicados a solo 200 metros de la Plaza de Bolívar, somos el punto de partida perfecto para explorar el Valle del Cocora, Filandia y las fincas cafeteras de la región.',
    en: 'Located just 200 meters from Bolívar Square, we are the perfect starting point to explore Cocora Valley, Filandia and the region\'s coffee farms.',
  },
  {
    es: 'Habitaciones cómodas con baño privado, agua caliente, WiFi y desayuno incluido. Un lugar sencillo, limpio y auténtico — como debe ser Salento.',
    en: 'Comfortable rooms with private bathroom, hot water, WiFi and breakfast included. A simple, clean and authentic place — as Salento should be.',
  },
]
</script>

<style lang="scss" scoped>
.about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem);
  max-width: 1200px;
  margin: 0 auto;

  &__text p {
    font-size: var(--fs-body);
    color: var(--muted);
    line-height: 1.75;
    margin-bottom: 1rem;
  }

  &__images {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 0.85rem;
  }

  &__img {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(30,21,16,0.12);
    img { width: 100%; height: 100%; object-fit: cover; min-height: 140px; }
    &--main {
      grid-column: 1 / -1;
      img { min-height: 220px; max-height: 280px; }
    }
  }
}

@media (max-width: 768px) {
  .about { grid-template-columns: 1fr; }
}
</style>
