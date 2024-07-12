<template>
  <WizardForm
    :resource-client="bookingsClient"
    :data="formData"
    :steps
  >
    <template #[`step.1`]="{ currentStep, step }">
      <section
        v-show="currentStep===step.value"
      >
        <FormRow>
          <AutocompleteInput
            v-model:input-value="formData.travelId"
            required
            :prepend-icon="{ prefix: 'fas', iconName: 'earth' }"
            label="Travel"
            :options="travelSelectOption"
          />
        </FormRow>
        <SelectedTravelPreviewCard
          :travel="selectedTravel"
        />
      </section>
    </template>
    <template #[`step.2`]="{ currentStep, step }">
      <FormRow
        v-show="currentStep===step.value"
      >
        <TextareaInput
          v-model="formData.notes"
          label="Internal notes"
          :prepend-icon="{ prefix: 'fas', iconName: 'info-circle' }"
        />
      </FormRow>
    </template>
    <template #[`step.3`]="{ currentStep, step }">
      <FormRow
        v-show="currentStep===step.value"
      >
        <SelectInput
          v-model="formData.paymentType"
          required
          label="Payment Type"
          :options="paymentOptions"
          :prepend-icon="{ prefix: 'fas', iconName: 'credit-card' }"
        />
      </FormRow>
    </template>

    <pre>
      {{ formData }}
    </pre>
  </WizardForm>
</template>

<script setup lang='ts'>
import SelectInput, { type SelectOption } from '../inputs/SelectInput.vue'
import TextareaInput from '../inputs/TextareaInput.vue'
import AutocompleteInput from '../inputs/AutocompleteInput.vue'
import SelectedTravelPreviewCard from '../SelectedTravelPreviewCard.vue'
import WizardForm from './WizardForm.vue'
import type { FormStep } from './WizardFormSteps.vue'
import { paymentTypeToStringMap } from '~/utils'
import { bookingsClient } from '~/resources/bookings'
import type { Booking, PaymentType } from '~/resources/bookings/types/internal'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'
import { travelsClient } from '~/resources/travels'
import type { Travel } from '~/resources/travels/types/internal'

defineComponent({ name: 'BookingsForm' })

type BookingsFormProps = {
  initialData?: Ref<Booking | undefined>
}

const props = defineProps<BookingsFormProps>()
const formData = ref<Booking>({
  id: undefined,
  customer: {
    id: undefined,
    age: 0,
    email: '',
    gender: 'notSpecified',
    name: '',
    phone: '',
  },
  notes: '',
  paymentType: 'creditTransfer',
  travelId: -1, // -1 is a placeholder value impossible to be a valid travel id,
})

watch(() => props.initialData, (initialData) => {
  if (initialData?.value) {
    Object.assign(formData.value, initialData)
  }
}, { immediate: true })

const paymentOptions = computed(() => {
  return Object.entries(paymentTypeToStringMap).map<SelectOption<PaymentType>>(([value, text]) => ({
    value: value as PaymentType,
    text,
  }))
})

const { data: travels } = useResourceClientFetch(travelsClient, {
  method: 'get',
})
const travelSelectOption = computed<SelectOption<Travel['id']>[]>(() => (travels.value ?? []).map<SelectOption<number>>(travel => ({
  value: travel.id!,
  text: travel.name,
})))

const steps: FormStep[] = [
  { text: 'Travel', value: 1, icon: { prefix: 'fas', iconName: 'earth' } },
  { text: 'Customer', value: 2, icon: { prefix: 'fas', iconName: 'user' } },
  { text: 'Payment', value: 3, icon: { prefix: 'fas', iconName: 'money-bill' } },
]

const selectedTravel = computed<Travel | undefined>(() => travels.value?.find(travel => travel.id === formData.value.travelId))
</script>
