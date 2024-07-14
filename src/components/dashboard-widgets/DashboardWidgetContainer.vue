<template>
  <div class="grid col-span-2 grid-cols-2 md:grid-cols-2 md:flex md:flex-col gap-8">
    <slot />
  </div>
</template>

<script setup lang='ts'>
defineComponent({ name: 'DashboardWidgetContainer' })
</script>
