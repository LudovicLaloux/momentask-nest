<script setup lang="ts">
import BrandingPanel from '@/components/AuthView/BrandingPanel.vue'
import AuthPanel from '@/components/AuthView/AuthPanel.vue'
</script>

<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" md="6" class="d-sm-none d-md-flex flex-grow">
        <BrandingPanel class="w-100"></BrandingPanel>
      </v-col>

      <v-col cols="12" md="6">
        <AuthPanel class="fill-height"></AuthPanel>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.branding-panel {
  background-color: red;
}

.auth-panel {
  background-color: green;
}
</style>
