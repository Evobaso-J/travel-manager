import type { Customer } from '~/resources/customers/types/internal'

export type PaymentType = 'creditTransfer' | 'payPal' | 'revolut'

export type Booking = {
  id?: number
  paymentType: PaymentType
  travelId: number
  customer: Customer
  notes: string
}
