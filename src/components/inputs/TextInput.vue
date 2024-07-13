<template>
  <BaseInput
    v-model="model"
    type="text"
    :="$props"
    @clear="emit('clear')"
    @input="emit('input', $event)"
  />
</template>

<script setup lang='ts'>
import BaseInput, { type BaseInputEmits, type BaseInputProps } from '~/components/inputs/BaseInput.vue'

defineComponent({ name: 'TextInput' })
type TextInputProps = {
  label: string
} & Omit<BaseInputProps, 'type'>
defineProps<TextInputProps>()

const model = defineModel<string>()

const emit = defineEmits<BaseInputEmits>()
</script>
