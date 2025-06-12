
export default {
  // auth
  sendPhone() { return `/auth-manager/register/phone` },
  verifyCode() { return `/auth-manager/register/verify` },
  signUp() { return `/auth-manager/register/sign-up` },

  // home page
  getBanners() { return `/data/banners` },

  // categories
  getAllCategories() { return `/product/all-categories` },
  getHomeCategories() { return `/product/home-categories` },
  getCategoryProducts(category_id: number) { return `/product/category-product/?category_id=${category_id}` },

  // products
  productDetail(product_id: number) { return `/product/product-detail?id=${product_id}` },
  addToWishlist(product_id: number) { return `/product-save/save-or-remove?product_id=${product_id}` },
  search(key: string) { return `/product/search?key=${key}` },
};
