<template>
  <DataTable
    :items="tableData ?? []"
    :loading="status === 'pending'"
    :error="status === 'error'"
    :hidden-columns="['id']"
    :resource-client="bookingsClient"
  >
    <template #[`item.customer`]="{ item }">
      <div class="flex flex-col gap-2">
        <div class="flex gap-4 items-center">
          <GenderField :gender="item.customer.gender" />
          <span
            class="font-semibold"
          >
            {{ item.customer.name }}
          </span>
          <div class="flex items-center gap-1">
            <IconField
              :icon="{ prefix: 'fas', iconName: 'birthday-cake' }"
              :text="String(item.customer.age)"
            />
          </div>
        </div>
        <div
          class="flex gap-4 items-center"
        >
          <IconField
            :icon="{ prefix: 'fas', iconName: 'envelope' }"
            :text="item.customer.email"
          />
          <IconField
            :icon="{ prefix: 'fas', iconName: 'phone' }"
            :text="item.customer.phone"
            icon-class="text-green-600"
          />
        </div>
      </div>
    </template>
    <template #[`item.travel`]="{ item }">
      {{ item.travel?.name }}
    </template>

    <template #[`item.paymentType`]="{ item }">
      {{ paymentTypeToStringMap[item.paymentType] }}
    </template>

    <template #[`item.notes`]="{ item }">
      <TextTooltip
        :text="item.notes"
        position="top"
      >
        <div class="truncate max-w-56">
          {{ item.notes }}
        </div>
      </TextTooltip>
    </template>
  </DataTable>
</template>

<script setup lang='ts'>
import GenderField from '~/components/fields/GenderField.vue'
import IconField from '~/components/fields/IconField.vue'
import DataTable from '~/components/table/DataTable.vue'
import { bookingsClient } from '~/resources/bookings'
import type { Booking } from '~/resources/bookings/types/internal'
import { travelsClient } from '~/resources/travels'
import type { Travel } from '~/resources/travels/types/internal'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'
import { paymentTypeToStringMap } from '~/utils'

defineComponent({ name: 'BookingsTable' })

const { data: bookingsData, status } = useResourceClientFetch(bookingsClient, {
  method: 'GET',
})
const travelIds = computed(() => (bookingsData.value ?? []).map(booking => booking.travelId))

const { data: travelsData } = useResourceClientFetch(travelsClient, {
  method: 'GET',
  query: {
    id: travelIds,
  },
})

type TableBooking = Omit<Booking, 'travelId'> & { travel: Travel }
const tableData = computed(() => {
  return (bookingsData.value ?? []).map<TableBooking>(({ travelId, ...booking }) => ({
    ...booking,
    travel: (travelsData.value ?? []).find(travel => travel.id === travelId)!,
  }))
})
</script>
