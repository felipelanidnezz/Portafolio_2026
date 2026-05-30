<template>
  <section class="hero">
    <div class="hero__bg">
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
        alt="Hotel colonial en el Eje Cafetero, Salento Quindío"
        fetchpriority="high"
      />
      <div class="hero__overlay"></div>
    </div>

    <div class="hero__content">
      <p class="hero__tag">{{ lang === 'es' ? 'Salento · Quindío · Colombia' : 'Salento · Quindío · Colombia' }}</p>
      <h1 class="hero__title">
        {{ lang === 'es' ? 'Donde el café' : 'Where coffee' }}<br />
        <em>{{ lang === 'es' ? 'encuentra el cielo' : 'meets the sky' }}</em>
      </h1>
      <p class="hero__sub">
        {{ lang === 'es'
          ? 'Hospedaje colonial en el corazón de Salento. A 200 m de la plaza principal, con desayuno incluido y la calidez del Eje Cafetero.'
          : 'Colonial lodging in the heart of Salento. 200 m from the main square, breakfast included and the warmth of the Coffee Region.' }}
      </p>
      <div class="hero__actions">
        <a href="#reservar" class="btn btn--primary" @click.prevent="scroll('#reservar')">
          {{ lang === 'es' ? 'Reservar ahora' : 'Book now' }}
        </a>
        <a href="#habitaciones" class="btn btn--outline" @click.prevent="scroll('#habitaciones')">
          {{ lang === 'es' ? 'Ver habitaciones' : 'View rooms' }}
        </a>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>{{ lang === 'es' ? 'Descubre' : 'Discover' }}</span>
      <div class="hero__line"></div>
    </div>
  </section>
</template>

<script setup>
defineProps({ lang: String })
const scroll = (sel) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  padding: calc(80px + var(--safe-top)) 1.25rem 3rem;
}

.hero__bg {
  position: absolute;
  inset: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: kenburns 22s ease-in-out infinite alternate;
  }
}

@keyframes kenburns {
  from { transform: scale(1); }
  to { transform: scale(1.07); }
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(30,21,16,0.72) 0%, rgba(45,74,42,0.45) 50%, rgba(30,21,16,0.65) 100%);
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 720px;
  animation: fadeUp 0.9s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero__tag {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1rem;
  font-weight: 600;
}

.hero__title {
  font-size: var(--fs-h1);
  margin-bottom: 1.25rem;
  text-wrap: balance;
  em { color: var(--gold); font-style: italic; }
}

.hero__sub {
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  opacity: 0.92;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  justify-content: center;
}

.hero__scroll {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hero__line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--gold), transparent);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@media (max-width: 640px) {
  .hero__scroll { display: none; }
  .hero__actions { flex-direction: column; align-items: stretch; }
}
</style>
