<template>
  <div class="flex flex-col gap-3">
    <TextInput
      v-model="search"
      :label="'Search'"
      tw-class="max-w-xl"
      :prepend-icon="{ prefix: 'fas', iconName: 'magnifying-glass' }"
    />
    <DataTable
      :items="data ?? []"
      :loading="status === 'pending'"
      :error="status === 'error'"
      :hidden-columns="['id', 'pictureSource']"
      :filter-by="filters"
      :resource-client="travelsClient"
    >
      <template #[`item.name`]="{ item }">
        <div class="flex gap-4 items-center">
          <AvatarField
            tw-class="flex-shrink-0"
            :src="item.pictureSource"
            :alt="item.name"
          />
          <span>
            {{ item.name }}
          </span>
        </div>
      </template>
      <template #[`item.departureDate`]="{ item }">
        {{ formatDateToStandard(item.departureDate) }}
      </template>
      <template #[`item.returnDate`]="{ item }">
        {{ formatDateToStandard(item.returnDate) }}
      </template>
      <template #[`item.price`]="{ item }">
        {{ formatPrice(item.price) }}
      </template>
      <template #[`item.tourDescription`]="{ item }">
        <TextTooltip
          :text="item.tourDescription"
          position="top"
        >
          <div class="truncate max-w-56">
            {{ item.tourDescription }}
          </div>
        </TextTooltip>
      </template>

      <template #[`item.averageRating`]="{ item }">
        <StarsRatingField :value="item.averageRating" />
      </template>
    </DataTable>
  </div>
</template>

<script setup lang='ts'>
import AvatarField from '~/components/fields/AvatarField.vue'
import StarsRatingField from '~/components/fields/StarsRatingField.vue'
import TextInput from '~/components/inputs/TextInput.vue'
import DataTable, { type DataTableFilters } from '~/components/table/DataTable.vue'
import { travelsClient } from '~/resources/travels'
import type { Travel } from '~/resources/travels/types/internal'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'
import { formatDateToStandard, formatPrice } from '~/utils'

defineComponent({ name: 'TravelsTable' })

const { data, status } = useResourceClientFetch(travelsClient, {
  method: 'GET',
})

const filters = computed<DataTableFilters<Travel>>(() => ({
  name: search.value,
}))

const search = ref<string>()
</script>
