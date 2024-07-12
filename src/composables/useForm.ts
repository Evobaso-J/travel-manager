import type { ResourceClient, WithId, WithOptionalId } from '~/resources/types'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'
import { sleep } from '~/utils'

export const useForm = <TInternal extends WithOptionalId, TResponse extends WithId, TRequest extends WithOptionalId>(
  resourceClient: ResourceClient<TInternal, TResponse, TRequest>,
  data: TInternal,
) => {
  const route = useRoute()
  const router = useRouter()
  const routeBasedMethod = computed<'POST' | 'PUT'>(() => route.fullPath.includes('new') ? 'POST' : 'PUT')

  const { refresh: sendParsedData } = useResourceClientFetch(resourceClient, {
    method: routeBasedMethod,
    immediate: false,
    body: [data],
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
      router.back()
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
  return {
    loading,
    submitForm,
  }
}
