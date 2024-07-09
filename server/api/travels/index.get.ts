import type { TravelResponse } from '~/resources/travels/types/response'

export default defineEventHandler(async (event): Promise<TravelResponse[]> => {
  const query = getQuery(event)
  return await $fetch<TravelResponse[]>('https://my-json-server.typicode.com/Evobaso-J/travel-manager/travels', {
    method: 'GET',
    query,
  })
})
