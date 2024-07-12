<template>
  <TravelsForm
    :initial-data="ref<MaybeTravel>(data?.[0])"
  />
</template>

<script lang="ts" setup>
import TravelsForm from '~/components/form/TravelsForm.vue'
import { travelsClient } from '~/resources/travels'
import type { Travel } from '~/resources/travels/types/internal'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'

useHead({
  title: 'Edit Travel',
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
