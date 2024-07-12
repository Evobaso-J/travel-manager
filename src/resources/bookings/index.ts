import type { Customer } from '../customers/types/internal'
import type { ResourceClient } from '../types'
import type { Booking } from './types/internal'
import type { BookingRequest } from './types/request'
import type { BookingResponse } from './types/response'

const parse = async (response: BookingResponse[]): Promise<Booking[]> => {
  const { customerIds } = response.reduce((acc, curr) => ({
    customerIds: [...acc.customerIds, curr.customerId],
  }), { customerIds: [] } as { customerIds: number[] })

  const customers = await $fetch('/api/customers', {
    method: 'get',
    query: {
      id: customerIds,
    },
  })

  const customersById = customers.reduce((acc, curr) => {
    const { id, ...rest } = curr
    return {
      ...acc,
      [id]: {
        ...rest,
      },
    }
  }, {} as Record<number, Omit<Customer, 'id'>>) ?? {}

  return response.map(({ customerId, ...rest }) => ({
    customer: customersById[customerId]!,
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
