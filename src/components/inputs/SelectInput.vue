<template>
  <InputLayout
    :label="label"
    :prepend-icon="prependIcon"
    :icon-props="iconProps"
  >
    <select
      v-bind="$attrs"
      v-model="model"
      class="group w-full h-full bg-transparent focus:outline-none"
      :disabled
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        <slot
          :index
          name="option"
          :option
        >
          {{ option.text }}
        </slot>
      </option>
    </select>
  </InputLayout>
</template>

<script setup lang='ts' generic="TInput">
import InputLayout, { type InputLayoutProps } from './InputLayout.vue'

export type SelectOption<TOption> = {
  text: string
  value: TOption
}

defineComponent({ name: 'SelectInput' })

type SelectInputProps<T> = {
  options: SelectOption<T>[]
} & InputLayoutProps
defineProps<SelectInputProps<TInput>>()

const model = defineModel<TInput>()
</script>
