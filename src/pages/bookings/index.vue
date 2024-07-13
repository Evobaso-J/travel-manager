<template>
  <div>
    <section>
      <PageTitle :title="title" />
    </section>
    <section>
      <BookingsTable />
      <CreateButton />
    </section>
  </div>
</template>

<script lang="ts" setup>
import CreateButton from '~/components/buttons/CreateButton.vue'
import BookingsTable from '~/components/table/BookingsTable.vue'

const title = 'Bookings'
useHead({
  title,
})
</script>
