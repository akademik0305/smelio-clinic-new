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

// Restaurant
type TSchedule = {
  id: number,
  open_time: string,
  close_time: string,
  day_of_week: string,
  is_closed: number,
  day_of_week_name: string
}

export type TRestaurantsData = {
  id: number,
  name: string,
  address: string,
  latitude: string,
  longitude: string,
  delivery_minutes: number,
  estimated_delivery_time: number,
  category_id: number,
  category: string,
  info: string,
  image: string | null,
  is_open_now: boolean,
  schedules: TSchedule[]
}

export type TRestaurant = {
  data: TRestaurantsData[]
  _meta: TMeta
}

export type TOneRestaurant = {
  data: TRestaurantsData
  _meta: TMeta

}

// Product
export type TProduct = {
  "id": number,
  "name": string,
  "short_description": string,
  "info": string,
  "price": number,
  "images": string[]
}

export type TCategories = {
  name: string,
  id: number
}[]

export type TProducts = {
  id: number,
  name: string,
  image: string,
  products: TProduct[]
}[]

export type TSimilarProducts = TProduct[]


