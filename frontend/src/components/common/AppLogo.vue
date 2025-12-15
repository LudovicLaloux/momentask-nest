<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
  textColor?: string
  iconType?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  showText: true,
  textColor: '#0F766E',
  iconType: 'mdi-sprout-outline',
})

const sizeConfig = {
  small: {
    icon: 32,
    iconSize: 17,
    borderRadius: '8px',
    fontSize: '1.125rem',
    gap: '0.5rem',
  },
  medium: {
    icon: 48,
    iconSize: 28,
    borderRadius: '12px',
    fontSize: '1.6rem',
    gap: '0.75rem',
  },
  large: {
    icon: 64,
    iconSize: 40,
    borderRadius: '16px',
    fontSize: '2rem',
    gap: '1rem',
  },
}

const config = sizeConfig[props.size]
const iconStyle = computed(() => ({
  width: `${config.icon}px`,
  height: `${config.icon}px`,
  borderRadius: config.borderRadius,
}))

const textStyle = computed(() => ({
  fontSize: config.fontSize,
}))
</script>

<template>
  <div class="app-logo" :style="{ gap: config.gap }">
    <div class="logo-icon" :style="iconStyle">
      <v-icon :icon="iconType" :size="config.iconSize" color="white" />
    </div>
    <h1 v-if="props.showText" class="logo-text" :style="textStyle">{{ $t('COMMON.MOMENTASK') }}</h1>
  </div>
</template>

<style scoped>
.app-logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  background-color: #14b8a6;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.25);
  flex-shrink: 0;
}

.logo-text {
  font-weight: 700;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  margin: 0;
  white-space: nowrap;
  letter-spacing: -0.02em;
}
</style>
