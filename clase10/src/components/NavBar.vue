<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <a href="#" class="logo" @click.prevent="scrollTop">
        <span class="logo__leaf">🌿</span>
        <span class="logo__text">Monte Verde</span>
      </a>

      <ul class="nav-links">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" @click.prevent="scrollTo(link.href)">{{ lang === 'es' ? link.es : link.en }}</a>
        </li>
      </ul>

      <div class="nav-actions">
        <div class="lang-toggle">
          <button :class="{ active: lang === 'es' }" @click="$emit('toggle-lang', 'es')">ES</button>
          <button :class="{ active: lang === 'en' }" @click="$emit('toggle-lang', 'en')">EN</button>
        </div>
        <a href="#reservar" class="btn btn--primary nav-cta" @click.prevent="scrollTo('#reservar')">
          {{ lang === 'es' ? 'Reservar' : 'Book' }}
        </a>
        <button class="hamburger" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen" aria-label="Menú">
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>

    <div class="mobile-menu" :class="{ open: menuOpen }">
      <a v-for="link in links" :key="link.href" :href="link.href" @click.prevent="mobileNav(link.href)">
        {{ lang === 'es' ? link.es : link.en }}
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({ lang: String })
defineEmits(['toggle-lang'])

const menuOpen = ref(false)
const isScrolled = ref(false)

const links = [
  { es: 'Nosotros', en: 'About', href: '#nosotros' },
  { es: 'Habitaciones', en: 'Rooms', href: '#habitaciones' },
  { es: 'Experiencias', en: 'Experiences', href: '#experiencias' },
  { es: 'Galería', en: 'Gallery', href: '#galeria' },
  { es: 'Contacto', en: 'Contact', href: '#mapa' },
]

const handleScroll = () => { isScrolled.value = window.scrollY > 60 }

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
const scrollTo = (sel) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
const mobileNav = (sel) => { menuOpen.value = false; setTimeout(() => scrollTo(sel), 250) }
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  padding-top: var(--safe-top);
  transition: background 0.35s, box-shadow 0.35s, backdrop-filter 0.35s;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(30,21,16,0.65) 0%, transparent 100%);
    pointer-events: none;
    transition: opacity 0.35s;
  }

  &.scrolled {
    background: rgba(250, 246, 240, 0.92);
    backdrop-filter: blur(12px);
    box-shadow: 0 2px 24px rgba(30,21,16,0.08);
    &::before { opacity: 0; }

    .logo__text, .nav-links a { color: var(--dark); text-shadow: none; }
    .nav-links a:hover { color: var(--forest); }
    .lang-toggle button { border-color: rgba(30,21,16,0.2); color: var(--muted); }
    .hamburger span { background: var(--dark); }
  }
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.85rem 1.5rem;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  &__text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
    letter-spacing: 0.02em;
  }
  &__leaf { font-size: 1.2rem; }
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.75rem;
  a {
    color: rgba(255,255,255,0.92);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-shadow: 0 1px 3px rgba(0,0,0,0.25);
    transition: color 0.2s;
    &:hover { color: var(--gold); }
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.lang-toggle {
  display: flex;
  gap: 2px;
  button {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.35);
    color: white;
    padding: 0.3rem 0.55rem;
    font-size: 0.68rem;
    font-weight: 700;
    cursor: pointer;
    border-radius: 4px;
    &.active { background: var(--gold); color: var(--dark); border-color: var(--gold); }
  }
}

.nav-cta {
  padding: 0.55rem 1.2rem;
  font-size: 0.82rem;
  min-height: 40px;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  span {
    display: block;
    width: 22px;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s;
    &.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    &.open:nth-child(2) { opacity: 0; }
    &.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  }
}

.mobile-menu {
  display: none;
  flex-direction: column;
  background: var(--cream);
  border-top: 1px solid rgba(0,0,0,0.06);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s;
  &.open { max-height: 360px; }
  a {
    padding: 1rem 1.5rem;
    color: var(--dark);
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    &:hover { color: var(--forest); background: var(--cream-dark); }
  }
}

@media (max-width: 900px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { display: flex; }
}
</style>
