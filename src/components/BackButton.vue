<template>
  <button
    type="button"
    class="rounded-full hover:bg-primary-100 px-1 aspect-square"
  >
    <FontAwesomeIcon
      :icon="{ prefix: 'fas', iconName: 'arrow-left' }"
      class="text-primary-400 aspect-square"
      size="lg"
      @click="$router.back"
    />
  </button>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'BackButton' })
</script>
