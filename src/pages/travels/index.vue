<template>
  <div>
    <section>
      <PageTitle :title="title" />
    </section>
    <section>
      <TravelsTable />
      <CreateButton />
    </section>
  </div>
</template>

<script lang="ts" setup>
import CreateButton from '~/components/buttons/CreateButton.vue'
import TravelsTable from '~/components/table/TravelsTable.vue'

const title = 'Travels'
useHead({
  title,
})
</script>
