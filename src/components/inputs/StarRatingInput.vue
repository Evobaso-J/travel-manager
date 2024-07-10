<template>
  <div
    class="flex flex-col items-center gap-1 cursor-pointer"
  >
    <label>{{ label }}</label>
    <div class="flex flex-row-reverse gap-1 group">
      <FontAwesomeIcon
        v-for="i in 5"
        :key="i"
        :icon="{ prefix: 'fas', iconName: 'star' }"
        class="peer"
        :class="{
          'text-secondary-600': (5-i+1) <= model,
          'text-gray-300 peer-hover:text-secondary-300 hover:text-secondary-300': (5-i+1) > model,
        }"
        @click="updateValue(i)"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'StarRatingInput' })
type StarRatingInputProps = {
  label: string
}
defineProps<StarRatingInputProps>()

const model = defineModel<number>({
  default: 0,
})

// We need to subtract the index from 5 and add 1 to get the correct value
// because the stars are rendered in reverse order to make the peer selector work
const updateValue = (index: number) => {
  if (model.value === 5 - index + 1) {
    model.value = 0
    return
  }
  model.value = 5 - index + 1
}
</script>
