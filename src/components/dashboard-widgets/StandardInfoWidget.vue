<template>
  <BaseCard class="col-span-1 md:col-span-2">
    <p class="font-light text-sm class mb-2">
      {{ title }}
    </p>
    <div class="flex w-full font-medium">
      <div class="text-2xl w-full">
        {{ valueString }}
      </div>
      <div
        v-if="percentageGrowth"
        class="text-center text-sm w-full flex items-end justify-end pb-0.5"
        :class="{
          'text-green-500': growthDirection === 'up',
          'text-red-500': growthDirection === 'down',
        }"
      >
        <div>
          <span class="mr-1">
            {{ `${percentage}%` }}
          </span>
          <FontAwesomeIcon
            :icon
          />
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang='ts'>
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

defineComponent({ name: 'StandardInfoWidget' })
type StandardInfoWidgetProps = {
  title: string
  value: number
  valueFormatter?: (value: number) => string
  percentageGrowth?: number
  growthDirection?: 'up' | 'down'
}
const props = withDefaults(defineProps<StandardInfoWidgetProps>(), {
  growthDirection: 'up',
})

const icon = computed<FontAwesomeIconProps['icon']>(() => {
  if (props.growthDirection === 'down') {
    return { prefix: 'fas', iconName: 'arrow-down' }
  }
  return { prefix: 'fas', iconName: 'arrow-up' }
})

const valueNumber = useDashboardNumberAnimation(props.value)
const percentage = useDashboardNumberAnimation(props.percentageGrowth ?? 0)

const valueString = computed(() => {
  if (props.valueFormatter) {
    return props.valueFormatter(valueNumber.value)
  }
  return valueNumber.value.toString()
})
</script>
