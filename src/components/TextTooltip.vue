<template>
  <div class="relative">
    <div
      class="absolute z-50 p-2 text-xs bg-gray-800 text-white rounded-md transition-opacity duration-300 opacity-0"
      :class="{
        'opacity-100': isOpen,
        'invisible': !isOpen,
        'top-[-3rem]': position === 'top',
        'bottom-[-3rem]': position === 'bottom',
        'left-[-21rem]': position === 'left',
        'right-[-21rem]': position === 'right',
      }"
    >
      {{ text }}
    </div>
    <div
      class="cursor-help"
      @mouseenter="toggleTooltip"
      @mouseleave="toggleTooltip"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { WithTailwindClass } from '~/types'

defineComponent({ name: 'TextTooltip' })
type TextTooltipProps = {
  text: string
  position: 'top' | 'bottom' | 'left' | 'right'
} & WithTailwindClass

withDefaults(defineProps<TextTooltipProps>(), { position: 'top' })

const isOpen = ref(false)
const toggleTooltip = () => {
  isOpen.value = !isOpen.value
}
</script>
