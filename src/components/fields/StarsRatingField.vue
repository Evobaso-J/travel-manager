<template>
  <div
    class="flex flex-col items-start gap-1 flex-grow-0"
  >
    <label
      v-if="label"
      class="block text-sm text-gray-700"
    >{{ label }}</label>
    <div class="flex">
      <div
        v-for="i in 5"
        :key="i"
        class="peer px-0.5"
        :class="i <= value ? 'text-secondary-600' : 'text-gray-300'"
      >
        <FontAwesomeIcon
          :icon="{ prefix: 'fas', iconName: 'star' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'StarsRatingField' })
type StarsRatingFieldProps = {
  value: number
  label?: string
}
defineProps<StarsRatingFieldProps>()
</script>
