import type { Gender } from './internal'

export type CustomerResponse = {
  id: number
  name: string
  email: string
  phone: string
  age: number
  gender: Gender
}
