<template>
  <FontAwesomeIcon
    :icon
    :class="{
      'text-pink-500': gender ==='female',
      'text-blue-500': gender === 'male',
      'text-purple-500': gender === 'other',
      'text-gray-500': gender==='notSpecified',
    }"
  />
</template>

<script setup lang='ts'>
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Gender } from '~/resources/customers/types/internal'

defineComponent({ name: 'GenderField' })
type GenderFieldProps = {
  gender: Gender
}
const props = defineProps<GenderFieldProps>()

const icon = computed<Partial<IconDefinition>>(() => {
  if (props.gender === 'female') return { prefix: 'fas', iconName: 'venus' }
  if (props.gender === 'male') return { prefix: 'fas', iconName: 'mars' }
  if (props.gender === 'other') return { prefix: 'fas', iconName: 'mars-and-venus' }
  return { prefix: 'fas', iconName: 'genderless' }
})
</script>
