export type ApiResponse<Data> = {
  data: Data;
  status: number;
  message: string,
  success: boolean
};


export type TMeta = {
  totalCount: number,
  pageCount: number,
  currentPage: number,
  perPage: number
}


export type TProduct = {
  id: number
  name: string
  description: string
  category_id: string
  categoryName: string
  imageUrl: string
  isSaved: string
  price: number
  priceFormat: string
  oldPrice: number
  oldPriceFormat: string
  residue: number
}

export type TSection = {
  id: number,
  name: string,
  products: TProduct[]
}

export type TWishlist = TProduct[]