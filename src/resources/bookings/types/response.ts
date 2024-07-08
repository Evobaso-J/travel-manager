import type { PaymentType } from './internal'

export type BookingResponse = {
  id: number
  paymentType: PaymentType
  travelId: number
  customerId: number
  notes: string
}
