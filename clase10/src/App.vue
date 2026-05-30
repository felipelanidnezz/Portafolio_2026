<template>
  <div class="app">
    <NavBar :lang="lang" @toggle-lang="lang = $event" />
    <HeroSection :lang="lang" />
    <StatsBar :lang="lang" />
    <AboutSection :lang="lang" />
    <RoomsSection :lang="lang" />
    <AmenitiesSection :lang="lang" />
    <ExperiencesSection :lang="lang" />
    <GalleryStrip :lang="lang" />
    <BookingSection :lang="lang" />
    <MapSection :lang="lang" />
    <FaqSection :lang="lang" />
    <FooterComponent :lang="lang" />
    <WhatsappFloat :lang="lang" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import StatsBar from './components/StatsBar.vue'
import AboutSection from './components/AboutSection.vue'
import RoomsSection from './components/RoomsSection.vue'
import AmenitiesSection from './components/AmenitiesSection.vue'
import ExperiencesSection from './components/ExperiencesSection.vue'
import GalleryStrip from './components/GalleryStrip.vue'
import BookingSection from './components/BookingSection.vue'
import MapSection from './components/MapSection.vue'
import FaqSection from './components/FaqSection.vue'
import FooterComponent from './components/FooterComponent.vue'
import WhatsappFloat from './components/WhatsappFloat.vue'

const lang = ref('es')
</script>

<style scoped>
.app {
  overflow-x: clip;
  width: 100%;
}
</style>
