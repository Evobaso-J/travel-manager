export const toNaturalCase = (str: string): string =>
  str.replace(/([A-Z])/g, ' $1').trim()

export const formatDate = (date: Date): string =>
  date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

export const formatPrice = (price: number): string =>
  price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })
