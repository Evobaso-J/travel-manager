import type { WithId, WithOptionalId, ResourceClient } from './types'
import type { UseFetchOptions } from '#app'

const READ_METHODS = ['GET', 'HEAD', 'OPTIONS', 'get', 'head', 'options'] as const satisfies UseFetchOptions<void>['method'][]
const WRITE_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE', 'post', 'put', 'patch', 'delete'] as const satisfies UseFetchOptions<void>['method'][]

export function useResourceClientFetch<
  TInternal extends WithOptionalId,
  TResponse extends WithId,
  TRequest extends WithOptionalId,

>(resourceClient: ResourceClient<TInternal, TResponse, TRequest>,
  options: UseFetchOptions<TResponse[], TInternal[]>,
) {
  const method = (isRef(options.method) ? options.method.value : options.method) ?? 'GET'
  let fetchOptions = options

  if ((READ_METHODS).includes(method as typeof READ_METHODS[number])) {
    fetchOptions = {
      ...fetchOptions,
      transform: data => resourceClient.parse(data),
    }
  }
  else if (WRITE_METHODS.includes(method as typeof WRITE_METHODS[number])) {
    const data = computed(() => resourceClient.write(options.body as TInternal[]))
    fetchOptions = {
      ...fetchOptions,
      body: data,
      watch: false,
    }
  }
  else {
    throw new Error(`Invalid method: ${method}`)
  }

  return useFetch(resourceClient.route, fetchOptions)
}
