<template>
  <BaseInput
    v-model="model"
    :type="email ? 'email' : 'text'"
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
  email?: boolean
} & Omit<BaseInputProps, 'type'>
defineProps<TextInputProps>()

const model = defineModel<string>()

const emit = defineEmits<BaseInputEmits>()
</script>
