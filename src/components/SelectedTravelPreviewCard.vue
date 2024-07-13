<template>
  <section
    class="rounded-md border border-gray-300 p-4"
  >
    <FormRow>
      <TextField
        :value="travel?.name ?? placeholderString"
        label="Name"
        required
        :prepend-icon="{ prefix: 'fas', iconName: 'earth' }"
      />
    </FormRow>
    <FormRow>
      <TextField
        :value="travel?.departureDate ? formatDateToStandard(travel.departureDate) : placeholderString"
        label="Departure Date"
        required
        :prepend-icon="{ prefix: 'fas', iconName: 'plane-departure' }"
      />
      <TextField
        :value="travel?.returnDate ? formatDateToStandard(travel.returnDate) : placeholderString"
        label="Return Date"
        required
        :prepend-icon="{ prefix: 'fas', iconName: 'plane-arrival' }"
        :icon-props="{ flip: 'horizontal' }"
      />
    </FormRow>
    <FormRow>
      <TextField
        :value="travel?.price ? formatPrice(travel.price) : placeholderString"
        label="Price"
        required
        :prepend-icon="{ prefix: 'fas', iconName: 'money-bills' }"
      />
      <StarsRatingField
        label="Average Rating"
        :value="travel?.averageRating ?? 0"
      />
    </FormRow>
    <FormRow>
      <TextField
        :value="travel?.tourDescription ?? placeholderString"
        label="Tour Description"
        :prepend-icon="{ prefix: 'fas', iconName: 'info-circle' }"
      />
      <TextField
        :lines="6"
        :value="travel?.pictureSource ?? placeholderString"
        label="Cover Image URL"
        :prepend-icon="{ prefix: 'fas', iconName: 'image' }"
      />
    </FormRow>
  </section>
</template>

<script setup lang='ts'>
import TextField from './fields/TextField.vue'
import StarsRatingField from './fields/StarsRatingField.vue'
import type { Travel } from '~/resources/travels/types/internal'
import { formatDateToStandard, formatPrice } from '~/utils'

defineComponent({ name: 'SelectedTravelPreviewCard' })
type SelectedTravelPreviewCardProps = {
  travel: Travel | undefined
}
defineProps<SelectedTravelPreviewCardProps>()

const placeholderString = 'No travel selected'
</script>
