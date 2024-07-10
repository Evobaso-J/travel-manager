<template>
  <div>
    <TravelsTable />
    <CreateButton />
  </div>
</template>

<script lang="ts" setup>
import CreateButton from '~/components/buttons/CreateButton.vue'
import TravelsTable from '~/components/table/TravelsTable.vue'

useHead({
  title: 'Travels',
})
</script>
