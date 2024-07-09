import type { BookingResponse } from '~/resources/bookings/types/response'

export default defineEventHandler(async (event): Promise<BookingResponse[]> => {
  const query = getQuery(event)
  return await $fetch<BookingResponse[]>('https://my-json-server.typicode.com/Evobaso-J/travel-manager/bookings', {
    method: 'GET',
    query,
  })
})
