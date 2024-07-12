<template>
  <div>
    <BaseForm
      :resource-client="travelsClient"
      :data="formData"
    >
      <FormRow>
        <TextInput
          v-model="formData.name"
          label="Name"
          required
          :prepend-icon="{ prefix: 'fas', iconName: 'earth' }"
        />
      </FormRow>
      <FormRow>
        <DateInput
          v-model="formData.departureDate"
          label="Departure Date"
          :prepend-icon="{ prefix: 'fas', iconName: 'plane-departure' }"
        />
        <DateInput
          v-model="formData.returnDate"
          label="Return Date"
          :prepend-icon="{ prefix: 'fas', iconName: 'plane-arrival' }"
          :icon-props="{ flip: 'horizontal' }"
        />
      </FormRow>
      <FormRow>
        <NumberInput
          v-model="formData.price"
          label="Price (€)"
          :min="0"
        />
        <StarRatingInput
          v-model="formData.averageRating"
          label="Average Rating"
        />
      </FormRow>
      <FormRow>
        <TextareaInput
          v-model="formData.tourDescription"
          label="Tour Description"
          :prepend-icon="{ prefix: 'fas', iconName: 'info-circle' }"
        />
        <TextInput
          v-model="formData.pictureSource"
          label="Cover Image URL"
          :prepend-icon="{ prefix: 'fas', iconName: 'image' }"
        />
      </FormRow>
      <section />
    </BaseForm>
  </div>
</template>

<script setup lang='ts'>
import TextInput from '../inputs/TextInput.vue'
import StarRatingInput from '../inputs/StarRatingInput.vue'
import DateInput from '../inputs/DateInput.vue'
import TextareaInput from '../inputs/TextareaInput.vue'
import NumberInput from '../inputs/NumberInput.vue'
import BaseForm from './BaseForm.vue'
import type { Travel } from '~/resources/travels/types/internal'
import { travelsClient } from '~/resources/travels'

defineComponent({ name: 'TravelsForm' })

type TravelsFormProps = {
  initialData?: Ref<Travel | undefined>
}

const props = defineProps<TravelsFormProps>()

const formData = ref<Travel>({
  id: undefined,
  name: '',
  averageRating: 0,
  departureDate: new Date(),
  returnDate: new Date(),
  price: 0,
  pictureSource: '',
  tourDescription: '',
})

watch(() => props.initialData, (initialData) => {
  if (initialData?.value) {
    Object.assign(formData.value, initialData.value)
  }
}, { immediate: true })
</script>
