<template>
  <InputLayout
    :label
    :prepend-icon="prependIcon"
    :icon-props="iconProps"
  >
    <span>{{ value }}</span>
  </InputLayout>
</template>

<script setup lang='ts'>
import type { InputLayoutProps } from '../inputs/InputLayout.vue'
import InputLayout from '../inputs/InputLayout.vue'

defineComponent({ name: 'TextField' })
type TextFieldProps = {
  value: string
} & InputLayoutProps
defineProps<TextFieldProps>()
</script>
