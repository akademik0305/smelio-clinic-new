export type TCartProduct = {
  product_id: number,
  product_name: string,
  quantity: number,
  price: number,
  priceFormat: string,
  imageUrl: string,
}
export type TCart = TCartProduct[]
