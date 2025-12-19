<template>
  <div>
    <!-- Page header -->
    <div class="mb-6">
      <div class="d-flex justify-space-between align-center mb-2">
        <div>
          <h1 class="text-h4 font-weight-bold">{{ $t('DASHBOARD.TITLE') }}</h1>
          <p class="text-body-1 text-medium-emphasis">{{ $t('DASHBOARD.SUBTITLE') }}</p>
        </div>
        <v-btn color="primary" prepend-icon="mdi-plus" size="large">
          {{ $t('DASHBOARD.ADD_HABIT') }}
        </v-btn>
      </div>
    </div>

    <!-- Habits list placeholder -->
    <div class="mb-4">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h5 font-weight-bold">{{ $t('DASHBOARD.MY_HABITS') }}</h2>
      </div>

      <v-alert type="info" variant="tonal" class="mb-4">
        <div class="text-body-2">
          {{ $t('HABITS.NO_HABITS') }}. {{ $t('HABITS.CREATE_FIRST_HABIT') }}.
        </div>
      </v-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dashboard view - placeholder with mock data
// Real data will be implemented in Feature 3-6
</script>

<style scoped>
/* Custom styles if needed */
</style>
