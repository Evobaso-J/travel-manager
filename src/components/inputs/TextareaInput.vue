<template>
  <label>
    <span class="block text-sm text-gray-700">{{ label }}</span>
    <div
      class="flex items-center w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus-within:border-primary-500"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <FontAwesomeIcon
        v-if="prependIcon"
        :icon="prependIcon"
        class="mr-2"
      />
      <textarea
        v-bind="$attrs"
        v-model="model"
        class="group w-full h-full bg-transparent focus:outline-none resize-none"
        :disabled
        :rows="4"
        @input="$emit('input', $event)"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/vue-fontawesome'

export type BaseInputProps = {
  disabled?: boolean
  prependIcon?: FontAwesomeIconProps['icon']
  label: string
}
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
