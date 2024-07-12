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
      <section>
        <slot
          v-for="step in steps"
          :name="`step.${step.value}`"
          :step
          :current-step="currentStep"
        >
          <div
            v-show="currentStep === step.value"
            :key="step.text"
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

type WizardFormProps<I extends WithOptionalId, Res extends WithId, Req extends WithOptionalId> =
  Omit<WizardFormStepsProps, 'activeStep'> & BaseFormProps<I, Res, Req>
const props = defineProps<WizardFormProps<TInternal, TResponse, TRequest>>()

const currentStep = ref<number>(1)

const isFirstStep = computed(() => currentStep.value === 1)
const isLastStep = computed(() => currentStep.value === props.steps.length)

const { loading, submitForm } = useForm(props.resourceClient, props.data)

const goToNextStep = () => {
  if (isLastStep.value) {
    submitForm()
    return
  }
  currentStep.value++
}
const goToPreviousStep = () => {
  currentStep.value--
}

type WizardFormSlots = {
  [K in keyof typeof props.steps as `step.${number & K}`]: (p: { step: typeof props.steps[K], currentStep: number }) => VNode
}
defineSlots<WizardFormSlots>()
</script>
