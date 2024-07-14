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
      @input="emit('input', $event)"
    >
    <button
      type="button"
      class="rounded-full ml-2 hover:bg-gray-200 transition-opacity"
      :class="{
        'opacity-0': !model || !clearable,
      }"
    >
      <FontAwesomeIcon
        :icon="{ prefix: 'fas', iconName: 'close' }"
        class="text-gray-400 aspect-square"
        size="lg"
        @click="clear"
      />
    </button>
  </InputLayout>
</template>

<script setup lang="ts" generic="TModelValue">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import InputLayout, { type InputLayoutProps } from './InputLayout.vue'

export type BaseInputProps = {
  type: HTMLInputElement['type']
  label: string
  clearable?: boolean
} & InputLayoutProps
export type BaseInputEmits = {
  (event: 'input', value: Event): void
  (event: 'clear'): void
}

defineComponent({ name: 'BaseInput' })

defineProps<BaseInputProps>()

type BaseInputSlots = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prependIcon: () => any
}
defineSlots<BaseInputSlots>()

const emit = defineEmits<BaseInputEmits>()

const model = defineModel<TModelValue>()

const clear = () => {
  model.value = undefined
  emit('clear')
}
</script>
