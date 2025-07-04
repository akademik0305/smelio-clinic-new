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
  images: string[]
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


export type TOrderProduct = {
  id: number,
  product_id: number,
  productName: string,
  count: string,
  total_sum: string,
  totalSumFormat: string,
  product_price: string,
  productPriceFormat: string,
}

export type TOrderItem = {
  id: number,
  dateFormat: string,
  delivery_type: number,
  deliveryTypeName: string,
  phone: string,
  delivery_sum: string | null,
  deliverySumFormat: string,
  total_sum: string,
  totalSumFormat: string,
  status: number,
  statusName: string,
  orderItems: TOrderProduct[]
}

export type TOrder = {
  items: TOrderItem[],
  _meta: TMeta
}

export type TPaymentItem = {
  id: number,
  payment_type_id: number,
  paymentTypeName: string,
  amount: string,
  amountSumFormat: string,
  dateFormat: string,
}

export type TPayment = {
  items: TPaymentItem[],
  _meta: TMeta
}

export type TCards = {
  card_name: string,
  card_number: string,
  id: number,
}