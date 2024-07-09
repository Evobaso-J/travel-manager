<template>
  <div :class="`bg-white shadow-md rounded-lg overflow-scroll ${twClass}`">
    <slot />
  </div>
</template>

<script setup lang='ts'>
import { defineComponent } from 'vue'
import type { WithTailwindClass } from '~/types'

defineComponent({
  name: 'BaseCard',
})

// eslint-disable-next-line @typescript-eslint/ban-types
type BaseCardProps = WithTailwindClass & {}

defineProps<BaseCardProps>()
</script>
