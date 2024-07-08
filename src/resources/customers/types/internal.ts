export type Gender = 'female' | 'male' | 'other' | 'notSpecified'

export type Customer = {
  id?: number
  name: string
  email: string
  phone: string
  age: number
  gender: Gender
}
