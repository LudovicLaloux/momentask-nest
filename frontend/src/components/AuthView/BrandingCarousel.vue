<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface CarouselSlide {
  title: string
  description: string
}

const { t } = useI18n()

const slides: CarouselSlide[] = [
  {
    title: t('BRANDING_PANEL.BRANDING_CAROUSEL.TITLE_1'),
    description: t('BRANDING_PANEL.BRANDING_CAROUSEL.DESCRIPTION_1'),
  },
  {
    title: t('BRANDING_PANEL.BRANDING_CAROUSEL.TITLE_2'),
    description: t('BRANDING_PANEL.BRANDING_CAROUSEL.DESCRIPTION_2'),
  },
  {
    title: t('BRANDING_PANEL.BRANDING_CAROUSEL.TITLE_3'),
    description: t('BRANDING_PANEL.BRANDING_CAROUSEL.DESCRIPTION_3'),
  },
]

const currentSlide = ref(0)
let intervalId: number | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoRotation = () => {
  intervalId = window.setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoRotation = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoRotation()
})

onUnmounted(() => {
  stopAutoRotation()
})
</script>

<template>
  <div class="branding-carousel">
    <!-- Carousel Card -->
    <div class="w-100" @mouseenter="stopAutoRotation" @mouseleave="startAutoRotation">
      <transition name="slide-fade" mode="out-in">
        <v-card :key="currentSlide" class="carousel-card w-100" rounded="xl" elevation="8">
          <v-card-text>
            <v-img :src="`/src/assets/carousel${currentSlide + 1}.png`" cover max-height="100%" />
          </v-card-text>
        </v-card>
      </transition>
    </div>

    <!-- Text Section (outside card) -->
    <div class="text-section mt-8">
      <transition name="slide-fade" mode="out-in">
        <div :key="currentSlide">
          <!-- Title -->
          <h2 class="carousel-title">
            {{ slides[currentSlide]?.title }}
          </h2>

          <!-- Description -->
          <p class="carousel-description">
            {{ slides[currentSlide]?.description }}
          </p>
        </div>
      </transition>
    </div>

    <!-- Navigation Controls -->
    <div class="carousel-controls mt-8">
      <!-- Previous Button -->
      <v-btn icon variant="text" size="small" @click="prevSlide" class="control-btn" elevation="0">
        <v-icon icon="mdi-chevron-left" size="26" />
      </v-btn>

      <!-- Dots Indicators -->
      <div class="dots-container mx-6">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          class="dot"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
          :aria-label="`Aller à la slide ${index + 1}`"
        />
      </div>

      <!-- Next Button -->
      <v-btn icon variant="text" size="small" @click="nextSlide" class="control-btn" elevation="0">
        <v-icon icon="mdi-chevron-right" size="26" />
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.carousel-card {
  background: #f3f4f6;
  transition: all 0.3s ease;
  min-height: 390px;
}

.text-section {
  text-align: center;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Navigation Controls */
.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.control-btn {
  /* color: rgb(20, 184, 166); */
  transition: all 0.2s ease;
}

.control-btn:hover {
  background-color: rgba(20, 184, 166, 0.1);
}

/* Dots */
.dots-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  border: none;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  background-color: rgba(20, 184, 166, 0.5);
}

.dot.active {
  width: 24px;
  height: 8px;
  background-color: rgb(20, 184, 166);
  border-radius: 4px;
}
</style>
