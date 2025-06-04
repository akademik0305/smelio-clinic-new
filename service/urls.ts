
export default {
  // restaurants
  getRestaurants() { return `/restaurant/index` },
  getOneRestaurant(restaurant_id: number) { return `/restaurant/view?id=${restaurant_id}` },
  getCategories() { return `/restaurant-category/index` },

  // products
  getProducts(restaurant_id: number) { return `/product/index?restaurant_id=${restaurant_id}` },
  getProductCategory(restaurant_id: number) { return `/product/index?restaurant_id=${restaurant_id}` },

  // addresses
  getAddresses() { return '/delivery-address/index' },
  getAddressTypes() { return '/delivery-address/address-types' },
  createAddress() { return '/delivery-address/create' },
  updateAddress(address_id: number) { return `/delivery-address/update?id=${address_id}` },
  changeActiveAddress(address_id: number) { return `/delivery-address/change?id=${address_id}` },
  deleteAddress(address_id: number) { return `/delivery-address/delete?id=${address_id}` },

  // orders
  createOrder() { return `/order/create` },
  checkPromocode() { return `/order/check-promo-code` },
  orderHistory() { return `/order/order-history` },
  orderDetail(order_id: number) { return `/order/order-detail?id=${order_id}` },
  cancelOrder(order_id: number) { return `/order/order-cancel?id=${order_id}` },
  getSimilerProducts() { return `/order/might-be-interesting` }

};
