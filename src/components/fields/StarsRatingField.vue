<template>
  <FontAwesomeIcon
    v-for="i in 5"
    :key="i"
    :icon="{ prefix: 'fas', iconName: 'star' }"
    :class="i <= value ? 'text-secondary-600' : 'text-gray-300'"
  />
</template>

<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'StarsRatingField' })
type StarsRatingFieldProps = {
  value: number
}
defineProps<StarsRatingFieldProps>()
</script>
