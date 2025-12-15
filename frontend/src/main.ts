import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import en from './i18n/en.json'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#14B8A6',
          secondary: '#06B6D4',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
          background: '#F0FDFA',
          surface: '#FFFFFF',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2DD4BF',
          secondary: '#22D3EE',
          success: '#34D399',
          warning: '#FBBF24',
          error: '#F87171',
          info: '#60A5FA',
          background: '#111827',
          surface: '#1F2937',
        },
      },
    },
  },
})

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
