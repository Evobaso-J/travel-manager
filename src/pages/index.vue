<template>
  <div>
    <PageTitle
      :title
    />
  </div>
</template>

<script lang="ts" setup>
import PageTitle from '~/components/PageTitle.vue'

const title = 'Dashboard'
useHead({
  title,
})
</script>
