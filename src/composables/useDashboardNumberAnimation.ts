/**
 * Creates a reactive value that animates from 0 to a target number over a specified duration. This composable is useful for
 * dashboard number animations where numbers count up to their final value when the component mounts.
 *
 * @param {number} targetValue - The final value the animation should count up to.
 * @returns {Ref<number>} A Vue ref object containing the current value of the animation. This value starts at 0 and
 * increments in steps until it reaches or surpasses the target value.
 */
export const useDashboardNumberAnimation = (targetValue: number) => {
  const currentValue = ref(0)
  const maxAnimationDuration = 1000 // Total animation duration in milliseconds

  onMounted(() => {
    const valueDifference = targetValue - currentValue.value
    const desiredSteps = 100 // Define a fixed number of steps for the animation
    // Ensure stepValue is at least 1 to prevent stalling for small differences
    const stepValue = Math.max(1, Math.round(valueDifference / desiredSteps))
    const intervalSpeed = maxAnimationDuration / desiredSteps

    if (valueDifference > 0) {
      const interval = setInterval(() => {
        if (currentValue.value < targetValue) {
          currentValue.value += stepValue
          return
        }
        clearInterval(interval)
      }, intervalSpeed)
    }
  })

  return currentValue
}
