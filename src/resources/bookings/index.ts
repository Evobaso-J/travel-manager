import type { Customer } from '../customers/types/internal'
import { travelsClient } from '../travels'
import type { Travel } from '../travels/types/internal'
import type { ResourceClient } from '../types'
import type { Booking } from './types/internal'
import type { BookingRequest } from './types/request'
import type { BookingResponse } from './types/response'

const parse = async (response: BookingResponse[]): Promise<Booking[]> => {
  const { customerIds, travelIds } = response.reduce((acc, curr) => ({
    customerIds: [...acc.customerIds, curr.customerId], travelIds: [...acc.customerIds, curr.travelId],
  }), { customerIds: [], travelIds: [] } as { customerIds: number[], travelIds: number[] })

  const travels = await travelsClient.parse(await $fetch('/api/travels', {
    method: 'get',
    query: {
      id: travelIds,
    },
  }))
  const customers = await $fetch('/api/customers', {
    method: 'get',
    query: {
      id: customerIds,
    },
  })

  const travelsById = travels.reduce((acc, curr) => {
    const { id, ...rest } = curr
    return {
      ...acc,
      [id!]: {
        ...rest,
        departureDate: new Date(rest.departureDate),
        returnDate: new Date(rest.returnDate),
      },
    }
  }, {} as Record<number, Omit<Travel, 'id'>>) ?? {}
  const customersById = customers.reduce((acc, curr) => {
    const { id, ...rest } = curr
    return {
      ...acc,
      [id]: {
        ...rest,
      },
    }
  }, {} as Record<number, Omit<Customer, 'id'>>) ?? {}

  return response.map(({ customerId, travelId, ...rest }) => ({
    customer: customersById[customerId]!,
    travel: travelsById[travelId]!,
    ...rest,
  }))
}

const write = (internal: Booking[]): BookingRequest[] => internal.map(internal => ({
  ...internal,
}))

export const bookingsClient: ResourceClient<Booking, BookingResponse, BookingRequest> = {
  route: '/api/bookings',
  parse,
  write,
}
