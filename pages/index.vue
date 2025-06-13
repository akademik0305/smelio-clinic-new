<script lang="ts" setup>
//===============================-< imports >-===============================
// types
// import type { TRestaurant, TRestaurantsData } from '~/types/api.types'
// // service
import Service from '~/service/Service'
import urls from '~/service/urls'
// import { useCartStore } from '~/store/cart.store'
// import { useMapStore } from '~/store/map.store'
// import { useStore } from '~/store/useful.store'
// //> store
// const store = useStore()
// const mapStore = useMapStore()
// const cartStore = useCartStore()

// //> utils
const { locale } = useI18n()
const token = useToken()
// const router = useRouter()
// const localePath = useLocalePath()

//===============================-< categories >-===============================
// //> variables
// const categoriesRef = ref(null)
// const categoriesSwiper = useSwiper(categoriesRef, {
// 	slidesPerView: 6,
// 	spaceBetween: 20,
// })
//> functions

//===============================-< categories >-===============================
//> variables
const categoryCardsRef = ref(null)
const categoryCardsSwiper = useSwiper(categoryCardsRef, {
	slidesPerView: 5.2,
	spaceBetween: 20,
	autoplay: {
		delay: 3000,
	},
})
//> functions

//===============================-< banners swiper >-===============================
//> variables
const bannersRef = ref(null)
const bannersSwiper = useSwiper(bannersRef, {
	spaceBetween: 20,
	autoplay: {
		delay: 3000,
	},
	pagination: {
		clickable: true,
	},
})
//> functions

//===============================-< get  banner >-===============================
//> variables
const banners = ref()
//> functions
async function getBanners() {
	const res = await Service.get(urls.getBanners(), locale.value, null)

	banners.value = res.data
}

getBanners()

//===============================-< get categories >-===============================
//> variables
const categories = ref()
//> functions
async function getCategories() {
	const res = await Service.get(urls.getHomeCategories(), locale.value, null)

	categories.value = res.data
}

getCategories()
</script>
<template>
	<main class="">
		<!-- banner -->
		<section class="mt-3 pb-8">
			<div class="container">
				<ClientOnly>
					<div class="relative">
						<swiper-container ref="bannersRef" :init="true">
							<swiper-slide v-for="(slide, idx) in banners" :key="idx">
								<a :href="slide.url" target="_blank" class="block h-[450px]">
									<img
										class="w-full h-full object-cover rounded-xl"
										:src="slide.imageUrl"
										alt="kfc"
									/>
								</a>
							</swiper-slide>
						</swiper-container>
						<button
							class="absolute top-1/2 -translate-y-1/2 -left-5 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center p-2 z-10"
							@click="bannersSwiper.prev()"
						>
							<UIcon name="tabler:chevron-left" class="text-2xl" />
						</button>
						<button
							class="absolute top-1/2 -translate-y-1/2 -right-5 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center p-2 z-10"
							@click="bannersSwiper.next()"
						>
							<UIcon name="tabler:chevron-right" class="text-2xl" />
						</button>
					</div>
				</ClientOnly>
			</div>
		</section>
		<!-- banner -->

		<!-- categories cards -->
		<section class="pb-8">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-semibold">Ommabop kategoriyalar</h2>
				</div>
				<div class="mt-4 relative">
					<swiper-container ref="categoryCardsRef" :init="true" class="">
						<swiper-slide v-for="(slide, idx) in categories" :key="idx">
							<CategoryCard :category="slide" />
						</swiper-slide>
					</swiper-container>
					<button
						class="absolute top-1/2 -translate-y-1/2 -left-5 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center p-2 z-10"
						@click="categoryCardsSwiper.prev()"
					>
						<UIcon name="tabler:chevron-left" class="text-2xl" />
					</button>
					<button
						class="absolute top-1/2 -translate-y-1/2 -right-5 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center p-2 z-10"
						@click="categoryCardsSwiper.next()"
					>
						<UIcon name="tabler:chevron-right" class="text-2xl" />
					</button>
				</div>
			</div>
		</section>
		<!-- categories cards -->

		<!-- categories -->
		<!-- <section class="pb-8">
			<div class="container">
				<ClientOnly>
					<div>
						<swiper-container
							ref="categoriesRef"
							:init="true"
							class="h-auto overflow-hidden"
						>
							<swiper-slide v-for="(slide, idx) in 8" :key="idx">
								<div
									class="flex items-center gap-2 bg-bg-soft rounded-xl px-6 py-2.5 shadow-md hover:bg-main transition-colors cursor-pointer group"
								>
									<UIcon
										name="i-lucide-search"
										class="text-text group-hover:text-bg"
									/>
									<p class="text-center text-text group-hover:text-bg">
										Smartfonlar
									</p>
								</div>
							</swiper-slide>
						</swiper-container>
					</div>
				</ClientOnly>
			</div>
		</section> -->
		<!-- categories -->

		<!-- hot products -->
		<section class="pb-8">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-semibold">Qaynoq takliflar</h2>
				</div>
				<div class="mt-4 grid grid-cols-5 gap-5">
					<ProductCard v-for="item in 7" :key="item" :product="{ id: item }" />
				</div>
			</div>
		</section>
		<!-- hot products -->

		<!-- hot products -->
		<section class="pb-8">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-semibold">Ommabop</h2>
				</div>
				<div class="mt-4 grid grid-cols-5 gap-5">
					<ProductCard v-for="item in 6" :key="item" :product="{ id: item }" />
				</div>
			</div>
		</section>
		<!-- hot products -->
	</main>
</template>
