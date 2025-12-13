<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const form = ref(false)
const email = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  if (!form.value) return
  try {
    loading.value = true
    await useAuthStore().register(email.value, password.value)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-sheet class="bg-deep-purple pa-12 w-100 h-100 d-flex align-center justify-center" rounded>
    <v-card class="mx-auto px-6 py-8" width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          label="Password"
          placeholder="Enter your password"
          clearable
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style scoped></style>
