<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { push } from 'notivue'
import { useI18n } from 'vue-i18n'
import { resetPassword } from '@/services/api/auth.api'
import CreatePassword from './CreatePassword.vue'

const props = defineProps<{
  token: string
}>()

const router = useRouter()
const { t } = useI18n()

const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

const isPasswordValid = computed(() => newPassword.value.length >= 8)

const passwordsMatch = computed(() => {
  if (!confirmPassword.value) return true
  return newPassword.value === confirmPassword.value
})

const isFormValid = computed(() => {
  return isPasswordValid.value && passwordsMatch.value && confirmPassword.value.length > 0
})

const handleReset = async () => {
  if (!isFormValid.value) {
    if (!isPasswordValid.value) {
      push.error(t('RESET_PASSWORD.PASSWORD_LENGTH_ERROR'))
    } else if (!passwordsMatch.value) {
      push.error(t('RESET_PASSWORD.PASSWORDS_DO_NOT_MATCH'))
    }
    return
  }

  isLoading.value = true
  try {
    await resetPassword({
      token: props.token,
      newPassword: newPassword.value,
    })
    push.success(t('RESET_PASSWORD.SUCCESS_MESSAGE'))
    setTimeout(() => {
      router.push('/auth')
    }, 1500)
  } catch (error: unknown) {
    const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message : error
    push.error(errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="reset-password-form d-flex flex-column justify-center">
    <div class="reset-password-container mx-auto d-flex flex-column align-center">
      <h1 class="text-h4 font-weight-bold mb-2">{{ t('RESET_PASSWORD.TITLE') }}</h1>
      <p class="text-body-1 text-grey-darken-1 mb-6">{{ t('RESET_PASSWORD.DESCRIPTION') }}</p>

      <CreatePassword
        :password="newPassword"
        :confirmPassword="confirmPassword"
        @updatePassword="newPassword = $event"
        @updateConfirmPassword="confirmPassword = $event"
        @handle-submit="handleReset"
      />

      <v-btn
        class="mt-4"
        color="primary"
        size="large"
        block
        rounded="lg"
        :loading="isLoading"
        :disabled="!isFormValid"
        @click="handleReset"
      >
        {{ t('RESET_PASSWORD.RESET_PASSWORD_BUTTON') }}
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.reset-password-container {
  min-width: 28rem;
}
</style>
