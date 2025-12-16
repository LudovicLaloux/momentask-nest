<script setup lang="ts">
import { ref } from 'vue'
import AuthPanelCheckEmail from './checkEmailForm.vue'
import LogInForm from './logInForm.vue'
import SignInForm from './signInForm.vue'
import { checkEmail } from '@/services/api/auth.api'

const email = ref('')
const userAlreadyExists = ref<boolean | null>(null)

const checkEmailExists = async () => {
  const { data } = await checkEmail(email.value)
  userAlreadyExists.value = data.exists
}
</script>

<template>
  <div class="auth-panel d-flex flex-column justify-center">
    <AuthPanelCheckEmail
      v-if="userAlreadyExists === null"
      v-model="email"
      @checkEmailExists="checkEmailExists"
    />
    <LogInForm v-if="userAlreadyExists === true" :email="email" />
    <SignInForm v-if="userAlreadyExists === false" :email="email" />
  </div>
</template>

<style scoped>
.auth-panel {
  background: white;
}
</style>
