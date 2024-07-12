<template>
  <label>
    <span class="block text-sm text-gray-700">{{ label }}</span>
    <div
      class="flex items-center w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus-within:border-primary-500"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <FontAwesomeIcon
        v-if="prependIcon"
        :icon="prependIcon"
        v-bind="iconProps"
        class="mr-2"
      />
      <slot />
    </div>
  </label>
</template>

<script setup lang='ts'>
import type { FontAwesomeIconProps, FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'InputLayout' })

export type InputLayoutProps = {
  label: string
  prependIcon?: FontAwesomeIconProps['icon']
  iconProps?: Omit<FontAwesomeIconProps, 'icon'>
  disabled?: boolean
}
defineProps<InputLayoutProps>()
</script>
