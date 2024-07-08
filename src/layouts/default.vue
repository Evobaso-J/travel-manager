<template>
  <div>
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
  },
  {
    text: 'Travels',
    to: '/travels',
  },
  {
    text: 'Bookings',
    to: '/bookings',
  },
] as const satisfies NavigationLinkProps[]
</script>
