<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    :permanent="!mobile"
    :temporary="mobile"
    class="app-sidebar"
    color="surface"
  >
    <!-- Header with logo -->
    <AppLogo class="pa-4" />

    <v-divider class="mb-2"></v-divider>

    <!-- Main navigation -->
    <v-list nav density="comfortable" class="py-2">
      <v-list-item
        v-for="item in navigationItems"
        :key="item.route"
        :to="item.route"
        :prepend-icon="item.icon"
        :title="item.title"
        color="primary"
        rounded="lg"
        class="mx-2 mb-1"
      ></v-list-item>
    </v-list>

    <!-- User menu at bottom -->
    <template #append>
      <div class="pa-2">
        <v-menu location="top">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-avatar="userAvatar"
              :title="userName"
              :subtitle="rail ? undefined : userEmail"
              rounded="lg"
              class="user-menu-item"
            >
              <template #append>
                <v-icon v-if="!rail">mdi-chevron-up</v-icon>
              </template>
            </v-list-item>
          </template>

          <v-list density="compact" class="py-1">
            <v-list-item
              :title="$t('LAYOUT.PROFILE')"
              prepend-icon="mdi-account"
              to="/profile"
            ></v-list-item>
            <v-list-item :title="$t('LAYOUT.SETTINGS')" prepend-icon="mdi-cog"></v-list-item>
            <v-list-item
              :title="isDark ? $t('LAYOUT.LIGHT_MODE') : $t('LAYOUT.DARK_MODE')"
              :prepend-icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'"
              @click="toggleTheme"
            ></v-list-item>

            <v-divider class="my-1"></v-divider>

            <v-list-item
              :title="$t('LAYOUT.LOGOUT')"
              prepend-icon="mdi-logout"
              @click="handleLogout"
            ></v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AppLogo from '@/components/common/AppLogo.vue'

const { t } = useI18n()
const theme = useTheme()
const { mobile } = useDisplay()
const authStore = useAuthStore()
const router = useRouter()

// État du drawer
const drawer = ref(true)
const rail = ref(false)

// Items de navigation
const navigationItems = computed(() => [
  {
    title: t('LAYOUT.DASHBOARD'),
    icon: 'lucide:layout-dashboard',
    route: '/dashboard',
  },
  {
    title: t('LAYOUT.HABITS'),
    icon: 'lucide:sprout',
    route: '/habits',
  },
])

// User information
const userName = computed(() => {
  const user = authStore.user
  if (user?.firstname && user?.lastname) {
    return `${user.firstname} ${user.lastname}`
  }
  if (user?.firstname) {
    return user.firstname
  }
  return 'User'
})

const userEmail = computed(() => authStore.user?.email || '')

const userAvatar = computed(() => {
  // For now we use a default avatar
  // Later we can use authStore.user?.avatar
  return undefined
})

// Theme
const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
  // TODO: Save theme preference to database (Feature 8)
}

// Logout
const handleLogout = () => {
  authStore.logout()
  router.push('/auth')
}

// Expose drawer to control it from parent
defineExpose({
  drawer,
  rail,
})
</script>

<style scoped>
.app-sidebar {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.sidebar-header {
  min-height: 64px;
}

.user-menu-item {
  cursor: pointer;
}

.user-menu-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style>
