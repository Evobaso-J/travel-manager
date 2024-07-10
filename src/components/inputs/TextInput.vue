<template>
  <BaseInput
    v-model="model"
    type="text"
    :placeholder="label"
    :tw-class="twClass"
    :prepend-icon="prependIcon"
    :disabled="disabled"
  />
</template>

<script setup lang='ts'>
import BaseInput, { type BaseInputProps } from '~/components/inputs/BaseInput.vue'

defineComponent({ name: 'TextInput' })
type TextInputProps = {
  label: string
} & Omit<BaseInputProps, 'type'>
defineProps<TextInputProps>()

defineEmits(['input'])

const model = defineModel<string>()
</script>
