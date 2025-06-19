export type ApiResponse<Data> = {
  data: Data,
  status: number,
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
  id: number,
  name: string,
  description: string,
  category_id: string,
  categoryName: string,
  imageUrl: string,
  isSaved: string,
  price: number,
  priceFormat: string,
  oldPrice: number,
  oldPriceFormat: string,
  residue: number,
  quantity: number,
}

export type THomeSection = {
  id: number,
  name: string,
  products: TProduct[],
}

export type TSection = {
  section: {
    id: number,
    name: string,
    imageUrl: string
  },
  dataProvider: {
    items: TProduct[],
    _meta: TMeta
  }
}
export type TCategory = {
  category: {
    id: number,
    name: string,
    imageUrl: string
  },
  dataProvider: {
    items: TProduct[],
    _meta: TMeta
  }
}

export type TSearch = {
  items: TProduct[],
  _meta: TMeta
}

export type TWishlist = TProduct[]