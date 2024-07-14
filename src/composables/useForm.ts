import type { ResourceClient, WithId, WithOptionalId } from '~/resources/types'
import { useResourceClientFetch } from '~/resources/useResourceClientFetch'
import { sleep } from '~/utils'

/**
 * Creates a form management composable for handling form submission with support for both creation and update operations.
 * This composable determines the HTTP method (POST for creation, PUT for update) based on the current route,
 * automatically handles form submission, and provides feedback to the user through notifications.
 *
 * @param {ResourceClient<TInternal, TResponse, TRequest>} resourceClient - An instance of a resource client used to interact with the server.
 * @param {TInternal} data - The initial form data.
 *
 * @returns {Object} An object containing reactive properties and methods for form management:
 * - `loading`: A reactive boolean indicating whether the form is currently being submitted.
 * - `submitForm`: An asynchronous function to be called when the form is submitted. It handles the submission process, including displaying notifications based on the outcome.
 */
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
