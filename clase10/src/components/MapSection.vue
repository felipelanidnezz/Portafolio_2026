<template>
  <section id="mapa" class="map">
    <div class="map__header">
      <p class="section-tag">{{ lang === 'es' ? 'Ubicación' : 'Location' }}</p>
      <h2 class="section-title">{{ lang === 'es' ? 'En el corazón de Salento' : 'In the heart of Salento' }}</h2>
      <div class="divider" style="margin: 0 auto;"></div>
    </div>
    <div class="map__grid">
      <div class="map__frame">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.5!2d-75.5706!3d4.6373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e409c8f8f8f8f8f%3A0x0!2sSalento%2C%20Quind%C3%ADo!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
          width="100%"
          height="100%"
          style="border:0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Hotel Monte Verde Salento mapa"
        ></iframe>
      </div>
      <div class="map__info">
        <h3>📍 {{ lang === 'es' ? 'Dirección' : 'Address' }}</h3>
        <p>Carrera 5 # 6-23<br />Salento, Quindío, Colombia</p>
        <h3>🚶 {{ lang === 'es' ? 'Cerca de' : 'Near' }}</h3>
        <ul>
          <li>{{ lang === 'es' ? 'Plaza de Bolívar — 200 m' : 'Bolívar Square — 200 m' }}</li>
          <li>{{ lang === 'es' ? 'Valle del Cocora — 15 min' : 'Cocora Valley — 15 min' }}</li>
          <li>{{ lang === 'es' ? 'Filandia — 30 min' : 'Filandia — 30 min' }}</li>
          <li>{{ lang === 'es' ? 'Armenia — 1 h' : 'Armenia — 1 h' }}</li>
        </ul>
        <a
          href="https://maps.app.goo.gl/salento-quindio"
          target="_blank"
          rel="noopener"
          class="btn btn--primary"
        >
          {{ lang === 'es' ? 'Abrir en Google Maps' : 'Open in Google Maps' }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ lang: String })
</script>

<style lang="scss" scoped>
.map {
  padding: clamp(3.5rem, 8vw, 5rem) clamp(1.25rem, 4vw, 3rem);
  background: var(--cream-dark);

  &__header { text-align: center; margin-bottom: 2rem; }

  &__grid {
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    gap: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  &__frame {
    height: clamp(280px, 45vw, 420px);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 6px 30px rgba(30,21,16,0.1);
    border: 1px solid rgba(0,0,0,0.08);
  }

  &__info {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(30,21,16,0.06);

    h3 {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--forest);
      margin-bottom: 0.4rem;
      margin-top: 1rem;
      &:first-child { margin-top: 0; }
    }

    p, li {
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.65;
    }

    ul { list-style: none; margin-bottom: 1.25rem; }
    li { padding: 0.2rem 0; }

    .btn { width: 100%; margin-top: 0.5rem; }
  }
}

@media (max-width: 768px) {
  .map__grid { grid-template-columns: 1fr; }
}
</style>
