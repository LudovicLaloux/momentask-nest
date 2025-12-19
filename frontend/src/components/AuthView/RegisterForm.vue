<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import CreatePassword from './CreatePassword.vue'

const router = useRouter()
const { t } = useI18n()

const emits = defineEmits(['goBack'])

const props = defineProps<{
  email: string
}>()

const authStore = useAuthStore()

// Form fields
const firstname = ref('')
const lastname = ref('')
const password = ref('')
const confirmPassword = ref('')

// Validation
const isPasswordValid = computed(() => password.value.length >= 8)
const doPasswordsMatch = computed(() => password.value === confirmPassword.value)
const isFormValid = computed(() => {
  return (
    isPasswordValid.value &&
    doPasswordsMatch.value &&
    password.value !== '' &&
    confirmPassword.value !== ''
  )
})

const handleRegister = async () => {
  if (!isFormValid.value) return

  await authStore.register(props.email, password.value, firstname.value, lastname.value)
  router.push('/home')
}
</script>

<template>
  <div class="auth-panel-register mx-auto d-flex flex-column align-center">
    <h1>{{ t('AUTH_PANEL.CREATE_ACCOUNT') }}</h1>
    <p class="mt-2 text-center sign-in-subtitle">{{ t('AUTH_PANEL.START_TRACKING') }}</p>

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

    <!-- Firstname and Lastname (side by side) -->
    <div class="w-100 d-flex ga-4">
      <div class="flex-1-1">
        <div class="font-weight-medium">
          {{ t('AUTH_PANEL.FIRSTNAME') }}
          <span class="text-caption text-disabled">{{ t('AUTH_PANEL.OPTIONAL') }}</span>
        </div>
        <v-text-field
          class="w-100 mt-2"
          rounded="lg"
          v-model="firstname"
          :placeholder="t('AUTH_PANEL.FIRSTNAME_PLACEHOLDER')"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-account-outline"
        />
      </div>
      <div class="flex-1-1">
        <div class="font-weight-medium">
          {{ t('AUTH_PANEL.LASTNAME') }}
          <span class="text-caption text-disabled">{{ t('AUTH_PANEL.OPTIONAL') }}</span>
        </div>
        <v-text-field
          class="w-100 mt-2"
          rounded="lg"
          v-model="lastname"
          :placeholder="t('AUTH_PANEL.LASTNAME_PLACEHOLDER')"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-account-outline"
        />
      </div>
    </div>

    <CreatePassword
      :password="password"
      :confirmPassword="confirmPassword"
      @updatePassword="password = $event"
      @updateConfirmPassword="confirmPassword = $event"
      @handle-submit="handleRegister"
    />

    <!-- Submit button -->
    <div class="w-100 mt-2">
      <v-btn
        size="large"
        color="primary"
        block
        rounded="lg"
        :disabled="!isFormValid || authStore.isLoading"
        :loading="authStore.isLoading"
        @click="handleRegister"
      >
        {{ t('AUTH_PANEL.CREATE_ACCOUNT_BUTTON') }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="css" scoped>
.auth-panel-register {
  min-width: 28rem;
}

.sign-in-subtitle {
  color: hsl(220 10% 45%);
}
</style>
