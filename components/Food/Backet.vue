<script lang="ts" setup>
//===============================-< imports >-===============================
// service
import Service from '~/service/Service'
import urls from '~/service/urls'
import { useCartStore } from '~/store/cart.store'
import { useStore } from '~/store/useful.store'
import type { TSimilarProducts } from '~/types/api.types'

// store
const store = useStore()
const cartStore = useCartStore()
//> utils
const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()
const token = useToken()
// emits
const emits = defineEmits(['close'])

//===============================-< get similar products >-===============================
//> variables
const similarProducts = ref<TSimilarProducts>()
type TBody = {
	restaurantId: number
	productIds: number[]
}
//> functions
async function getSimilar() {
	const data: TBody = {
		restaurantId: cartStore.activeRestaurantId,
		productIds: [],
	}

	const restaurant = cartStore.restaurants.find(
		res => res.id === cartStore.activeRestaurantId
	)
	if (restaurant) {
		restaurant.products.forEach(product => {
			data.productIds.push(product.product_id)
		})

		const res = await Service.post<TSimilarProducts, TBody>(
			urls.getSimilerProducts(),
			locale.value,
			data,
			token.value
		)
		if (res.status === 200) {
			similarProducts.value = res.data
			console.log(similarProducts.value)
		}
	} else {
		console.log('restaurant not found')
	}
}
getSimilar()

//===============================-< active restaurant >-===============================
//> variables
const activeRestaurant = computed(() => {
	return cartStore.restaurants.find(
		res => res.id === cartStore.activeRestaurantId
	)
})
//> functions
</script>
<template>
	<div class="backet p-3 pb-32 bg-gray-1">
		<section class="">
			<article
				v-for="product in activeRestaurant?.products"
				:key="product.product_id"
				class="mt-3 first:mt-0 bg-white p-2 rounded-lg"
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="h-12 w-16 rounded-md bg-gray-1 p-1">
							<ClientOnly>
								<img
									v-if="product.imageUrl"
									:src="product.imageUrl"
									class="w-full h-full"
									alt="food name"
								/>
								<img
									v-else
									src="~/assets/images/png/lavash.png"
									class="w-full h-full"
									alt="food name"
								/>
							</ClientOnly>
						</div>
						<div>
							<p class="text-sm font-medium font-inter">
								{{ product.product_name }}
							</p>
							<p class="mt-2 text-xs text-gray-4">
								{{ store.formatCurrency(product.price) }}
							</p>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<button
							class="w-6 h-6 rounded-full bg-gray-1 flex items-center justify-center"
							@click="cartStore.decProductCount(product.product_id)"
						>
							<Icon name="ic:round-minus" class="text-lg" />
						</button>
						<p class="font-inter w-8 text-center">
							{{ cartStore.getProductCount(product.product_id) }}
						</p>
						<button
							class="w-6 h-6 rounded-full bg-yellow flex items-center justify-center"
							@click="cartStore.incProductCount(product.product_id)"
						>
							<Icon name="ic:round-plus" class="text-lg" />
						</button>
					</div>
				</div>
			</article>
		</section>

		<section class="mt-7.5">
			<h3 class="text-lg">Qiziq bo’lishi mumkin</h3>
			<div class="mt-4">
				<ClientOnly>
					<swiper-container
						ref="similarRef"
						:init="true"
						:loop="true"
						:slides-per-view="3"
						:space-between="12"
					>
						<swiper-slide v-for="(product, idx) in similarProducts" :key="idx">
							<article class="bg-white p-2 rounded-lg">
								<div
									class="h-16 flex items-center justify-center bg-gray-1 rounded-xl p-2"
								>
									<img	
										class="w-full h-full object-contain"
										:src="product.images[0]"
										:alt="product.name"
									/>
								</div>

								<div class="mt-3 text-sm">
									<p class="font-inter">{{ product.name }}</p>
									<p class="text-gray-5 mt-2">{{ product.price }}</p>
								</div>

								<button
									class="mt-3 flex items-center justify-center bg-gray-1 rounded-full w-full py-1.5 px-2"
									@click="cartStore.addToCart(product)"
								>
									<Icon name="ic:round-plus" class="text-lg" />
								</button>
							</article>
						</swiper-slide>
					</swiper-container>
				</ClientOnly>
			</div>
		</section>

		<footer
			class="fixed bottom-0 z-10 left-0 w-full bg-white rounded-t-xl px-3 py-4 shadow-modal"
		>
			<div class="flex items-center justify-start gap-4">
				<p class="mx-auto text-sm text-gray-3 pr-6">
					Umumiy summa:
					<span class="text-black pl-2">{{
						store.formatCurrency(cartStore.allPrice)
					}}</span>
				</p>
			</div>

			<div class="mt-4">
				<NuxtLink
					:to="localePath(`/order/${route.params.id}`)"
					class="bg-yellow rounded-full w-full block text-center p-2 pr-4"
					@click="emits('close')"
				>
					Davom etish
				</NuxtLink>
			</div>
		</footer>
	</div>
</template>
<!-- <style></style> -->
