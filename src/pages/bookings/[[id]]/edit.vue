<template>
  <div>
    <section>
      <PageTitle
        :title="title"
        show-back-button
      />
    </section>
    <section>
      <BookingsForm
        :initial-data="ref<MaybeBooking>(data?.[0])"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import BookingsForm from '~/components/form/BookingsForm.vue'
import { bookingsClient } from '~/resources/bookings'
import type { Booking } from '~/resources/bookings/types/internal'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'

const title = 'Edit Booking'
useHead({
  title,
})

  type MaybeBooking = Booking | undefined

const route = useRoute()
const { data } = useResourceClientFetch(bookingsClient, {
  method: 'GET',
  immediate: true,
  query: {
    id: route.params.id,
  },
})
</script>
