<template>
  <section class="faq">
    <div class="faq__inner">
      <p class="section-tag">{{ lang === 'es' ? 'FAQ' : 'FAQ' }}</p>
      <h2 class="section-title">{{ lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions' }}</h2>
      <div class="divider" style="margin: 0 auto 2rem;"></div>
      <div class="faq__list">
        <details v-for="(item, i) in items" :key="i" class="faq__item">
          <summary>{{ lang === 'es' ? item.qEs : item.qEn }}</summary>
          <p>{{ lang === 'es' ? item.aEs : item.aEn }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ lang: String })

const items = [
  {
    qEs: '¿Dónde queda el Hotel Monte Verde?',
    qEn: 'Where is Hotel Monte Verde located?',
    aEs: 'En el centro de Salento, Quindío. Carrera 5 # 6-23, a solo 200 metros de la Plaza de Bolívar.',
    aEn: 'In downtown Salento, Quindío. Carrera 5 # 6-23, just 200 meters from Bolívar Square.',
  },
  {
    qEs: '¿El desayuno está incluido?',
    qEn: 'Is breakfast included?',
    aEs: 'Sí, todas nuestras tarifas incluyen desayuno continental.',
    aEn: 'Yes, all our rates include continental breakfast.',
  },
  {
    qEs: '¿Aceptan mascotas?',
    qEn: 'Do you accept pets?',
    aEs: 'Sí, bajo petición previa. Consulta disponibilidad al reservar.',
    aEn: 'Yes, upon prior request. Check availability when booking.',
  },
  {
    qEs: '¿Cómo llego al Valle del Cocora?',
    qEn: 'How do I get to Cocora Valley?',
    aEs: 'Desde la plaza de Salento salen jeeps Willys cada mañana. Te orientamos en recepción.',
    aEn: 'Willys jeeps leave from Salento square every morning. We guide you at reception.',
  },
  {
    qEs: '¿Cuáles son los horarios de check-in y check-out?',
    qEn: 'What are check-in and check-out times?',
    aEs: 'Check-in a partir de las 14:00. Check-out hasta las 12:00.',
    aEn: 'Check-in from 2:00 PM. Check-out until 12:00 PM.',
  },
]
</script>

<style lang="scss" scoped>
.faq {
  padding: clamp(3.5rem, 8vw, 5rem) clamp(1.25rem, 4vw, 3rem);

  &__inner { max-width: 720px; margin: 0 auto; text-align: center; }
  &__list { text-align: left; }

  &__item {
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 0.25rem 0;

    summary {
      padding: 1rem 0;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.95rem;
      color: var(--dark);
      &::after { content: '+'; font-size: 1.2rem; color: var(--forest); }
    }

    &[open] summary::after { content: '−'; }

    p {
      padding: 0 0 1rem;
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.65;
    }
  }
}
</style>
