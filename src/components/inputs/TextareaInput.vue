<template>
  <InputLayout
    :label="label"
    :prepend-icon="prependIcon"
    :icon-props="iconProps"
  >
    <textarea
      v-bind="$attrs"
      v-model="model"
      class="group w-full h-full bg-transparent focus:outline-none resize-none"
      :disabled
      :rows="4"
      @input="$emit('input', $event)"
    />
  </InputLayout>
</template>

<script setup lang="ts">
import InputLayout, { type InputLayoutProps } from './InputLayout.vue'

export type BaseInputProps = {
  disabled?: boolean
  label: string
} & InputLayoutProps
defineComponent({ name: 'TextareaInput' })
defineProps<BaseInputProps>()

type BaseInputSlots = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prependIcon: () => any
}
defineSlots<BaseInputSlots>()

defineEmits(['input'])

const model = defineModel<string>()
</script>
