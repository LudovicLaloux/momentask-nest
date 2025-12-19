<script setup lang="ts">
import { ref } from 'vue'
import CheckEmailForm from './CheckEmailForm.vue'
import LogInForm from './LogInForm.vue'
import RegisterForm from './RegisterForm.vue'
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
    <CheckEmailForm
      v-if="userAlreadyExists === null"
      v-model="email"
      @checkEmailExists="checkEmailExists"
    />
    <LogInForm
      v-if="userAlreadyExists === true"
      :email="email"
      @goBack="userAlreadyExists = null"
    />
    <RegisterForm
      v-if="userAlreadyExists === false"
      :email="email"
      @goBack="userAlreadyExists = null"
    />
  </div>
</template>

<style scoped>
.auth-panel {
  background: white;
}
</style>
