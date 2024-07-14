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
