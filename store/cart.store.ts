import type { TProduct } from "~/types/api.types";
import type { TCart } from "~/types/cart.types";

export const useCartStore = defineStore("useCartStore", () => {
  const cart = ref<TCart>([]);

  // all price
  const allPrice = computed(() => {
    let summ = 0
    cart.value.forEach((product) => {
      summ += product.price * product.quantity
    })
    return summ
  })

  // get product count
  function getProductCount(product_id: number) {
    const product = cart.value.find((product) => product.product_id === product_id)
    return product ? product.quantity : false
  }

  // add to cart
  function addToCart(product: TProduct) {
    cart.value.push({
      quantity: 1,
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      imageUrl: product.images[0]
    })
  }

  // inc product count
  function incProductCount(product_id: number) {
    const product = cart.value.find((product) => product.product_id === product_id)
    if (product) {
      product.quantity += 1
    } else {
      console.log('product not found')
    }
  }
  // dec product count
  function decProductCount(product_id: number) {
    const productIndex = cart.value.findIndex((product) => product.product_id === product_id)
    const product = cart.value[productIndex]
    if (product) {
      product.quantity -= 1
      if (product.quantity === 0) {
        cart.value.splice(productIndex, 1)
      }
    } else {
      console.log('product not found')
    }
  }

  return {
    cart,
    allPrice,
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