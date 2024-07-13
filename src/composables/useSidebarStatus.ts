const isSidebarOpen = ref(false)

export const useSidebarStatus = () => {
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  return { isSidebarOpen, toggleSidebar }
}
