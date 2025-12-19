<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  password: string
  confirmPassword: string
}>()

const emits = defineEmits(['updatePassword', 'updateConfirmPassword', 'handleSubmit'])

const { t } = useI18n()

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const currentPassword = computed({
  get() {
    return props.password
  },
  set(newValue) {
    emits('updatePassword', newValue)
  },
})

const currentConfirmPassword = computed({
  get() {
    return props.confirmPassword
  },
  set(newValue) {
    emits('updateConfirmPassword', newValue)
  },
})

// Validation
const doPasswordsMatch = computed(() => props.password === props.confirmPassword)
const passwordRules = computed(() => {
  return [(v: string) => v.length >= 8 || t('AUTH_PANEL.PASSWORD_LENGTH_ERROR')]
})
</script>

<template>
  <div class="create-password w-100">
    <div class="font-weight-medium">{{ t('AUTH_PANEL.PASSWORD') }}</div>
    <v-text-field
      class="w-100 mt-2"
      rounded="lg"
      v-model="currentPassword"
      :placeholder="t('AUTH_PANEL.PASSWORD_PLACEHOLDER')"
      density="compact"
      :type="showPassword ? 'text' : 'password'"
      variant="outlined"
      prepend-inner-icon="mdi-lock-outline"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="showPassword = !showPassword"
      :rules="passwordRules"
      @keydown.enter="emits('handleSubmit')"
    />
  </div>

  <!-- Confirm Password -->
  <div class="w-100">
    <div class="font-weight-medium">{{ t('AUTH_PANEL.CONFIRM_PASSWORD') }}</div>
    <v-text-field
      class="w-100 mt-2"
      rounded="lg"
      v-model="currentConfirmPassword"
      :placeholder="t('AUTH_PANEL.PASSWORD_PLACEHOLDER')"
      density="compact"
      :type="showConfirmPassword ? 'text' : 'password'"
      variant="outlined"
      prepend-inner-icon="mdi-lock-outline"
      :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="showConfirmPassword = !showConfirmPassword"
      :error="confirmPassword !== '' && !doPasswordsMatch"
      :error-messages="
        confirmPassword !== '' && !doPasswordsMatch ? [t('AUTH_PANEL.PASSWORDS_DO_NOT_MATCH')] : []
      "
      @keydown.enter="emits('handleSubmit')"
    />
  </div>
</template>
