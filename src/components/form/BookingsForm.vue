<template>
  <WizardForm
    :resource-client="bookingsClient"
    :data="formData"
    :steps
  >
    <template #[`step.1`]="{ currentStep, step }">
      <section>
        <FormRow>
          <AutocompleteInput
            v-model:input-value="formData.travelId"
            :required="currentStep === step.value"
            :prepend-icon="{ prefix: 'fas', iconName: 'earth' }"
            label="Travel"
            :options="travelSelectOption"
            clearable
          />
        </FormRow>
        <SelectedTravelPreviewCard
          :travel="selectedTravel"
        />
      </section>
    </template>
    <template #[`step.2`]="{ currentStep, step }">
      <section>
        <FormRow>
          <TextInput
            v-model="formData.customer.name"
            :required="currentStep === step.value"
            label="Full Name"
            :prepend-icon="{ prefix: 'fas', iconName: 'user' }"
          />
        </FormRow>
        <FormRow>
          <TextInput
            v-model="formData.customer.email"
            :required="currentStep === step.value"
            email
            type="email"
            label="Email"
            :prepend-icon="{ prefix: 'fas', iconName: 'envelope' }"
          />
          <TextInput
            v-model="formData.customer.phone"
            :required="currentStep === step.value"
            label="Phone"
            :prepend-icon="{ prefix: 'fas', iconName: 'phone' }"
          />
        </FormRow>
        <FormRow>
          <NumberInput
            v-model="formData.customer.age"
            :required="currentStep === step.value"
            label="Age"
            :prepend-icon="{ prefix: 'fas', iconName: 'birthday-cake' }"
            :min="18"
          />
          <SelectInput
            v-model="formData.customer.gender"
            :required="currentStep === step.value"
            label="Gender"
            :options="genderOptions"
            :prepend-icon="{ prefix: 'fas', iconName: 'venus-mars' }"
          />
        </FormRow>
      </section>
    </template>
    <template #[`step.3`]="{ currentStep, step }">
      <section>
        <FormRow>
          <SelectInput
            v-model="formData.paymentType"
            :required="currentStep === step.value"
            label="Payment Type"
            :options="paymentOptions"
            :prepend-icon="{ prefix: 'fas', iconName: 'credit-card' }"
          />
        </FormRow>
        <FormRow>
          <TextareaInput
            v-model="formData.notes"
            label="Internal notes"
            :prepend-icon="{ prefix: 'fas', iconName: 'info-circle' }"
          />
        </FormRow>
      </section>
    </template>
  </WizardForm>
</template>

<script setup lang='ts'>
import SelectInput, { type SelectOption } from '../inputs/SelectInput.vue'
import TextareaInput from '../inputs/TextareaInput.vue'
import AutocompleteInput from '../inputs/AutocompleteInput.vue'
import SelectedTravelPreviewCard from '../SelectedTravelPreviewCard.vue'
import TextInput from '../inputs/TextInput.vue'
import NumberInput from '../inputs/NumberInput.vue'
import WizardForm from './WizardForm.vue'
import type { FormStep } from './WizardFormSteps.vue'
import { genderToStringMap, paymentTypeToStringMap } from '~/utils'
import { bookingsClient } from '~/resources/bookings'
import type { Booking, PaymentType } from '~/resources/bookings/types/internal'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'
import { travelsClient } from '~/resources/travels'
import type { Travel } from '~/resources/travels/types/internal'
import type { Gender } from '~/resources/customers/types/internal'

defineComponent({ name: 'BookingsForm' })

type BookingsFormProps = {
  initialData?: Ref<Booking | undefined>
}

const props = defineProps<BookingsFormProps>()
const formData = ref<Booking>({
  id: undefined,
  customer: {
    id: undefined,
    age: 18,
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
    Object.assign(formData.value, initialData.value)
  }
}, { immediate: true })

const genderOptions = computed(() => Object.entries(genderToStringMap).map<SelectOption<Gender>>(([value, text]) => ({
  value: value as Gender,
  text,
})))
const paymentOptions = computed(() => Object.entries(paymentTypeToStringMap).map<SelectOption<PaymentType>>(([value, text]) => ({
  value: value as PaymentType,
  text,
})))

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
