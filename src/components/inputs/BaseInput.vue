<template>
  <InputLayout
    :label="label"
    :prepend-icon="prependIcon"
    :icon-props="iconProps"
  >
    <input
      v-bind="$attrs"
      v-model="model"
      :type
      class="group w-full h-full bg-transparent focus:outline-none"
      :disabled
      @input="$emit('input', $event)"
    >
  </InputLayout>
</template>

<script setup lang="ts" generic="TModelValue">
import InputLayout, { type InputLayoutProps } from './InputLayout.vue'

export type BaseInputProps = {
  type: HTMLInputElement['type']
  label: string
} & InputLayoutProps
defineComponent({ name: 'BaseInput' })
defineProps<BaseInputProps>()

type BaseInputSlots = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prependIcon: () => any
}
defineSlots<BaseInputSlots>()

defineEmits(['input'])

const model = defineModel<TModelValue>()
</script>
