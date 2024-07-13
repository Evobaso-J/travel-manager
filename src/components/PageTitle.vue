<template>
  <div class="mb-4 flex items-center gap-3">
    <BackButton v-if="showBackButton" />
    <button
      v-else
      class="px-1 sm:hidden inline-flex items-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      @click="toggleSidebar"
    >
      <FontAwesomeIcon
        :icon="{
          prefix: 'fas',
          iconName: 'bars',
        }"
        size="lg"
      />
    </button>
    <h1 class="text-2xl text-primary-400">
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BackButton from './BackButton.vue'

defineComponent({ name: 'PageTitle' })
type PageTitleProps = {
  showBackButton?: boolean
  title: string
}
defineProps<PageTitleProps>()

const { toggleSidebar } = useSidebarStatus()
</script>
