import type { Travel } from '../travels/types/internal'
import type { ResourceClient } from '../types'
import type { TravelRequest } from './types/request'
import type { TravelResponse } from './types/response'

const parse = async (response: TravelResponse[]): Promise<Travel[]> => response.map(response => ({
  ...response,
  departureDate: new Date(response.departureDate),
  returnDate: new Date(response.returnDate),
}))

const write = (internal: Travel[]): TravelRequest[] => internal.map(internal => ({
  ...internal,
}))

export const travelsClient: ResourceClient<Travel, TravelResponse, TravelRequest> = {
  route: '/api/travels',
  parse,
  write,
}
