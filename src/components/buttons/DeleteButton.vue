<template>
  <button
    :disabled="loading"
    class="rounded-full hover:bg-red-300 px-1 aspect-square"
    @click.stop="deleteItem"
  >
    <FontAwesomeIcon
      v-if="!loading"
      :icon="{
        prefix: 'fas',
        iconName: 'trash',
      }"
      class="text-red-500 aspect-square"
    />
    <FontAwesomeIcon
      v-else
      :icon="{ prefix: 'fas', iconName: 'circle-notch' }"
      class="text-red-500 animate-spin"
    />
  </button>
</template>

<script setup lang='ts' generic="TInternal extends WithOptionalId, TResponse extends WithId, TRequest extends WithOptionalId">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { ResourceClient, WithId, WithOptionalId } from '~/resources/types'
import { sleep } from '~/utils'

defineComponent({ name: 'DeleteButton' })
type DeleteButtonProps<I extends WithOptionalId, Res extends WithId, Req extends WithOptionalId> = {
  id: number
  client: ResourceClient<I, Res, Req>
}
const { notify } = useNotification()
const props = defineProps <DeleteButtonProps<TInternal, TResponse, TRequest>>()

const { askConfirmation } = useConfirmationModal()
const loading = ref(false)
const deleteItem = async () => {
  if (!(await askConfirmation())) return
  loading.value = true
  try {
    await $fetch(props.client.route, {
      method: 'DELETE',
      params: {
        id: props.id,
      },
    })
    await sleep()
    notify({
      text: 'Item deleted successfully',
      type: 'success',
    })
  }
  catch (error) {
    notify({
      text: 'An error occurred while deleting the item',
      type: 'error',
    })
  }
  finally {
    loading.value = false
  }
}
</script>
