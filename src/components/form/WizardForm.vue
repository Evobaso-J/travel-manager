<template>
  <BaseCard>
    <form
      class="p-4"
      @submit.prevent="goToNextStep"
    >
      <WizardFormSteps
        :steps="steps"
        :active-step="currentStep"
      />
      <section
        v-for="step in steps"
        :key="step.text"
        class="transition-transform duration-300"
        :class="{
          'invisible absolute scale-0': currentStep !== step.value,
          'translate-x-0': currentStep === step.value,
          '-translate-x-full': currentStep > step.value,
          'translate-x-full': currentStep < step.value,
        }"
      >
        <slot
          :name="`step.${step.value}`"
          :step
          :current-step="currentStep"
        >
          <div
            v-show="currentStep === step.value"
          >
            {{ step.text }}
          </div>
        </slot>
      </section>
      <section class="flex justify-end pt-4">
        <IconButton
          v-show="!isFirstStep"
          :icon="{ prefix: 'fas', iconName: 'arrow-left' }"
          text="Prev"
          :loading
          @click="goToPreviousStep"
        />
        <div class="flex-grow" />
        <IconButton
          :icon="{ prefix: 'fas', iconName: isLastStep ? 'save' : 'arrow-right' }"
          :text="isLastStep ? 'Submit' : 'Next'"
          type="submit"
          :loading
        />
      </section>
    </form>
  </BaseCard>
</template>

<script setup lang='ts' generic="TInternal extends WithOptionalId, TResponse extends WithId, TRequest extends WithOptionalId">
import IconButton from '../buttons/IconButton.vue'
import { type BaseFormProps } from './BaseForm.vue'
import WizardFormSteps, { type WizardFormStepsProps } from './WizardFormSteps.vue'
import type { WithOptionalId, WithId } from '~/resources/types'

defineComponent({ name: 'WizardForm' })

type StepDirection = 'forward' | 'backward'
type WizardFormProps<I extends WithOptionalId, Res extends WithId, Req extends WithOptionalId> =
  Omit<WizardFormStepsProps, 'activeStep'> & BaseFormProps<I, Res, Req>

const props = defineProps<WizardFormProps<TInternal, TResponse, TRequest>>()

const currentStep = ref<number>(1)
const previousStep = ref<number>(0)
const stepDirection = ref<StepDirection>('forward')

const isFirstStep = computed(() => currentStep.value === 1)
const isLastStep = computed(() => currentStep.value === props.steps.length)

const { loading, submitForm } = useForm(props.resourceClient, props.data)

const goToNextStep = () => {
  previousStep.value = currentStep.value
  stepDirection.value = 'forward'
  if (isLastStep.value) {
    submitForm()
    return
  }
  currentStep.value++
}
const goToPreviousStep = () => {
  previousStep.value = currentStep.value
  currentStep.value--
}

watch(currentStep, (newVal, oldVal) => {
  stepDirection.value = newVal > oldVal ? 'forward' : 'backward'
})

type WizardFormSlots = {
  [K in keyof typeof props.steps as `step.${number & K}`]: (p: {
    step: typeof props.steps[K]
    currentStep: number
  }) => VNode
}
defineSlots<WizardFormSlots>()
</script>
