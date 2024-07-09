import type { Customer } from '~/resources/customers/types/internal'
import type { Travel } from '~/resources/travels/types/internal'

export type PaymentType = 'creditTransfer' | 'payPal' | 'revolut'

export type Booking = {
  id?: number
  paymentType: PaymentType
  travel: Travel
  customer: Customer
  notes: string
}
