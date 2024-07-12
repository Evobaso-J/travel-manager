<template>
  <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-5">
    <slot />
  </section>
</template>

<script setup lang='ts'>
defineComponent({ name: 'FormRow' })
</script>
