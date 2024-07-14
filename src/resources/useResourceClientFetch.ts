import type { WithId, WithOptionalId, ResourceClient } from './types'
import type { UseFetchOptions } from '#app'

const READ_METHODS = ['GET', 'HEAD', 'OPTIONS', 'get', 'head', 'options'] as const satisfies UseFetchOptions<void>['method'][]
const WRITE_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE', 'post', 'put', 'patch', 'delete'] as const satisfies UseFetchOptions<void>['method'][]

/**
 * Wrapper for nuxt's useFetch composable that uses a ResourceClient to handle data transformation.
 *
 * For read operations, it transforms the fetched data using the `parse` method of the `ResourceClient`.
 * For write operations, it prepares the data using the `write` method of the `ResourceClient` before sending it to the server.
 *
 * @param {ResourceClient<TInternal, TResponse, TRequest>} resourceClient - An instance of `ResourceClient` used to interact with the server.
 * @param {UseFetchOptions<TResponse[], TInternal[]>} options - Options for configuring the fetch operation. This includes the HTTP method, body of the request for write operations, and any additional fetch options.
 *
 * @returns {UseFetchReturn<TResponse[], TInternal[]>} Returns the result of the `useFetch` composable, which includes the response data, loading state, error state, and functions to manipulate the fetch operation.
 *
 * @throws {Error} Throws an error if an invalid HTTP method is provided.
 */
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
