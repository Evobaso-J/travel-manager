<template>
  <div class="h-svh bg-slate-100 overflow-scroll">
    <NavigationSidebar
      :nav-items="navItems"
    />
    <div class="p-4 sm:ml-64">
      <slot />
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { NavigationLinkProps } from '~/components/navigation/NavigationLink.vue'
import NavigationSidebar from '~/components/navigation/NavigationSidebar.vue'

defineComponent({ name: 'DefaultLayout' })

const navItems = [
  {
    text: 'Dashboard',
    to: '/',
    prependIcon: {
      prefix: 'fas',
      iconName: 'chart-line',
    },
  },
  {
    text: 'Travels',
    to: '/travels',
    prependIcon: {
      prefix: 'fas',
      iconName: 'compass',
    },
  },
  {
    text: 'Bookings',
    to: '/bookings',
    prependIcon: {
      prefix: 'fas',
      iconName: 'list-check',
    },
  },
] as const satisfies NavigationLinkProps[]
</script>
