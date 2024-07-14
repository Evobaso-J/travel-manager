<template>
  <fieldset
    class="rounded-md border border-secondary-600 p-4 transition-opacity"
    :class="{
      'opacity-50': !travel,
    }"
  >
    <legend class="text-lg font-medium">
      <IconField
        class="px-2 text-secondary-700"
        icon-class="text-secondary-700"
        :icon="{ prefix: 'fas', iconName: 'info-circle' }"
        text="Travel Information"
      />
    </legend>
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
        class="col-span-2"
      />
      <TextField
        :lines="6"
        :value="travel?.pictureSource ?? placeholderString"
        label="Cover Image URL"
        class="col-span-2"
        :prepend-icon="{ prefix: 'fas', iconName: 'image' }"
      />
    </FormRow>
  </fieldset>
</template>

<script setup lang='ts'>
import TextField from './fields/TextField.vue'
import StarsRatingField from './fields/StarsRatingField.vue'
import IconField from './fields/IconField.vue'
import type { Travel } from '~/resources/travels/types/internal'
import { formatDateToStandard, formatPrice } from '~/utils'

defineComponent({ name: 'SelectedTravelPreviewCard' })
type SelectedTravelPreviewCardProps = {
  travel: Travel | undefined
}
defineProps<SelectedTravelPreviewCardProps>()

const placeholderString = 'No travel selected'
</script>
