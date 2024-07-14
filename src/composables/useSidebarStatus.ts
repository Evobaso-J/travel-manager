const isSidebarOpen = ref(false)

/**
 * Provides a composable function for managing the open/close status of the app sidebar. This composable exposes a reactive
 * shared state to track the sidebar is open and a method to toggle this state.
 *
 * @returns {Object} An object containing:
 * - `isSidebarOpen`: A Vue ref object that represents the current open/close status of the sidebar. `true` indicates that
 *   the sidebar is open, and `false` indicates that it is closed.
 * - `toggleSidebar`: A function that toggles the value of `isSidebarOpen`, effectively opening the sidebar if it is closed,
 *   and closing it if it is open.
 */
export const useSidebarStatus = () => {
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  return { isSidebarOpen, toggleSidebar }
}
