<template>
  <InputLayout
    :label
    :prepend-icon="prependIcon"
    :icon-props="iconProps"
  >
    <span
      :class="{
        'line-clamp-6': lines === 6,
        'line-clamp-5': lines === 5,
        'line-clamp-4': lines === 4,
        'line-clamp-3': lines === 3,
        'line-clamp-2': lines === 2,
        'line-clamp-1': lines === 1,
      }"
    >{{ value }}</span>
  </InputLayout>
</template>

<script setup lang='ts'>
import type { InputLayoutProps } from '../inputs/InputLayout.vue'
import InputLayout from '../inputs/InputLayout.vue'

defineComponent({ name: 'TextField' })
type TextFieldProps = {
  value: string
  lines?: 1 | 2 | 3 | 4 | 5 | 6
} & InputLayoutProps
defineProps<TextFieldProps>()
</script>
