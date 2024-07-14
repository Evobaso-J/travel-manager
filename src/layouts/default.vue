<template>
  <div class="h-svh bg-slate-100 overflow-scroll">
    <NavigationSidebar
      :nav-items="navItems"
    />
    <div class="p-4 sm:ml-64">
      <slot />
    </div>
    <ConfirmationModal
      :is-open="isModalOpen"
      @confirm="confirm"
      @cancel="cancelConfirmation"
    />
    <NotificationSnackbar
      v-for="(notification, index) in activeNotifications"
      :key="index"
      :notification="notification"
    />
  </div>
</template>

<script setup lang='ts'>
import ConfirmationModal from '~/components/ConfirmationModal.vue'
import type { NavigationLinkProps } from '~/components/navigation/NavigationLink.vue'
import NavigationSidebar from '~/components/navigation/NavigationSidebar.vue'
import NotificationSnackbar from '~/components/NotificationSnackbar.vue'

defineComponent({ name: 'DefaultLayout' })

const { activeNotifications } = useNotification()
const { confirmationModalHandlers: {
  cancel: cancelConfirmation,
  confirm,
  isModalOpen,
} } = useConfirmationModal()

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
