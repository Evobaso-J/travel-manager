<template>
  <NuxtLink
    to="/"
    class="flex items-center cursor-pointer"
    @click="toggleSidebar"
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
</template>

<script setup lang='ts'>
defineComponent({ name: 'AppLogo' })

const { toggleSidebar } = useSidebarStatus()
</script>
