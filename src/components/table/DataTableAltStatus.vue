<template>
  <section
    class="h-[60vh] md:h-[40vh] rounded-lg"
    :class="{
      'bg-red-100': status === 'error',
      'bg-gray-100': status === 'empty',
      'bg-primary-50': status === 'loading',
    }"
  >
    <div
      v-if="status === 'loading'"
      class="flex items-center justify-center h-full"
    >
      <div class="flex flex-col gap-3">
        <span class="animate-pulse text-primary-500 text-2xl pl-4">
          <span>Loading...</span>
        </span>
        <FontAwesomeIcon
          :icon="{ prefix: 'fas', iconName: 'circle-notch' }"
          class="text-primary-500 animate-spin text-6xl"
        />
      </div>
    </div>

    <div
      v-if="status === 'error'"
      class="flex items-center justify-center h-full"
    >
      <span class="text-red-500 text-xl">
        Error fetching data
      </span>
    </div>

    <div
      v-if="status === 'empty'"
      class="flex items-center justify-center h-full"
    >
      <span class="text-gray-500 text-xl">
        No data available
      </span>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { DataTableStatus } from './DataTable.vue'

defineComponent({ name: 'DataTableAltStatus' })

 type DataTableAltStatusProps = {
   status: Exclude<DataTableStatus, 'idle'>
 }

defineProps<DataTableAltStatusProps>()
</script>
