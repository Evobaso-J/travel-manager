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
import { sleep } from '~/utils'
import type { ResourceClient, WithId, WithOptionalId } from '~/resources/types'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'

defineComponent({ name: 'BaseForm' })
type BaseFormProps<I extends WithOptionalId, Req extends WithId, Res extends WithOptionalId> = {
  resourceClient: ResourceClient<I, Req, Res>
  data: TInternal
}
const props = defineProps<BaseFormProps<TInternal, TResponse, TRequest>>()

const route = useRoute()

const routeBasedMethod = computed<'POST' | 'PUT'>(() => route.fullPath.includes('new') ? 'POST' : 'PUT')

const { refresh: sendParsedData } = useResourceClientFetch(props.resourceClient, {
  method: routeBasedMethod,
  immediate: false,
  body: [props.data],
})
const { notify } = useNotification()
const loading = ref(false)
const submitForm = async () => {
  loading.value = true
  await sleep(1000)
  try {
    await sendParsedData()
    notify({
      type: 'success',
      text: 'Form submitted successfully',
    })
  }
  catch (error) {
    notify({
      type: 'error',
      text: 'Failed to submit form',
    })
  }
  finally {
    loading.value = false
  }
}
</script>
