<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { push } from 'notivue'
import { useAuthStore } from '@/stores/auth'
import { forgotPassword } from '@/services/api/auth.api'

const router = useRouter()
const authStore = useAuthStore()

const { t } = useI18n()

const props = defineProps<{
  email: string
}>()

const emits = defineEmits(['goBack'])

const password = ref('')

const showPassword = ref(false)
const isPasswordValid = computed(() => password.value.length >= 8)
const errorMessage = ref('')

const handleLogIn = async () => {
  if (!isPasswordValid.value) return

  const { success, error } = await authStore.logIn(props.email, password.value)
  if (success) {
    router.push('/home')
  }
  if (error && error.status === 401) {
    errorMessage.value = t('AUTH_PANEL.INVALID_CREDENTIALS')
  }
}

const sendForgotPassword = async () => {
  await forgotPassword({ email: props.email })
  push.success(t('AUTH_PANEL.FORGOT_PASSWORD_CONFIRMATION'))
}
</script>

<template>
  <div class="auth-panel-login-form mx-auto d-flex flex-column align-center">
    <h1>{{ t('AUTH_PANEL.WELCOME_BACK') }}</h1>
    <p class="mt-2 text-center sign-in-subtitle">{{ t('AUTH_PANEL.CONNECT_TO_CONTINUE') }}</p>

    <!-- Email (read-only with back button) -->
    <div class="w-100 mt-6 d-flex align-center ga-2">
      <v-text-field
        class="flex-grow-1"
        rounded="lg"
        bg-color="#e2e4e9"
        density="comfortable"
        :model-value="props.email"
        type="email"
        variant="solo"
        flat
        prepend-inner-icon="mdi-email-outline"
        readonly
      >
        <template #prepend-inner>
          <v-btn icon="mdi-arrow-left" variant="text" size="small" @click="emits('goBack')" />
        </template>
      </v-text-field>
    </div>

    <!-- Password -->
    <div class="w-100">
      <div class="d-flex justify-space-between align-center">
        <div class="font-weight-medium">{{ t('AUTH_PANEL.PASSWORD') }}</div>
        <span
          class="text-primary text-decoration-none text-caption cursor-pointer"
          @click="sendForgotPassword"
          >{{ t('AUTH_PANEL.FORGOT_PASSWORD') }}</span
        >
      </div>
      <v-text-field
        class="w-100 mt-2"
        rounded="lg"
        v-model="password"
        :placeholder="t('AUTH_PANEL.PASSWORD_PLACEHOLDER')"
        autofocus
        density="compact"
        :type="showPassword ? 'text' : 'password'"
        variant="outlined"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :error="!!errorMessage"
        :error-messages="errorMessage"
        @click:append-inner="showPassword = !showPassword"
        @keydown.enter="isPasswordValid ? handleLogIn : null"
      />
    </div>

    <!-- Submit button -->
    <div class="w-100 mt-2">
      <v-btn
        size="large"
        color="primary"
        block
        rounded="lg"
        :disabled="!isPasswordValid || authStore.isLoading"
        :loading="authStore.isLoading"
        @click="handleLogIn"
      >
        {{ t('AUTH_PANEL.CONNECT_BUTTON') }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="css" scoped>
.auth-panel-login-form {
  min-width: 28rem;
}
</style>
