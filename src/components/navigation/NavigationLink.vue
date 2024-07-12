<template>
  <li>
    <NuxtLink
      class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-100"
      active-class="bg-primary-100"
      :to
    >
      <FontAwesomeIcon
        :icon="prependIcon"
        class="w-6 h-6"
      />
      <span class="ms-3">{{ text }}</span>
    </NuxtLink>
  </li>
</template>

<script setup lang='ts'>
import { type FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'NavigationLink' })
export type NavigationLinkProps = {
  to: string
  text: string
  prependIcon: FontAwesomeIconProps['icon']
}
defineProps<NavigationLinkProps>()
</script>
