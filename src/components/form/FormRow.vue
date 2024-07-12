<template>
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
    <slot />
  </section>
</template>

<script setup lang='ts'>
defineComponent({ name: 'FormRow' })
</script>
