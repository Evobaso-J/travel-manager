<template>
  <div>
    <section>
      <PageTitle
        :title="title"
        show-back-button
      />
    </section>
    <section>
      <TravelsForm />
    </section>
  </div>
</template>

<script lang="ts" setup>
import TravelsForm from '~/components/form/TravelsForm.vue'

const title = 'New Travel'
useHead({
  title,
})
</script>
