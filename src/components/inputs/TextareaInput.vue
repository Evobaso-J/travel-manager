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
      @input="emit('input', $event)"
    />
  </InputLayout>
</template>

<script setup lang="ts">
import type { BaseInputEmits, BaseInputProps } from './BaseInput.vue'
import InputLayout from './InputLayout.vue'

export type TextareaInputProps = Omit<BaseInputProps, 'type' | 'clearable'>
defineComponent({ name: 'TextareaInput' })
defineProps<TextareaInputProps>()

type BaseInputSlots = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prependIcon: () => any
}
defineSlots<BaseInputSlots>()

const model = defineModel<string>()

const emit = defineEmits<BaseInputEmits>()
</script>
