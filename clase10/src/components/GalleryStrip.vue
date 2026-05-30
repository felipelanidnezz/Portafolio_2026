<template>
  <section id="galeria" class="gallery">
    <div class="gallery__header">
      <p class="section-tag">{{ lang === 'es' ? 'Galería' : 'Gallery' }}</p>
      <h2 class="section-title">{{ lang === 'es' ? 'Momentos en Monte Verde' : 'Moments at Monte Verde' }}</h2>
    </div>
    <div class="gallery__track" ref="track">
      <div v-for="(img, i) in images" :key="i" class="gallery__item">
        <img :src="img.src" :alt="img.alt" loading="lazy" />
      </div>
    </div>
    <div class="gallery__nav">
      <button @click="scroll(-1)" aria-label="Anterior">←</button>
      <button @click="scroll(1)" aria-label="Siguiente">→</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ lang: String })

const track = ref(null)

const images = [
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', alt: 'Fachada hotel colonial Salento' },
  { src: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80', alt: 'Valle del Cocora palmas de cera' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', alt: 'Habitación acogedora' },
  { src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80', alt: 'Jardín del hotel' },
  { src: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ad?w=600&q=80', alt: 'Desayuno paisa' },
  { src: 'https://images.unsplash.com/photo-1516026672322-bc52c6319228?w=600&q=80', alt: 'Calles de Salento' },
]

function scroll(dir) {
  track.value?.scrollBy({ left: dir * 340, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.gallery {
  padding: clamp(3rem, 7vw, 5rem) 0;
  background: var(--cream);
  overflow: hidden;

  &__header {
    text-align: center;
    padding: 0 1.25rem;
    margin-bottom: 1.75rem;
  }

  &__track {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 0 clamp(1.25rem, 4vw, 3rem) 1rem;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }

  &__item {
    flex: 0 0 min(320px, 80vw);
    scroll-snap-align: start;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(30,21,16,0.1);
    img { width: 100%; height: 240px; object-fit: cover; }
  }

  &__nav {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
    button {
      width: 44px; height: 44px;
      border-radius: 50%;
      border: 2px solid var(--forest);
      background: white;
      color: var(--forest);
      font-size: 1.1rem;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      &:hover { background: var(--forest); color: white; }
    }
  }
}
</style>
