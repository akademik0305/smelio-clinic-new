<script lang="ts" setup>
//===============================-< imports >-===============================
// types
// import type { TRestaurant, TRestaurantsData } from '~/types/api.types'
// // service
// import Service from '~/service/Service'
// import urls from '~/service/urls'
// import { useCartStore } from '~/store/cart.store'
// import { useMapStore } from '~/store/map.store'
// import { useStore } from '~/store/useful.store'
// //> store
// const store = useStore()
// const mapStore = useMapStore()
// const cartStore = useCartStore()

// //> utils
// const { t, locale } = useI18n()
// const token = useToken()
// const router = useRouter()
// const localePath = useLocalePath()

//===============================-< fixed navbar and category >-===============================
//> variables
const startFixed = 80
const isFixedNav = ref(false)
function handleScrool() {
	const navbarHeight =
		document.querySelector('#navbar')?.scrollHeight || startFixed
	if (window.scrollY > navbarHeight) {
		isFixedNav.value = true
	} else {
		isFixedNav.value = false
	}
}
//> functions

//===============================-< categories >-===============================
//> variables
const categoriesRef = ref('')
const categoriesSwiper = useSwiper(categoriesRef, {
	slidesPerView: 6,
	spaceBetween: 20,
})
//> functions

//===============================-< on page load >-===============================
//> variables
//> functions
onMounted(() => {
	window.addEventListener('scroll', handleScrool)
	// mapStore.getUserPosition()
	// console.log(mapStore.activeAddress)
})
onUnmounted(() => {
	window.removeEventListener('scroll', handleScrool)
})
</script>
<template>
	<main class="pb-10 pt-20">
		<section class="py-4 px-2 rounded-b-xl">
			<div class="container">
				<!-- search -->
				<BaseSearch />
			</div>
			<!-- search -->
		</section>

		<!-- banner -->
		<section class="mt-3 pb-12">
			<div class="container">
				<ClientOnly>
					<swiper-container :init="true" :pagination="{ clickable: true }">
						<swiper-slide v-for="(slide, idx) in 4" :key="idx">
							<div class="h-[550px]">
								<img
									class="w-full h-full object-cover rounded-xl"
									src="~/assets/images/jpg/fake.jpg"
									alt="kfc"
								/>
							</div>
						</swiper-slide>
					</swiper-container>
				</ClientOnly>
			</div>
		</section>
		<!-- banner -->
		<!-- categories -->
		<section class="pb-12">
			<div class="container">
				<ClientOnly>
					<div>
						<swiper-container
							ref="categoriesRef"
							:init="false"
							class="h-12 overflow-hidden"
						>
							<swiper-slide v-for="(slide, idx) in 12" :key="idx">
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
		</section>
		<!-- categories -->

		<!-- hot products -->
		<section class="pb-12">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-semibold">Qaynoq takliflar</h2>
				</div>
				<div class="mt-5 grid grid-cols-4 gap-4">
					<ProductCard v-for="item in 12" :key="item" :product="{ id: item }" />
				</div>
			</div>
		</section>
		<!-- hot products -->

		<!-- hot products -->
		<section class="pb-12">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-semibold">Ommabop</h2>
				</div>
				<div class="mt-5 grid grid-cols-4 gap-4">
					<ProductCard v-for="item in 6" :key="item" :product="{ id: item }" />
				</div>
			</div>
		</section>
		<!-- hot products -->
	</main>
</template>
