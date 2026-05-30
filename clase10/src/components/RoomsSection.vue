<template>
  <section id="habitaciones" class="rooms">
    <div class="rooms__header">
      <p class="section-tag">{{ lang === 'es' ? 'Alojamiento' : 'Accommodation' }}</p>
      <h2 class="section-title">{{ lang === 'es' ? 'Nuestras habitaciones' : 'Our rooms' }}</h2>
      <div class="divider" style="margin: 0 auto 0.5rem;"></div>
      <p class="rooms__sub">
        {{ lang === 'es'
          ? 'Estancias sencillas y acogedoras con baño privado, TV, agua caliente y desayuno incluido.'
          : 'Simple and cozy stays with private bathroom, TV, hot water and breakfast included.' }}
      </p>
    </div>

    <div class="rooms__grid">
      <article v-for="room in rooms" :key="room.id" class="room-card">
        <div class="room-card__img">
          <img :src="room.image" :alt="lang === 'es' ? room.nameEs : room.nameEn" loading="lazy" />
          <span class="room-card__badge">{{ lang === 'es' ? room.badgeEs : room.badgeEn }}</span>
        </div>
        <div class="room-card__body">
          <h3>{{ lang === 'es' ? room.nameEs : room.nameEn }}</h3>
          <p class="room-card__desc">{{ lang === 'es' ? room.descEs : room.descEn }}</p>
          <ul class="room-card__features">
            <li v-for="f in room.features" :key="f">{{ f }}</li>
          </ul>
          <div class="room-card__footer">
            <div class="room-card__price">
              <span class="from">{{ lang === 'es' ? 'Desde' : 'From' }}</span>
              <strong>${{ room.priceLow.toLocaleString('es-CO') }}</strong>
              <span class="night">/ {{ lang === 'es' ? 'noche' : 'night' }}</span>
            </div>
            <a :href="whatsappLink(room)" target="_blank" rel="noopener" class="btn btn--primary btn--sm">
              {{ lang === 'es' ? 'Consultar' : 'Inquire' }}
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({ lang: String })

const WHATSAPP = '573001234567'

const rooms = [
  {
    id: 1,
    nameEs: 'Habitación Doble',
    nameEn: 'Double Room',
    badgeEs: 'Popular',
    badgeEn: 'Popular',
    descEs: 'Ideal para parejas. Cama doble, baño privado y vista al jardín.',
    descEn: 'Ideal for couples. Double bed, private bathroom and garden view.',
    features: ['🛏️ Cama doble', '🚿 Baño privado', '📺 TV cable', '☕ Desayuno'],
    priceLow: 160000,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80',
  },
  {
    id: 2,
    nameEs: 'Habitación Triple',
    nameEn: 'Triple Room',
    badgeEs: 'Familia',
    badgeEn: 'Family',
    descEs: 'Espacio para tres. Cama doble + sencilla, perfecta para amigos o familia pequeña.',
    descEn: 'Space for three. Double + single bed, perfect for friends or small family.',
    features: ['🛏️ 2 camas', '🚿 Baño privado', '📺 TV cable', '☕ Desayuno'],
    priceLow: 220000,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=700&q=80',
  },
  {
    id: 3,
    nameEs: 'Habitación Cuádruple',
    nameEn: 'Quadruple Room',
    badgeEs: 'Grupos',
    badgeEn: 'Groups',
    descEs: 'Amplia habitación familiar con capacidad para cuatro huéspedes.',
    descEn: 'Spacious family room with capacity for four guests.',
    features: ['🛏️ 4 personas', '🚿 Baño privado', '🌿 Balcón', '☕ Desayuno'],
    priceLow: 280000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80',
  },
  {
    id: 4,
    nameEs: 'Habitación Quíntuple',
    nameEn: 'Quintuple Room',
    badgeEs: 'Grupos grandes',
    badgeEn: 'Large groups',
    descEs: 'La opción más amplia para familias o grupos de amigos viajeros.',
    descEn: 'The largest option for families or groups of traveling friends.',
    features: ['🛏️ 5 personas', '🚿 Baño privado', '📺 TV cable', '☕ Desayuno'],
    priceLow: 350000,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=700&q=80',
  },
]

function whatsappLink(room) {
  const msg = encodeURIComponent(`Hola! Me interesa la ${room.nameEs} en Hotel Monte Verde Salento. ¿Tienen disponibilidad?`)
  return `https://wa.me/${WHATSAPP}?text=${msg}`
}
</script>

<style lang="scss" scoped>
.rooms {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem);
  background: var(--cream-dark);

  &__header { text-align: center; max-width: 560px; margin: 0 auto 2.5rem; }
  &__sub { color: var(--muted); font-size: var(--fs-body); line-height: 1.65; }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}

.room-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(30,21,16,0.07);
  border: 1px solid rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(30,21,16,0.12);
  }

  &__img {
    position: relative;
    height: 200px;
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  &__badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--forest);
    color: white;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__body {
    padding: 1.25rem;
    h3 {
      font-size: var(--fs-h3);
      color: var(--dark);
      margin-bottom: 0.5rem;
    }
  }

  &__desc {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.55;
    margin-bottom: 0.85rem;
  }

  &__features {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.1rem;
    li {
      font-size: 0.75rem;
      background: var(--cream);
      padding: 0.25rem 0.55rem;
      border-radius: 6px;
      color: var(--muted);
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.06);
  }

  &__price {
    .from { display: block; font-size: 0.65rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
    strong { font-size: 1.15rem; color: var(--forest); font-family: 'Cormorant Garamond', serif; }
    .night { font-size: 0.75rem; color: var(--muted); }
  }
}

.btn--sm {
  padding: 0.55rem 1rem;
  font-size: 0.8rem;
  min-height: 40px;
  white-space: nowrap;
}
</style>
