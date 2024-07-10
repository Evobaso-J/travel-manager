<template>
  <div
    class="flex items-center gap-1"
  >
    <FontAwesomeIcon
      :icon="icon"
      :class="iconClass"
      size="sm"
    />
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'
import type { HtmlHTMLAttributes } from 'vue'

defineComponent({ name: 'IconField' })
type IconFieldProps = {
  icon: FontAwesomeIconProps['icon']
  text: string
  iconClass?: HtmlHTMLAttributes['class']
}
withDefaults(defineProps<IconFieldProps>(), {
  iconClass: 'text-slate-500',
})
</script>
