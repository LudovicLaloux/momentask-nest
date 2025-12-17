<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const user = computed(() => authStore.user)

const handleLogout = () => {
  authStore.logout()
  router.push('/auth')
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-title>Momentask</v-app-bar-title>
      <v-spacer />
      <v-btn icon @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card class="mx-auto mt-8" max-width="600">
          <v-card-title class="text-h5"> Bienvenue sur Momentask ! </v-card-title>
          <v-card-text v-if="user">
            <p class="text-body-1 mb-2"><strong>Email :</strong> {{ user.email }}</p>
            <p class="text-body-1 mb-2" v-if="user.firstname || user.lastname">
              <strong>Nom :</strong>
              {{ user.firstname || '' }} {{ user.lastname || '' }}
            </p>
            <v-divider class="my-4" />
            <p class="text-body-2 text-disabled">
              Feature 2 - Dashboard et habitudes - En développement
            </p>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
