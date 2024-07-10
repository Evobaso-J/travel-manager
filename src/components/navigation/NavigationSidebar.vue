<template>
  <button
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
    @click="toggleSidebar"
  >
    <span class="sr-only">Open sidebar</span>
    <FontAwesomeIcon
      :icon="{
        prefix: 'fas',
        iconName: 'bars',
      }"
      size="xl"
    />
  </button>

  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity sm:hidden"
    :class="{ hidden: !isOpen }"
    aria-hidden="true"
    @click="toggleSidebar"
  />
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0
    shadow-md"
    :class="{ 'translate-x-0': isOpen, '-translate-x-full': !isOpen }"
    aria-label="Sidebar"
  >
    <div
      class="h-full px-3 py-4 overflow-y-auto bg-white"
    >
      <NuxtLink
        to="/"
        class="p-2 mb-2 flex items-center cursor-pointer"
      >
        <NuxtImg
          src="/images/logo.png"
          alt="Logo"
          width="40"
          height="40"
          class="mr-4"
        />
        <h1
          class="text-2xl font-semibold text-gray-800"
        >
          Travlog
        </h1>
      </NuxtLink>
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import NavigationLink, { type NavigationLinkProps } from './NavigationLink.vue'

defineComponent({ name: 'NavigationSidebar' })

type NavigationSidebarProps = {
  navItems: NavigationLinkProps[]
}
defineProps<NavigationSidebarProps>()

const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>
