<template>
  <section class="grid grid-cols-2 md:grid-cols-12 gap-8 mb-5">
    <slot />
  </section>
</template>

<script setup lang='ts'>
defineComponent({ name: 'DashboardRow' })
</script>
