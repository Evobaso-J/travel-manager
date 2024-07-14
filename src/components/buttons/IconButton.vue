<template>
  <button
    :disabled="loading"
    type="button"
    class="flex items-center gap-3 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
    @click="$emit('click')"
  >
    <FontAwesomeIcon
      :icon="buttonIcon"
      size="lg"
      :class="{ 'animate-spin': loading }"
    />
    <div>{{ text }}</div>
  </button>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'IconButton' })
type IconButtonProps = {
  icon: FontAwesomeIconProps['icon']
  text: string
  loading?: boolean
}
type IconButtonEmits = {
  (event: 'click'): void
}

const props = defineProps<IconButtonProps>()
defineEmits<IconButtonEmits>()

const buttonIcon = computed<FontAwesomeIconProps['icon']>(() => {
  if (props.loading) return { prefix: 'fas', iconName: 'circle-notch' }
  return props.icon
})
</script>
