export type TCart = {
  product_id: number,
  product_name: string,
  quantity: number,
  price: number,
  imageUrl: string,
}[]

export type TRestaurants = {
  id: number,
  products: TCart
}[]