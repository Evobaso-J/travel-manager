<template>
  <div>
    <BaseForm
      :resource-client="bookingsClient"
      :data="formData"
    >
      <FormRow>
        <SelectInput
          v-model="formData.paymentType"
          required
          label="Payment Type"
          :options="paymentOptions"
          :prepend-icon="{ prefix: 'fas', iconName: 'credit-card' }"
        />
        <AutocompleteInput
          v-model:input-value="formData.travelId"
          required
          :prepend-icon="{ prefix: 'fas', iconName: 'earth' }"
          label="Travel"
          :options="travelSelectOption"
        />
      </FormRow>
      <FormRow>
        <TextareaInput
          v-model="formData.notes"
          label="Internal notes"
          :prepend-icon="{ prefix: 'fas', iconName: 'info-circle' }"
        />
      </FormRow>
      <section />
    </BaseForm>
    <pre>
      {{ formData }}
    </pre>
  </div>
</template>

<script setup lang='ts'>
import SelectInput, { type SelectOption } from '../inputs/SelectInput.vue'
import TextareaInput from '../inputs/TextareaInput.vue'
import AutocompleteInput from '../inputs/AutocompleteInput.vue'
import BaseForm from './BaseForm.vue'
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
</script>
