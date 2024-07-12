<template>
  <BaseInput
    v-model="model"
    type="text"
    :="$props"
  />
</template>

<script setup lang='ts'>
import BaseInput, { type BaseInputProps } from '~/components/inputs/BaseInput.vue'

defineComponent({ name: 'TextInput' })
type TextInputProps = {
  label: string
} & Omit<BaseInputProps, 'type'>
defineProps<TextInputProps>()

const model = defineModel<string>()
</script>
