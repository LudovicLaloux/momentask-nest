import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Notivue
import { createNotivue } from 'notivue'
import 'notivue/notifications.css'
import 'notivue/animations.css'
import 'notivue/notification-progress.css'

// Icons (mdi, Lucide)
import { mdi } from 'vuetify/iconsets/mdi'
import * as LucideIcons from 'lucide-vue-next'
const lucideIconSet = {
  component: (props: any) => {
    const iconName =
      typeof props.icon === 'string'
        ? props.icon
            .split('-')
            .map((s: any) => s.charAt(0).toUpperCase() + s.slice(1))
            .join('')
        : props.icon
    const LucideIcon = (LucideIcons as any)[iconName]
    return typeof LucideIcon === 'function' ? h(LucideIcon, { ...props }) : null
  },
}

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: { lucide: lucideIconSet, mdi },
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
          background: '#F3F4F6',
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

const notivue = createNotivue({
  position: 'top-right',
  limit: 4,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 4000,
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(notivue)

app.mount('#app')
