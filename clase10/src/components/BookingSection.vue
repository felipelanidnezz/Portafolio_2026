<template>
  <section id="reservar" class="booking">
    <div class="booking__left">
      <p class="section-tag">{{ lang === 'es' ? 'Reservas' : 'Bookings' }}</p>
      <h2 class="section-title">{{ lang === 'es' ? '¿Listo para Salento?' : 'Ready for Salento?' }}</h2>
      <div class="divider"></div>
      <p class="booking__desc">
        {{ lang === 'es'
          ? 'Completa el formulario y te contactamos por WhatsApp para confirmar disponibilidad y tarifa. También puedes reservar directamente en Booking.'
          : 'Fill out the form and we\'ll contact you via WhatsApp to confirm availability and rate. You can also book directly on Booking.' }}
      </p>
      <div class="booking__info">
        <div>📍 Carrera 5 # 6-23, Salento, Quindío</div>
        <div>🕐 Check-in: 14:00 · Check-out: 12:00</div>
        <div>📱 +57 300 123 4567</div>
      </div>
    </div>

    <div class="booking__right">
      <form class="booking-form" @submit.prevent="submit">
        <h3>{{ lang === 'es' ? 'Solicitar reserva' : 'Request booking' }}</h3>

        <div class="form-row">
          <label>
            <span>{{ lang === 'es' ? 'Nombre' : 'Name' }}</span>
            <input v-model="form.name" type="text" required :placeholder="lang === 'es' ? 'Tu nombre' : 'Your name'" />
          </label>
          <label>
            <span>{{ lang === 'es' ? 'Teléfono' : 'Phone' }}</span>
            <input v-model="form.phone" type="tel" required placeholder="+57 300 000 0000" />
          </label>
        </div>

        <div class="form-row">
          <label>
            <span>{{ lang === 'es' ? 'Entrada' : 'Check-in' }}</span>
            <input v-model="form.checkin" type="date" required :min="today" />
          </label>
          <label>
            <span>{{ lang === 'es' ? 'Salida' : 'Check-out' }}</span>
            <input v-model="form.checkout" type="date" required :min="form.checkin || today" />
          </label>
        </div>

        <label>
          <span>{{ lang === 'es' ? 'Habitación' : 'Room' }}</span>
          <select v-model="form.room" required>
            <option value="">{{ lang === 'es' ? 'Seleccionar...' : 'Select...' }}</option>
            <option value="doble">{{ lang === 'es' ? 'Habitación Doble' : 'Double Room' }}</option>
            <option value="triple">{{ lang === 'es' ? 'Habitación Triple' : 'Triple Room' }}</option>
            <option value="cuadruple">{{ lang === 'es' ? 'Habitación Cuádruple' : 'Quadruple Room' }}</option>
            <option value="quintuple">{{ lang === 'es' ? 'Habitación Quíntuple' : 'Quintuple Room' }}</option>
          </select>
        </label>

        <label>
          <span>{{ lang === 'es' ? 'Huéspedes' : 'Guests' }}</span>
          <select v-model="form.guests" required>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </label>

        <button type="submit" class="btn btn--whatsapp btn--full">
          {{ lang === 'es' ? 'Enviar por WhatsApp' : 'Send via WhatsApp' }}
        </button>

        <a
          href="https://www.booking.com/hotel/co/monte-verde-salento.es.html"
          target="_blank"
          rel="noopener"
          class="booking-form__booking-link"
        >
          {{ lang === 'es' ? 'O reservar en Booking.com →' : 'Or book on Booking.com →' }}
        </a>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue'

defineProps({ lang: String })

const WHATSAPP = '573001234567'

const form = reactive({
  name: '',
  phone: '',
  checkin: '',
  checkout: '',
  room: '',
  guests: 2,
})

const today = computed(() => new Date().toISOString().split('T')[0])

const roomLabels = {
  doble: 'Habitación Doble',
  triple: 'Habitación Triple',
  cuadruple: 'Habitación Cuádruple',
  quintuple: 'Habitación Quíntuple',
}

function submit() {
  const msg = encodeURIComponent(
    `🏨 *Reserva Hotel Monte Verde Salento*\n\n` +
    `👤 Nombre: ${form.name}\n` +
    `📱 Teléfono: ${form.phone}\n` +
    `📅 Entrada: ${form.checkin}\n` +
    `📅 Salida: ${form.checkout}\n` +
    `🛏️ Habitación: ${roomLabels[form.room] || form.room}\n` +
    `👥 Huéspedes: ${form.guests}\n\n` +
    `¡Hola! Quisiera confirmar disponibilidad y tarifa. Gracias.`
  )
  window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
}
</script>

<style lang="scss" scoped>
.booking {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.25rem, 4vw, 3rem);
  max-width: 1200px;
  margin: 0 auto;
  align-items: start;

  &__desc {
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-size: var(--fs-body);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    font-size: 0.9rem;
    color: var(--text);
  }
}

.booking-form {
  background: white;
  border-radius: 20px;
  padding: clamp(1.5rem, 4vw, 2rem);
  box-shadow: 0 8px 40px rgba(30,21,16,0.1);
  border: 1px solid rgba(0,0,0,0.06);

  h3 {
    font-size: var(--fs-h3);
    color: var(--dark);
    margin-bottom: 1.25rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 1rem;
    span {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  input, select {
    padding: 0.75rem 1rem;
    border: 1.5px solid rgba(0,0,0,0.12);
    border-radius: 10px;
    background: var(--cream);
    color: var(--text);
    outline: none;
    transition: border-color 0.2s;
    &:focus { border-color: var(--forest); }
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}

.btn--full { width: 100%; margin-top: 0.5rem; }

.booking-form__booking-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--forest);
  font-weight: 600;
  text-decoration: none;
  &:hover { text-decoration: underline; }
}

@media (max-width: 768px) {
  .booking { grid-template-columns: 1fr; }
}
</style>
