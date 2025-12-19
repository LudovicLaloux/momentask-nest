<template>
  <div>
    <!-- Page header -->
    <div class="mb-6">
      <div class="d-flex justify-space-between align-center mb-2">
        <div>
          <h1 class="text-h4 font-weight-bold">{{ $t('HABITS.TITLE') }}</h1>
          <p class="text-body-1 text-medium-emphasis">{{ $t('HABITS.SUBTITLE') }}</p>
        </div>
        <v-btn color="primary" prepend-icon="mdi-plus" size="large">
          {{ $t('DASHBOARD.ADD_HABIT') }}
        </v-btn>
      </div>
    </div>

    <!-- Empty state -->
    <v-card>
      <v-card-text class="text-center py-12">
        <v-icon size="64" color="grey-lighten-1">mdi-format-list-checks</v-icon>
        <h3 class="text-h6 mt-4 mb-2">{{ $t('HABITS.NO_HABITS') }}</h3>
        <p class="text-body-2 text-medium-emphasis mb-4">
          {{ $t('HABITS.CREATE_FIRST_HABIT') }}
        </p>
        <v-btn color="primary" prepend-icon="mdi-plus">
          {{ $t('DASHBOARD.ADD_HABIT') }}
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
// Habits view - placeholder
// CRUD functionality will be implemented in Feature 3
</script>

<style scoped>
/* Custom styles if needed */
</style>
