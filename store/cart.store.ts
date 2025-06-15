import type { TProduct } from "~/types/api.types";
import type { TCart, TCartProduct } from "~/types/cart.types";


export const useCartStore = defineStore("useCartStore", () => {
  const { t } = useI18n();
  // cart products
  const cart = ref<TCart>([]);

  // products count
  const productsCount = computed(() => {
    let count = 0;
    cart.value?.forEach((product: TCartProduct) => {
      count += product.quantity
    })
    return count
  })

  // format currency
  function formatCurrency(amount: number) {
    if (typeof amount !== "number") {
      throw new Error(t("currency.invalidNumber"));
    }
    const formatted = amount.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formatted} ${t("sum")}`;
  }

  // all price
  const allPrice = computed(() => {
    let summ = 0
    cart.value?.forEach((product: TCartProduct) => {
      summ += product.price * product.quantity
    })
    return formatCurrency(summ)
  })

  // get product count
  function checkIsExist(product_id: number) {
    const product = cart.value?.find((product: TCartProduct) => product.product_id === product_id)
    return !!product
  }

  // add to cart
  function addToCart(product: TProduct) {
    cart.value.push({
      quantity: 1,
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      priceFormat: product.priceFormat,
      imageUrl: product.imageUrl
    })
    console.log(product.priceFormat);
  }

  function removeFromCart(product_id: number) {
    const productIndex = cart.value.findIndex((product) => product.product_id === product_id)
    if (productIndex >= 0) {
      cart.value.splice(productIndex, 1)
    } else {
      console.log('product not found')
    }
  }

  function handleChangeCount(value: number, product_id: number) {
    console.log(value);
    if (value <= 0) {
      removeFromCart(product_id)
    }
  }





  // inc product count
  // function incProductCount(product_id: number) {
  //   const product = cart.value.find((product) => product.product_id === product_id)
  //   if (product) {
  //     product.quantity += 1
  //   } else {
  //     console.log('product not found')
  //   }
  // }
  // // dec product count
  // function decProductCount(product_id: number) {
  //   const productIndex = cart.value.findIndex((product) => product.product_id === product_id)
  //   const product = cart.value[productIndex]
  //   if (product) {
  //     product.quantity -= 1
  //     if (product.quantity === 0) {
  //       cart.value.splice(productIndex, 1)
  //     }
  //   } else {
  //     console.log('product not found')
  //   }
  // }

  return {
    cart,
    productsCount,
    allPrice,
    checkIsExist,
    addToCart,
    removeFromCart,
    formatCurrency,
    handleChangeCount,
    // incProductCount,
    // decProductCount
  };
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    key: "rm-cart"
  },
});