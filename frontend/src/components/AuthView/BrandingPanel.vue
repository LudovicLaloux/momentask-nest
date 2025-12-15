<script setup lang="ts">
import AppLogo from '@/components/common/AppLogo.vue'
import BrandingCarousel from '@/components/AuthView/BrandingCarousel.vue'
</script>

<template>
  <div
    class="branding-panel w-100 h-100 d-flex flex-column justify-space-between align-start pa-12"
  >
    <AppLogo size="medium" />

    <BrandingCarousel class="w-100 mx-auto" />

    <div class="footer">
      <p>&copy; {{ $t('BRANDING_PANEL.LICENSE') }}</p>
    </div>
  </div>
</template>

<style scoped>
.branding-panel {
  background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem;
  color: rgb(90 97 109);
}

.footer {
  text-align: center;
  font-size: 0.875rem;
  opacity: 0.8;
}

.footer p {
  margin: 0;
}

.branding-carousel {
  max-width: 500px;
}
</style>
