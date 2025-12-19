<template>
  <v-app>
    <AppSidebar ref="sidebarRef" />

    <!-- App bar for mobile -->
    <v-app-bar v-if="mobile" color="surface" elevation="0">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t('LAYOUT.APP_NAME') }}</v-toolbar-title>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import AppSidebar from './AppSidebar.vue'

const { mobile } = useDisplay()
const sidebarRef = ref<InstanceType<typeof AppSidebar> | null>(null)

const toggleDrawer = () => {
  if (sidebarRef.value) {
    sidebarRef.value.drawer = !sidebarRef.value.drawer
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
