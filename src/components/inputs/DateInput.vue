<template>
  <BaseInput
    v-model="model"
    type="date"
    :label="label"
    :prepend-icon="prependIcon"
    :disabled="disabled"
    :icon-props="iconProps"
    :min="min ? formatDateToHTMLInputStandard(min) : undefined"
    :max="max ? formatDateToHTMLInputStandard(max) : undefined"
  />
</template>

<script setup lang='ts'>
import BaseInput, { type BaseInputProps } from '~/components/inputs/BaseInput.vue'
import { formatDateToHTMLInputStandard } from '~/utils'

defineComponent({ name: 'DateInput' })

type DateInputProps = {
  label: string
  min?: Date
  max?: Date
} & Omit<BaseInputProps, 'type'>
defineProps<DateInputProps>()

const model = defineModel<Date | string>({
  get: (value) => {
    if (typeof value === 'string') {
      return value
    }
    return formatDateToHTMLInputStandard(value)
  },
  set: value => new Date(value),
})
</script>
