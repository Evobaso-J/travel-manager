<template>
  <div
    class="bg-white shadow-md rounded-lg overflow-scroll p-4"
  >
    <slot />
  </div>
</template>

<script setup lang='ts'>
import { defineComponent } from 'vue'

defineComponent({
  name: 'BaseCard',
})
</script>
