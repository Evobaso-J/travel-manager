<template>
  <div>
    <BaseForm
      :resource-client="travelsClient"
      :data="formData"
    >
      <section class="grid grid-cols-3 gap-4">
        <TextInput
          v-model="formData.name"
          label="Name"
          required
        />
        <DateInput
          v-model="formData.departureDate"
          label="Departure Date"
        />
        <DateInput
          v-model="formData.returnDate"
          label="Return Date"
        />
        <NumberInput
          v-model="formData.price"
          label="Price (€)"
          :min="0"
        />
        <TextareaInput
          v-model="formData.tourDescription"
          label="Tour Description"
        />
        <StarRatingInput
          v-model="formData.averageRating"
          label="Average Rating"
        />
      </section>
    </BaseForm>
    <pre>
        {{ formData }}
    </pre>
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
</script>
