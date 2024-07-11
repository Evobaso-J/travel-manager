<template>
  <BaseInput
    v-model="model"
    type="date"
    :label="label"
    :prepend-icon="prependIcon"
    :disabled="disabled"
  />
</template>

<script setup lang='ts'>
import BaseInput, { type BaseInputProps } from '~/components/inputs/BaseInput.vue'
import { formatDateToHTMLInputStandard } from '~/utils'

defineComponent({ name: 'DateInput' })

type DateInputProps = {
  label: string
} & Omit<BaseInputProps, 'type'>
defineProps<DateInputProps>()

const model = defineModel<Date | string>({
  set: (value) => {
    const date = new Date(value)
    return formatDateToHTMLInputStandard(date)
  },
})
</script>
