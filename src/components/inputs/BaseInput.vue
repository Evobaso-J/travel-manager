<template>
  <div
    class="flex items-center w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus-within:border-primary-500"
    :class="{ 'cursor-not-allowed': disabled, [twClass ?? '']: true }"
  >
    <FontAwesomeIcon
      v-if="prependIcon"
      :icon="prependIcon"
      class="mr-2"
    />
    <input
      v-bind="$attrs"
      :type
      class="group w-full h-full bg-transparent focus:outline-none"
      :disabled
    >
  </div>
</template>

<script setup lang="ts">
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/vue-fontawesome'
import type { WithTailwindClass } from '~/types'

defineComponent({ name: 'BaseInput' })
export type BaseInputProps = {
  type: HTMLInputElement['type']
  disabled?: boolean
  prependIcon?: FontAwesomeIconProps['icon']
} & WithTailwindClass
defineProps<BaseInputProps>()

type BaseInputSlots = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prependIcon: () => any
}
defineSlots<BaseInputSlots>()
</script>
