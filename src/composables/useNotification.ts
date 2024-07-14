import type { WithId } from '~/resources/types'

export type NotificationType = 'success' | 'info' | 'warning' | 'error'

export type NotificationMessage = {
  text: string
  type?: NotificationType
}

export type Notification = NotificationMessage & WithId

type UseNotificationResult = {
  notify: (
    n: NotificationMessage,
    options?: NotificationOptions
  ) => Notification
  activeNotifications: Ref<Notification[]>
}
const activeNotifications = ref<Notification[]>([])

let notificationId = 0

/**
 * Provides a composable function for managing notifications within a Vue application. This composable allows for the creation,
 * display, and automatic dismissal of notifications after a predefined duration. Each notification is uniquely identified and can be
 * programmatically dismissed before the timeout.
 *
 * @returns An object containing:
 * - `notify`: A function that creates and displays a notification with the provided message and options.
 * - `activeNotifications`: A reactive reference to the list of currently active notifications.
 *
 * NOTE: This composable is intended to be used with the `NotificationSnackbar` component.
 **/
export const useNotification = (): UseNotificationResult => {
  const notify = (
    notification: NotificationMessage,
  ) => {
    const id = notificationId++
    const dismiss = () => {
      activeNotifications.value = activeNotifications.value.filter(
        activeNotification => activeNotification.id !== id,
      )
    }

    const newNotification = {
      ...notification,
      id,
    }

    activeNotifications.value = [...activeNotifications.value, newNotification]

    setTimeout(dismiss, 5000)

    return newNotification
  }

  return {
    notify,
    activeNotifications,
  }
}
