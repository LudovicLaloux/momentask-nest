<script setup lang="ts">
import { Notivue, Notification, NotificationProgress } from 'notivue'
</script>

<template>
  <v-app>
    <Notivue v-slot="item">
      <Notification :item="item">
        <NotificationProgress :item="item" />
      </Notification>
    </Notivue>
    <router-view />
  </v-app>
</template>

<style>
* {
  font-family: 'Inter', sans-serif;
}
.v-btn {
  text-transform: none !important;
}
</style>
