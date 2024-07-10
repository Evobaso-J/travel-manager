<template>
  <div
    class="p-4 fixed bottom-8 left-1/2 rounded-lg text-white text-sm shadow-lg z-50
    -translate-x-1/2"
    :class="{
      'bg-green-500': notification.type === 'success',
      'bg-red-500': notification.type === 'error',
      'bg-yellow-500': notification.type === 'warning',
      'bg-blue-500': notification.type === 'info',
    }"
  >
    {{ notification.text }}
  </div>
</template>

<script setup lang='ts'>
import type { Notification } from '~/composables/useNotification'

defineComponent({ name: 'NotificationSnackbar' })
type NotificationSnackbarProps = {
  notification: Notification
}
defineProps<NotificationSnackbarProps>()
</script>
