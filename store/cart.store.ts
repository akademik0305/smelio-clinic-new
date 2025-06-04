import type { TProduct } from "~/types/api.types";
import type { TCart, TRestaurants } from "~/types/cart.types";

export const useCartStore = defineStore("useCartStore", () => {
  const restaurants = ref<TRestaurants>([])
  const activeRestaurantId = ref(0)
  const cart = ref<TCart>([]);

  // set active restaurant
  function setActiveRestaurant(id: number) {
    activeRestaurantId.value = id
  }

  // all price
  // const allPrice = computed(() => {
  //   const cart = restaurants.value.find(restaurant => restaurant.id === activeRestaurantId.value)
  //   let summ = 0

  //   if (cart) {
  //     cart.products.forEach((product) => {
  //       summ += product.price * product.quantity
  //     })
  //     return summ
  //   }
  // })
  const allPrice = computed(() => {
    const cart = restaurants.value.find(res => res.id === activeRestaurantId.value)
    let summ = 0
    if (cart) {
      cart.products.forEach((product) => {
        summ += product.price * product.quantity
      })
      return summ
    }
    return 0
  })

  // // check is exist
  // function checkIsExist(product_id: number) {
  //   const product = cart.value.find((product) => product.product_id === product_id)
  //   return product ? true : false
  // }

  // get all backet products count


  // get product count
  function getProductCount(product_id: number) {
    const cartIndex = restaurants.value.findIndex(res => res.id === activeRestaurantId.value)
    if (cartIndex >= 0) {
      const product = restaurants.value[cartIndex].products.find((product) => product.product_id === product_id)
      return product ? product.quantity : false
    }
    return 0
  }

  // add to cart
  function addToCart(product: TProduct) {
    const cartIndex = restaurants.value.findIndex(res => res.id === activeRestaurantId.value)

    // agar restarant bo'lsa shu restarantni ichiga yangi mahsulot qo'shadi
    if (cartIndex >= 0) {
      restaurants.value[cartIndex].products.push({
        quantity: 1,
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        imageUrl: product.images[0]
      })
    } else {
      // agar restarant bo'lmasa yangi restarant qo'shib unga mahsulot qo'shadi
      restaurants.value.push({
        id: activeRestaurantId.value,
        products: [
          {
            quantity: 1,
            product_id: product.id,
            product_name: product.name,
            price: product.price,
            imageUrl: product.images[0]
          }
        ]
      })
    }
  }

  // inc product count
  function incProductCount(product_id: number) {
    const cartIndex = restaurants.value.findIndex(res => res.id === activeRestaurantId.value)
    if (cartIndex >= 0) {
      const product = restaurants.value[cartIndex].products.find((product) => product.product_id === product_id)
      if (product) {
        product.quantity += 1
      } else {
        console.log('product not found')
      }
    }
  }
  // dec product count
  function decProductCount(product_id: number) {
    const cartIndex = restaurants.value.findIndex(res => res.id === activeRestaurantId.value)
    if (cartIndex >= 0) {
      const productIndex = restaurants.value[cartIndex].products.findIndex((product) => product.product_id === product_id)
      if (productIndex >= 0) {
        restaurants.value[cartIndex].products[productIndex].quantity -= 1
        if (restaurants.value[cartIndex].products[productIndex].quantity === 0) {
          restaurants.value[cartIndex].products.splice(productIndex, 1)
        }
      } else {
        console.log('product not found')
      }
    }
  }

  return {
    cart,
    restaurants,
    activeRestaurantId,
    allPrice,
    setActiveRestaurant,
    getProductCount,
    addToCart,
    incProductCount,
    decProductCount
  };
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
});
