<template>
  <OverlayScrim
    class="z-50"
    :is-open="isOpen"
    @click="$emit('cancel')"
  />
  <BaseCard
    class="w-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    :class="{
      hidden: !isOpen,
    }"
  >
    <h2 class="text-xl font-semibold">
      {{ titleLabel }}
    </h2>
    <p class="mt-2">
      {{ textLabel }}
    </p>
    <div class="mt-4 flex justify-end space-x-2">
      <IconButton
        :icon="{ prefix: 'fas', iconName: 'times' }"
        :text="cancelLabel"
        @click="$emit('cancel')"
      />
      <IconButton
        :icon="{ prefix: 'fas', iconName: 'check' }"
        :text="confirmLabel"
        @click="$emit('confirm')"
      >
        {{ confirmLabel }}
      </IconButton>
    </div>
  </BaseCard>
</template>

<script setup lang='ts'>
import IconButton from './buttons/IconButton.vue'
import OverlayScrim from './OverlayScrim.vue'

defineComponent({ name: 'ConfirmationModal' })
type ConfirmationModalProps = {
  isOpen: boolean
  titleLabel?: string
  textLabel?: string
  confirmLabel?: string
  cancelLabel?: string
}
type ConfirmationDialogEmits = {
  (event: 'confirm' | 'cancel'): void
}

withDefaults(defineProps<ConfirmationModalProps>(), {
  titleLabel: 'Warning',
  textLabel: 'Are you sure you want to perform this action?',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
})

defineEmits<ConfirmationDialogEmits>()
</script>
