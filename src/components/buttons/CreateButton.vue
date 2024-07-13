<template>
  <NuxtLink
    is="div"
    :to
    class="fixed bottom-8 right-8 z-40 rounded-full aspect-square shadow-xl"
  >
    <button
      class="bg-primary-400 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-full aspect-square shadow-xl"
    >
      <FontAwesomeIcon
        :icon="{ prefix: 'fas', iconName: 'plus' }"
        size="xl"
      />
    </button>
  </NuxtLink>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'FloatingActionButton' })

const route = useRoute()
const to = computed(() => `${route.path}/new`)
</script>
