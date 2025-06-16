<script lang="ts" setup>
//===============================-< imports >-===============================
// types
// import type { TWishlist } from '~/types/api.types'

//> utils
// import Service from '~/service/Service'
// import urls from '~/service/urls'
// import { useAuthStore } from '~/store/auth.store'
import { useAuthStore } from '~/store/auth.store'
import { useCartStore } from '~/store/cart.store'
// const { locale } = useI18n()
// const toast = useToast()
// const token = useToken()
// const wishlistCount = useWishlistCount()
// store
// const authStore = useAuthStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const toast = useToast()

//===============================-< get wishlists >-===============================
//> variables
// const wishlists = ref<TWishlist>()
//> functions

// //===============================-< add or remove product from wishlist >-===============================
// //> variables
// //> functions
// async function toggleWishlist(product_id: number) {
// 	if (authStore.isLogged) {
// 		const res = await Service.get(
// 			urls.addToWishlist(product_id),
// 			locale.value,
// 			token.value
// 		)

// 		if (res.status === 200) {
// 			setTimeout(() => {
// 				getWishlists()
// 				emits('success-wishlist')
// 			}, 1000)
// 		}
// 	} else {
// 		toast.add({
// 			title: "Saqlanganlarga qo'shish uchun ro'yhatdan o'tishiz kerak",
// 			color: 'error',
// 		})
// 	}
// }

// //===============================-< on load >-===============================
// //> variables
// onMounted(() => {
// 	if (!wishlistCount.value && authStore.isLogged) {
// 		getWishlists()
// 	}
// })

//===============================-< submit order >-===============================
//> variables
const isOpenSubmitOrder = ref(false)

const openSubmitOrder = () => {
	if (authStore.isLogged) {
		isOpenSubmitOrder.value = true
	} else {
		toast.add({
			title: "Buyurtmani rashmiylashtirish uchun ro'yhatdan o'tishingiz kerak",
			color: 'error',
		})
	}
}

const closeSubmitOrder = () => {
	isOpenSubmitOrder.value = false
}

//===============================-< on submit >-===============================
//> variables
//> functions
//> functions
</script>
<template>
	<main class="py-6">
		<nav>
			<div class="container">
				<h2 class="text-2xl font-semibold">Korzinka</h2>
				<BaseBreadcump
					:links="[{ label: 'Asosiy sahifa', url: '/' }, { label: 'Korzinka' }]"
				/>
			</div>
		</nav>

		<section class="mt-8">
			<div class="container">
				<div class="flex items-start gap-6">
					<!-- products -->
					<div class="shadow-md border border-border rounded-2xl p-6 flex-2">
						<div class="flex items-center justify-between">
							<h3 class="font-medium text-xl">Mahsulotlar:</h3>
							<button
								v-if="cartStore.cart.length"
								class="cursor-pointer hover:text-main transition-colors underline"
								@click="cartStore.clearCart"
							>
								Tozalash
							</button>
						</div>
						<div v-if="cartStore.cart.length" class="">
							<article
								v-for="product in cartStore.cart"
								:key="product.product_id"
								class="mt-4 grid grid-cols-6 items-center gap-2"
							>
								<div
									class="w-full max-w-32 h-auto p-4 flex items-center justify-center"
								>
									<img
										:src="product.imageUrl"
										:alt="product.product_name"
										class="w-full h-full object-contain"
									/>
								</div>
								<div class="col-span-2 line-clamp-2">
									<NuxtLink :to="`/products/${2}`" class="text-md text-text">
										{{ product.product_name }}
									</NuxtLink>
								</div>

								<div class="flex items-center justify-between gap-3">
									<UFormField name="firstname" class="w-20">
										<UInput
											v-model="product.quantity"
											size="lg"
											class="w-full mx-auto flex justify-center"
											type="number"
											:max="product.residue"
											:min="0"
											@update:model-value="cartStore.handleChangeCount(product)"
										/>
									</UFormField>
								</div>
								<div class="flex items-center">
									{{
										cartStore.formatCurrency(product.quantity * product.price)
									}}
								</div>
								<div class="flex flex-col items-center justify-center gap-4">
									<!-- <button class="cursor-pointer group"
									@click="toggleWishlist"
								>
									<UIcon
										name="mdi:heart-outline"
										class="text-2xl w-6 text-text group-hover:text-main"
									/>
								</button> -->
									<button
										class="cursor-pointer group"
										@click="cartStore.removeFromCart(product.product_id)"
									>
										<UIcon
											name="mynaui:trash"
											class="text-2xl w-6 text-text group-hover:text-red-500"
										/>
									</button>
								</div>
							</article>
						</div>

						<div
							v-else
							class="w-full h-80 flex flex-col items-center justify-center gap-2"
						>
							<div class="w-40 h-auto flex justify-center">
								<Icon
									name="icon-park-solid:database-network"
									class="mt-2 text-7xl text-slate-400"
								/>
							</div>
							<p class="font-meduim text-base text-gray-4">
								{{ $t('empty_cart') }}
							</p>
						</div>
					</div>
					<!-- submit order -->
					<div
						v-if="cartStore.cart.length"
						class="shadow-md border border-border rounded-2xl p-6 flex-1 flex flex-col"
					>
						<div
							class="flex items-center justify-between py-2 gap-6 border-b border-b-border"
						>
							<p class="text-subtext">
								{{ cartStore.productsCount }} dona mahsulot narxi:
							</p>
							<p class="font-semibold text-text">{{ cartStore.allPrice }}</p>
						</div>
						<div
							class="mt-2 flex items-center justify-between py-2 gap-6 border-b border-b-border"
						>
							<p class="font-semibold text-text text-lg">Jami:</p>
							<p class="font-semibold text-text text-lg">
								{{ cartStore.allPrice }}
							</p>
						</div>
						<button
							class="mt-8 flex items-center justify-center gap-2 bg-main border border-bg rounded-full w-full py-2 px-6 cursor-pointer group hover:bg-bg hover:border-main transition-colors"
							@click="openSubmitOrder"
						>
							<span class="text-sm text-bg group-hover:text-main"
								>Rasmiylashtirish</span
							>
						</button>
					</div>
				</div>
			</div>
		</section>

		<!--=== modals ===-->
		<!-- send phone number -->
		<BaseModal :is-open="isOpenSubmitOrder" @close="closeSubmitOrder">
			<template #header>
				<div class="">
					<h5 class="font-semibold text-xl text-center">
						Buyurtmani rasmiylashtirish
					</h5>
				</div>
			</template>
			<CartOrder @success="closeSubmitOrder" />
		</BaseModal>
		<!--=== modals ===-->
	</main>
</template>
