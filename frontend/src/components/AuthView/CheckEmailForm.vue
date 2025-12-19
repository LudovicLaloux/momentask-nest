<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emits = defineEmits(['checkEmailExists', 'update:modelValue'])

const props = defineProps<{
  modelValue: string
  isLoading?: boolean
}>()

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isEmailValid = computed(() => {
  if (!props.modelValue) return false
  return emailRegex.test(props.modelValue)
})
</script>

<template>
  <div class="auth-panel-check-email mx-auto d-flex flex-column align-center">
    <h1>{{ t('AUTH_PANEL.WELCOME') }}</h1>
    <p class="mt-2">{{ t('AUTH_PANEL.ENTER_EMAIL') }}</p>
    <div class="w-100 mt-4">
      <div class="font-weight-medium">{{ $t('AUTH_PANEL.EMAIL') }}</div>
      <v-text-field
        class="w-100 mt-2"
        rounded="lg"
        :model-value="props.modelValue"
        @update:model-value="emits('update:modelValue', $event)"
        :placeholder="`${t('AUTH_PANEL.EMAIL_NAME')}@${t('AUTH_PANEL.EMAIL_EXTENSION')}`"
        density="compact"
        type="email"
        variant="outlined"
        prepend-inner-icon="mdi-email-outline"
        @keydown.enter="isEmailValid ? emits('checkEmailExists') : null"
      ></v-text-field>
    </div>
    <div class="d-flex flex-column w-100 mt-2 ga-8">
      <v-btn
        size="large"
        color="primary"
        block
        rounded="lg"
        :disabled="!isEmailValid || isLoading"
        :loading="isLoading"
        @click="emits('checkEmailExists')"
      >
        {{ t('COMMON.CONTINUE') }}
      </v-btn>
      <div class="d-flex align-center w-100">
        <v-divider />
        <span class="text-body-2 text-uppercase text-disabled">{{ t('COMMON.OR') }}</span>
        <v-divider />
      </div>
      <v-btn size="large" variant="outlined" block rounded="lg">
        <template #prepend>
          <v-img width="24" height="24" src="/googleIcon.svg" />
        </template>
        {{ t('AUTH_PANEL.CONTINUE_GOOGLE') }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="css" scoped>
.auth-panel-check-email {
  min-width: 28rem;
}
</style>
