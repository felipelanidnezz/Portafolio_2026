<template>
  <footer class="footer">
    <div class="footer__grid">
      <div class="footer__brand">
        <span class="footer__logo">🌿 Monte Verde</span>
        <p>{{ lang === 'es' ? 'Hospedaje colonial en Salento, Quindío.' : 'Colonial lodging in Salento, Quindío.' }}</p>
      </div>
      <div>
        <h4>{{ lang === 'es' ? 'Enlaces' : 'Links' }}</h4>
        <ul>
          <li><a href="#habitaciones">{{ lang === 'es' ? 'Habitaciones' : 'Rooms' }}</a></li>
          <li><a href="#reservar">{{ lang === 'es' ? 'Reservar' : 'Book' }}</a></li>
          <li><a href="#mapa">{{ lang === 'es' ? 'Ubicación' : 'Location' }}</a></li>
        </ul>
      </div>
      <div>
        <h4>{{ lang === 'es' ? 'Contacto' : 'Contact' }}</h4>
        <ul>
          <li><a href="https://wa.me/573001234567" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href="mailto:info@monteverdesalento.com">info@monteverdesalento.com</a></li>
          <li>Carrera 5 # 6-23, Salento</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© {{ year }} Hotel Monte Verde Salento · {{ lang === 'es' ? 'Desarrollado por' : 'Built by' }} Felipe Landinez</p>
    </div>
  </footer>
</template>

<script setup>
defineProps({ lang: String })
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.footer {
  background: var(--dark);
  color: rgba(255,255,255,0.75);
  padding: clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 4vw, 3rem) 1.5rem;

  &__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto 2rem;
  }

  &__logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    display: block;
    margin-bottom: 0.5rem;
  }

  &__brand p { font-size: 0.88rem; line-height: 1.6; opacity: 0.7; }

  h4 {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--gold);
    margin-bottom: 0.75rem;
  }

  ul { list-style: none; }
  li { margin-bottom: 0.4rem; font-size: 0.88rem; }
  a { color: rgba(255,255,255,0.75); text-decoration: none; &:hover { color: var(--gold); } }

  &__bottom {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.08);
    font-size: 0.78rem;
    opacity: 0.5;
  }
}

@media (max-width: 640px) {
  .footer__grid { grid-template-columns: 1fr; }
}
</style>
