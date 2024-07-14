<template>
  <BaseCard class="col-span-2">
    <h3 class="text-lg mb-5 text-center font-light">
      Load Score
    </h3>
    <div class="text-center text-primary-300 font-semibold text-3xl mb-5">
      {{ percentage }}%
    </div>
    <div class="w-full bg-gray-200 h-3 rounded overflow-hidden mb-3">
      <div
        :class="`bg-primary-300 h-full rounded transition-all duration-3000 ease-in-out`"
        :style="{ width: `${percentage}%` }"
      />
    </div>
    <p class="text-center text-sm text-gray-400">
      Based on overall KPIs
    </p>
  </BaseCard>
</template>

<script setup lang='ts'>
import BaseCard from '../BaseCard.vue'

defineComponent({ name: 'LoadScoreWidget' })
type LoadScoreWidgetProps = {
  loadScorePercentage: number
}
const props = defineProps<LoadScoreWidgetProps>()

const percentage = useDashboardNumberAnimation(props.loadScorePercentage)
</script>
