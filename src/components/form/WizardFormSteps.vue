<template>
  <ol class="mb-8 flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base">
    <li
      v-for="(step, index) in steps"
      :key="step.value"
      class="flex items-center"
      :class="{
        'text-primary-600': activeStep >= step.value,
        'md:w-full sm:after:content-[\'\'] after:w-full after:h-1 after:border-b after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10': steps.length - 1 !== index,
        'after:border-primary-200': activeStep > step.value,
        'after:border-gray-200': activeStep <= step.value,
      }"
    >
      <span
        class="flex items-center"
        :class="{
          'after:text-primary-600': activeStep > step.value,
          'after:content-[\'•\'] sm:after:hidden after:mx-2 after:text-gray-200': steps.length - 1 !== index,
        }"
      >
        <FontAwesomeIcon
          :icon="step.icon"
          class="me-2"
        />
        {{ step.text }}
      </span>
    </li>
  </ol>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'WizardFormSteps' })

export type FormStep = {
  text: string
  value: number
  icon: FontAwesomeIconProps['icon']
}
export type WizardFormStepsProps = {
  steps: FormStep[]
  activeStep: number
}
defineProps<WizardFormStepsProps>()
</script>
