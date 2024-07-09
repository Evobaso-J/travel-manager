<template>
  <div>
    <DataTable
      :items="data ?? []"
      :loading="status === 'pending'"
      :error="status === 'error'"
    >
      <template #[`item.departureDate`]="{ item }">
        {{ formatDate(item.departureDate) }}
      </template>
      <template #[`item.returnDate`]="{ item }">
        {{ formatDate(item.returnDate) }}
      </template>
      <template #[`item.price`]="{ item }">
        {{ formatPrice(item.price) }}
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import DataTable from '~/components/table/DataTable.vue'
import { travelsClient } from '~/resources/travels'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'
import { formatDate, formatPrice } from '~/utils'

useHead({
  title: 'Travels',
})

const { data, status } = useResourceClientFetch(travelsClient, {
  method: 'GET',
})
</script>
