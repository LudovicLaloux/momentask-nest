<script setup lang="ts">
import { ref } from 'vue'
import CheckEmailForm from './CheckEmailForm.vue'
import LogInForm from './LogInForm.vue'
import RegisterForm from './RegisterForm.vue'
import { checkEmail } from '@/services/api/auth.api'

const email = ref('')
const userAlreadyExists = ref<boolean | null>(null)
const isCheckingEmail = ref(false)

const checkEmailExists = async () => {
  isCheckingEmail.value = true
  try {
    const { data } = await checkEmail(email.value)
    userAlreadyExists.value = data.exists
  } finally {
    isCheckingEmail.value = false
  }
}
</script>

<template>
  <div class="auth-panel d-flex flex-column justify-center">
    <Transition name="slide-fade" mode="out-in">
      <CheckEmailForm
        v-if="userAlreadyExists === null"
        v-model="email"
        :isLoading="isCheckingEmail"
        @checkEmailExists="checkEmailExists"
      />
      <LogInForm
        v-else-if="userAlreadyExists === true"
        :email="email"
        @goBack="userAlreadyExists = null"
      />
      <RegisterForm
        v-else-if="userAlreadyExists === false"
        :email="email"
        @goBack="userAlreadyExists = null"
      />
    </Transition>
  </div>
</template>

<style scoped>
.auth-panel {
  background: white;
}

/* Transitions - Consistent with BrandingCarousel */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
