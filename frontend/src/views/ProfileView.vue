<template>
  <div>
    <!-- Page header -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold mb-2">{{ $t('PROFILE.TITLE') }}</h1>
      <p class="text-body-1 text-medium-emphasis">{{ $t('PROFILE.SUBTITLE') }}</p>
    </div>

    <!-- User info card -->
    <v-card class="mb-6">
      <v-card-text>
        <div class="d-flex align-center mb-4">
          <v-avatar color="primary" size="64" class="mr-4">
            <v-icon size="32">mdi-account</v-icon>
          </v-avatar>
          <div>
            <h2 class="text-h6 font-weight-bold">{{ userName }}</h2>
            <p class="text-body-2 text-medium-emphasis">{{ userEmail }}</p>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Settings placeholder -->
    <v-card>
      <v-card-text class="text-center py-12">
        <v-icon size="64" color="grey-lighten-1">mdi-cog</v-icon>
        <h3 class="text-h6 mt-4 mb-2">Settings</h3>
        <p class="text-body-2 text-medium-emphasis">
          Profile settings will be implemented in a future feature
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const userName = computed(() => {
  const user = authStore.user
  if (user?.firstname && user?.lastname) {
    return `${user.firstname} ${user.lastname}`
  }
  if (user?.firstname) {
    return user.firstname
  }
  return 'User'
})

const userEmail = computed(() => authStore.user?.email || '')
</script>

<style scoped>
/* Custom styles if needed */
</style>
