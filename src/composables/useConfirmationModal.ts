type ConfirmationModalHandlers = {
  isModalOpen: Ref<boolean>
  confirm: () => void
  cancel: () => void
}

const isModalOpen = ref<boolean>(false)

// We use a ref to store the resolve function of the promise.
// By doing this, we can resolve the promise from outside the promise itself
// and do it from the confirmation modal actions instead

// eslint-disable-next-line @typescript-eslint/ban-types
const resolveRef = ref<Function | undefined>(undefined)

/**
 * Provides functionality to manage a confirmation modal, including opening the modal,
 * and handling confirm or cancel actions with promise-based resolution.
 *
 * The `useConfirmationModal` composable exposes a method to request confirmation (`askConfirmation`)
 * and handlers to manage the confirmation modal's state (`confirmationModalHandlers`).
 *
 * @returns An object containing:
 * - `askConfirmation`: A function that opens the confirmation modal and returns a Promise that resolves to a boolean indicating the user's choice.
 * - `confirmationModalHandlers`: An object with properties and methods to control the modal's visibility and to handle confirm/cancel actions.
 *
 * NOTE: This composable is intended to be used with the `ConfirmationModal` component.
 */
export const useConfirmationModal = (): {
  askConfirmation: () => Promise<boolean>
  confirmationModalHandlers: ConfirmationModalHandlers
} => {
  const resetConfirmation = () => {
    resolveRef.value = undefined
    isModalOpen.value = false
  }

  const askConfirmation = (): Promise<boolean> => {
    isModalOpen.value = true
    return new Promise((resolve) => {
      // We set the value of the resolveRef to the resolve function of the promise,
      // so it can be called later when the user clicks on the confirm button
      resolveRef.value = resolve
    })
  }

  return {
    askConfirmation,
    confirmationModalHandlers: {
      isModalOpen,
      confirm: () => {
        if (!resolveRef.value) return
        resolveRef.value(true)
        resetConfirmation()
      },
      cancel: () => {
        if (!resolveRef.value) return
        resolveRef.value(false)
        resetConfirmation()
      },
    },
  }
}
