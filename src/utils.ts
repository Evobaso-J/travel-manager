import type { PaymentType } from './resources/bookings/types/internal'
import type { Gender } from './resources/customers/types/internal'

/**
 * Converts a camelCase string to a natural case string by adding a space before each uppercase letter and trimming the result.
 * @param {string} str - The camelCase string to convert.
 * @returns {string} The converted string in natural case.
 */
export const toNaturalCase = (str: string): string =>
  str.replace(/([A-Z])/g, ' $1').trim()

/**
 * Formats a Date object to a human-readable string in the format of "Month Day, Year".
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string.
 */
export const formatDateToStandard = (date: Date): string =>
  date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

/**
 * Formats a Date object to a string suitable for HTML input elements of type "date".
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string in "YYYY-MM-DD" format.
 */
export const formatDateToHTMLInputStandard = (date: Date): string =>
  date.toISOString().split('T')[0]!

/**
 * Formats a number to a string representing a currency, using Italian locale formatting for Euros.
 * @param {number} price - The number to format.
 * @returns {string} The formatted price string in Euro currency.
 */
export const formatPrice = (price: number): string =>
  price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })

/**
 * Returns a promise that resolves after a specified number of milliseconds, simulating a delay.
 * @param {number} [ms=1000] - The number of milliseconds to delay. Defaults to 1000ms.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
export const sleep = (ms: number = 1000): Promise<void> => {
  console.info('Simulating a delay of ' + ms + ' ms.')
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * A mapping from `PaymentType` enum to human-readable string representations.
 */
export const paymentTypeToStringMap: Record<PaymentType, string> = {
  creditTransfer: 'Credit Transfer',
  payPal: 'PayPal',
  revolut: 'Revolut',
}

/**
 * A mapping from `Gender` enum to human-readable string representations.
 */
export const genderToStringMap: Record<Gender, string> = {
  female: 'Female',
  male: 'Male',
  notSpecified: 'Not Specified',
  other: 'Other',
}
