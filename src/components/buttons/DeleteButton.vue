<template>
  <button>
    <FontAwesomeIcon
      :icon="{
        prefix: 'fas',
        iconName: 'trash',
      }"
      class="text-red-500 hover:text-red-700"
      @click="deleteItem"
    />
  </button>
</template>

<script setup lang='ts' generic="TInternal extends WithOptionalId, TResponse extends WithId, TRequest extends WithOptionalId">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { ResourceClient, WithId, WithOptionalId } from '~/resources/types'

defineComponent({ name: 'DeleteButton' })
type DeleteButtonProps<I extends WithOptionalId, Res extends WithId, Req extends WithOptionalId> = {
  id: number
  client: ResourceClient<I, Res, Req>
}
const props = defineProps <DeleteButtonProps<TInternal, TResponse, TRequest>>()

const deleteItem = () => {
  $fetch(props.client.route, {
    method: 'DELETE',
    params: {
      id: props.id,
    },
  })
  console.log('Delete item', props.id)
}
</script>
