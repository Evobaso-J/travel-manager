import type { PaymentType } from './resources/bookings/types/internal'

export const toNaturalCase = (str: string): string =>
  str.replace(/([A-Z])/g, ' $1').trim()

export const formatDateToStandard = (date: Date): string =>
  date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

export const formatDateToHTMLInputStandard = (date: Date): string =>
  // Using split to remove the time part
  date.toISOString().split('T')[0]!

export const formatPrice = (price: number): string =>
  price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })

export const mapPaymentTypeToString = (paymentType: PaymentType): string => {
  if (paymentType === 'creditTransfer') return 'Credit Transfer'
  if (paymentType === 'payPal') return 'PayPal'
  if (paymentType === 'revolut') return 'Revolut'
  throw new Error('Unsupported payment type')
}

export const sleep = (ms: number = 1000): Promise<void> => {
  console.info('Simulating a delay of ' + ms + ' ms.')
  return new Promise(resolve => setTimeout(resolve, ms))
}
