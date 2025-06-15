
export default {
  // auth
  sendPhone() { return `/auth-manager/register/phone` },
  verifyCode() { return `/auth-manager/register/verify` },
  signUp() { return `/auth-manager/register/sign-up` },

  // profile
  profileInfo() { return `/profile/index` },
  updateName() { return `/profile/update-name` },
  updatePhone() { return `/update-username/phone` },
  updatePhoneVerify() { return `/update-username/verify` },


  // home page
  getBanners() { return `/data/banners` },
  getSections() { return `/product/site-sections` },
  getSectionProducts(section_id: number, page: number) { return `/product/site-section-detail?siteSectionId=${section_id}&page=${page}` },


  // categories
  getAllCategories() { return `/product/all-categories` },
  getHomeCategories() { return `/product/home-categories` },
  getCategoryProducts(category_id: number, page: number) { return `/product/category-product/?category_id=${category_id}&page=${page}` },

  // products
  productDetail(product_id: number) { return `/product/product-detail?id=${product_id}` },
  search(key: string) { return `/product/search?key=${key}` },

  // wishlist
  addToWishlist(product_id: number) { return `/product-save/save-or-remove?product_id=${product_id}` },
  getWishlists() { return `/product-save/user-saved-products` },

  // contact
  getContactInfo() { return `/data/contact-info` },

  // orders
  orderDelivery() { return `/order/delivery` },
  orderPickup() { return `/order/store-pickup` },
};
