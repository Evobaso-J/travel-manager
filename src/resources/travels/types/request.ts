export type TravelRequest = {
  id?: number
  name: string
  departureDate: Date
  returnDate: Date
  // Change image upload model
  pictureSource: string
  tourDescription: string
  price: number
  averageRating: number
}
