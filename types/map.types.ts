// one address
export type TAddress = {
  "id": number,
  "address": string,
  "latitude": number,
  "longitude": number,
  "address_type"?: number,
  "address_type_name"?: string,
  "street"?: string,
  "house"?: number,
  "floor"?: number
  "is_default": 0 | 1
}

export type TAddresses = TAddress[]

// 
// open street map
type TDetailAddress = {
  "shop": string,
  "road": string,
  "neighbourhood": string,
  "county": string,
  "city": string,
  "ISO3166-2-lvl4": string,
  "postcode": string,
  "country": string,
  "country_code": string
}

export type TPositionDetail = {
  "place_id": number,
  "licence": string,
  "osm_type": string,
  "osm_id": number,
  "lat": string,
  "lon": string,
  "class": string,
  "type": string,
  "place_rank": number,
  "importance": number,
  "addresstype": string,
  "name": string,
  "display_name": string,
  "address": TDetailAddress,
  "boundingbox": string[]
}

export type TPlace = {
  "place_id": number,
  "licence": string,
  "osm_type": string,
  "osm_id": number,
  "lat": string,
  "lon": string,
  "class": string,
  "type": string,
  "place_rank": number,
  "importance": number,
  "addresstype": string,
  "name": string,
  "display_name": string,
  "boundingbox": string[]
}