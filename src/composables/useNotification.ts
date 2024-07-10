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
