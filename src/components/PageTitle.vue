<template>
  <div class="mb-4 flex items-center gap-3">
    <BackButton v-if="showBackButton" />
    <h1 class="text-2xl text-primary-400">
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang='ts'>
import BackButton from './BackButton.vue'

defineComponent({ name: 'PageTitle' })
type PageTitleProps = {
  showBackButton?: boolean
  title: string
}
defineProps<PageTitleProps>()
</script>
