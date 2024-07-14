import type { CustomerResponse } from '~/resources/customers/types/response'

export default defineEventHandler(async (event): Promise<CustomerResponse[]> => {
  const query = getQuery(event)
  return await $fetch<CustomerResponse[]>('https://my-json-server.typicode.com/Evobaso-J/travel-manager/customers', {
    query,
  })
})
