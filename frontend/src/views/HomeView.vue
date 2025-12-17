<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
  <div>
    <p>{{ user }}</p>
  </div>
</template>
