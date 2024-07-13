<template>
  <div>
    <section>
      <PageTitle
        :title="title"
        show-back-button
      />
    </section>
    <section>
      <TravelsForm
        :initial-data="ref<MaybeTravel>(data?.[0])"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import TravelsForm from '~/components/form/TravelsForm.vue'
import { travelsClient } from '~/resources/travels'
import type { Travel } from '~/resources/travels/types/internal'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'

const title = 'Edit Travel'
useHead({
  title,
})

  type MaybeTravel = Travel | undefined

const route = useRoute()
const { data } = useResourceClientFetch(travelsClient, {
  method: 'GET',
  immediate: true,
  query: {
    id: route.params.id,
  },
})
</script>
