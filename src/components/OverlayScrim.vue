<template>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-400"
    :class="{ 'opacity-0 pointer-events-none': !isOpen }"
    aria-hidden="true"
    @click="$emit('click')"
  />
</template>

<script setup lang='ts'>
defineComponent({ name: 'OverlayScrim' })
type OverlayScrimProps = {
  isOpen: boolean
}
defineProps<OverlayScrimProps>()

defineEmits(['click'])
</script>
