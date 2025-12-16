<script setup lang="ts">
import AuthPanelCheckEmail from './checkEmailForm.vue'
import LogInForm from './logInForm.vue'
import SignInForm from './signInForm.vue'
import { ref } from 'vue'

const userAlreadyExists = ref<boolean | null>(null)

const continueWithEmail = (userExists: boolean) => {
  userAlreadyExists.value = userExists
}
</script>

<template>
  <div class="auth-panel d-flex flex-column justify-center">
    <AuthPanelCheckEmail
      v-if="userAlreadyExists === null"
      @continue-with-email="continueWithEmail"
    />
    <LogInForm v-if="userAlreadyExists === true" />
    <SignInForm v-if="userAlreadyExists === false" />
  </div>
</template>

<style scoped>
.auth-panel {
  background: white;
}
</style>
