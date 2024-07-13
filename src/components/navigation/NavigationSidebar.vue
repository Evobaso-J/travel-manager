<template>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity sm:hidden z-50"
    :class="{ hidden: !isSidebarOpen }"
    aria-hidden="true"
    @click="toggleSidebar"
  />
  <aside
    class="fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0
    shadow-md"
    :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }"
    aria-label="Sidebar"
  >
    <div
      class="h-full px-3 py-4 overflow-y-auto bg-white"
    >
      <AppLogo class="p-2 mb-2" />
      <ul class="space-y-2 font-medium">
        <h3
          class="text-sm"
        >
          Menu
        </h3>

        <template
          v-for="({ text, to, prependIcon }, index) in navItems"
          :key="index"
        >
          <NavigationLink
            :to
            :text
            :prepend-icon="prependIcon"
            @click="toggleSidebar"
          />
        </template>
      </ul>
    </div>
  </aside>
</template>

<script setup lang='ts'>
import NavigationLink, { type NavigationLinkProps } from './NavigationLink.vue'
import AppLogo from './AppLogo.vue'

defineComponent({ name: 'NavigationSidebar' })

type NavigationSidebarProps = {
  navItems: NavigationLinkProps[]
}
defineProps<NavigationSidebarProps>()

const { isSidebarOpen, toggleSidebar } = useSidebarStatus()
</script>
