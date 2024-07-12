<template>
  <BaseInput
    v-model="model"
    type="number"
    :="$props"
  />
</template>

<script setup lang='ts'>
import BaseInput, { type BaseInputProps } from '~/components/inputs/BaseInput.vue'

defineComponent({ name: 'NumberInput' })
  type NumberInputProps = {
    label: string
  } & Omit<BaseInputProps, 'type'>
defineProps<NumberInputProps>()

const model = defineModel<number>()
</script>
