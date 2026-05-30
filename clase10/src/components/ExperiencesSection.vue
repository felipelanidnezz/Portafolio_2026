<template>
  <section id="experiencias" class="experiences">
    <div class="experiences__header">
      <p class="section-tag">{{ lang === 'es' ? 'Descubre Salento' : 'Discover Salento' }}</p>
      <h2 class="section-title">{{ lang === 'es' ? 'Experiencias cercanas' : 'Nearby experiences' }}</h2>
      <div class="divider" style="margin: 0 auto;"></div>
    </div>
    <div class="experiences__grid">
      <article v-for="exp in items" :key="exp.titleEs" class="exp-card">
        <img :src="exp.image" :alt="lang === 'es' ? exp.titleEs : exp.titleEn" loading="lazy" />
        <div class="exp-card__body">
          <span class="exp-card__dist">{{ exp.distance }}</span>
          <h3>{{ lang === 'es' ? exp.titleEs : exp.titleEn }}</h3>
          <p>{{ lang === 'es' ? exp.descEs : exp.descEn }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({ lang: String })

const items = [
  {
    titleEs: 'Valle del Cocora',
    titleEn: 'Cocora Valley',
    descEs: 'Las palmas de cera más altas del mundo. Ideal para caminata, caballo o jeep desde la plaza.',
    descEn: 'The tallest wax palms in the world. Ideal for hiking, horseback or jeep from the square.',
    distance: '15 min',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=700&q=80',
  },
  {
    titleEs: 'Filandia',
    titleEn: 'Filandia',
    descEs: 'Pueblo colorido con mirador de la Cordillera. Perfecto para tarde de café y artesanías.',
    descEn: 'Colorful town with mountain viewpoint. Perfect for an afternoon of coffee and crafts.',
    distance: '30 min',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52c6319228?w=700&q=80',
  },
  {
    titleEs: 'Tour de café',
    titleEn: 'Coffee tour',
    descEs: 'Visita fincas locales, aprende el proceso del grano y degusta el mejor café del mundo.',
    descEn: 'Visit local farms, learn the bean process and taste the world\'s best coffee.',
    distance: '20 min',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80',
  },
]
</script>

<style lang="scss" scoped>
.experiences {
  padding: clamp(3.5rem, 8vw, 5rem) clamp(1.25rem, 4vw, 3rem);
  max-width: 1200px;
  margin: 0 auto;

  &__header { text-align: center; margin-bottom: 2.5rem; }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
}

.exp-card {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(30,21,16,0.08);
  transition: transform 0.3s;

  &:hover { transform: translateY(-4px); }

  img { width: 100%; height: 200px; object-fit: cover; }

  &__body { padding: 1.25rem; }

  &__dist {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--terracotta);
  }

  h3 {
    font-size: var(--fs-h3);
    color: var(--dark);
    margin: 0.35rem 0 0.5rem;
  }

  p { font-size: 0.88rem; color: var(--muted); line-height: 1.6; }
}
</style>
