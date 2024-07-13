<template>
  <div>
    <section>
      <PageTitle
        :title="title"
        show-back-button
      />
    </section>
    <section>
      <BookingsForm />
    </section>
  </div>
</template>

<script lang="ts" setup>
import BookingsForm from '~/components/form/BookingsForm.vue'

const title = 'New Booking'
useHead({
  title,
})
</script>
