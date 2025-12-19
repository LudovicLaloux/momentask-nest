<script setup lang="ts">
import BrandingPanel from '@/components/AuthView/BrandingPanel.vue'
import AuthPanel from '@/components/AuthView/AuthPanel.vue'
import AppLogo from '@/components/common/AppLogo.vue'
</script>

<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" md="6" class="d-none d-md-flex flex-grow">
        <BrandingPanel class="w-100"></BrandingPanel>
      </v-col>

      <v-col cols="12" md="6">
        <div class="right-panel fill-height pa-12">
          <AppLogo class="app-logo d-flex d-md-none justify-center" size="large" />
          <AuthPanel class="fill-height"></AuthPanel>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.right-panel {
  position: relative;
}

.app-logo {
  position: absolute;
  top: 48px;
  left: calc(50% - 258px / 2);
}
</style>
