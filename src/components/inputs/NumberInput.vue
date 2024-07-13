<template>
  <BaseInput
    v-model="model"
    type="number"
    :="$props"
    @clear="emit('clear')"
    @input="emit('input', $event)"
  />
</template>

<script setup lang='ts'>
import BaseInput, { type BaseInputEmits, type BaseInputProps } from '~/components/inputs/BaseInput.vue'

defineComponent({ name: 'NumberInput' })
  type NumberInputProps = {
    label: string
  } & Omit<BaseInputProps, 'type'>
defineProps<NumberInputProps>()

const model = defineModel<number>()

const emit = defineEmits<BaseInputEmits>()
</script>
