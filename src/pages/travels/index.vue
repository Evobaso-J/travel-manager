<template>
  <section>
    <TravelsTable />
    <CreateButton />
  </section>
</template>

<script lang="ts" setup>
import CreateButton from '~/components/buttons/CreateButton.vue'
import TravelsTable from '~/components/table/TravelsTable.vue'

useHead({
  title: 'Travels',
})
</script>
