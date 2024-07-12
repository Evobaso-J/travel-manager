<template>
  <BaseCard>
    <form
      @submit.prevent="submitForm"
    >
      <section>
        <slot />
      </section>
      <section class="flex justify-end pt-4">
        <IconButton
          :icon="{ prefix: 'fas', iconName: 'save' }"
          text="Submit"
          type="submit"
          :loading
        />
      </section>
    </form>
  </BaseCard>
</template>

<script setup lang='ts' generic="TInternal extends WithOptionalId, TResponse extends WithId, TRequest extends WithOptionalId">
import BaseCard from '../BaseCard.vue'
import IconButton from '../buttons/IconButton.vue'
import type { ResourceClient, WithId, WithOptionalId } from '~/resources/types'

export type BaseFormProps<I extends WithOptionalId, Res extends WithId, Req extends WithOptionalId> = {
  resourceClient: ResourceClient<I, Res, Req>
  data: I
}
defineComponent({ name: 'BaseForm' })

const props = defineProps<BaseFormProps<TInternal, TResponse, TRequest>>()

const { loading, submitForm } = useForm(props.resourceClient, props.data)
</script>
