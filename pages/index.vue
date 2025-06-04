<script lang="ts" setup>
//===============================-< imports >-===============================
// types
import type { TRestaurant, TRestaurantsData } from '~/types/api.types'
// service
import Service from '~/service/Service'
import urls from '~/service/urls'
import { useCartStore } from '~/store/cart.store'
import { useMapStore } from '~/store/map.store'
import { useStore } from '~/store/useful.store'
//> store
const store = useStore()
const mapStore = useMapStore()
const cartStore = useCartStore()

//> utils
const { t, locale } = useI18n()
const token = useToken()
const router = useRouter()
const localePath = useLocalePath()

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

//===============================-< on page load >-===============================
//> variables
//> functions
onMounted(() => {
	window.addEventListener('scroll', handleScrool)
	mapStore.getUserPosition()
	console.log(mapStore.activeAddress)
})
onUnmounted(() => {
	window.removeEventListener('scroll', handleScrool)
})
</script>
<template>
	<main class="pb-10 pt-20">
		<!-- <nav
			id="navbar"
			class="py-4 px-2 bg-white rounded-b-xl w-full -top-10 transition-all"
			:class="[isFixedNav ? 'fixed top-0 left-0 z-50 shadow-md' : '']"
		>
			<div class="flex items-center justify-start">
				<NuxtLink to="/" class="w-6 h-6">
					<Icon name="iconamoon:arrow-left-2" class="w-full h-full text-3xl" />
				</NuxtLink>

				<div class="mx-auto text-center">
					<h4 class="">Yetkazib berish</h4>
					<button
						class="flex items-center gap-1 mt-1.5 text-sm font-inter"
						@click="checkCurrentAddress"
					>
						<p>{{ mapStore.activeAddress?.address }}</p>
						<span
							class="w-3 h-3 flex items-center justify-center rounded-full bg-black"
						>
							<Icon
								name="iconamoon:arrow-right-2"
								class="flex-1 text-sm text-white"
							/>
						</span>
					</button>
				</div>
			</div>
			<div
				v-if="!mapStore.isCorrect"
				class="flex items-center justify-center mt-3 gap-2"
			>
				<button
					class="bg-gray-1 w-full py-2 rounded-4xl text-center"
					@click="confirmAddress"
				>
					Qoldirish
				</button>
				<NuxtLink
					:to="localePath('/map')"
					class="bg-yellow w-full py-2 rounded-4xl text-center"
				>
					O'zgartirish
				</NuxtLink>
			</div>
		</nav> -->
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
					<swiper-container :init="true" :pagination="{}">
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
					<swiper-container
						:init="true"
						:slides-per-view="6"
						:space-between="20"
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
				<div class="mt-5 grid grid-cols-5 gap-4">
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
				<div class="mt-5 grid grid-cols-5 gap-4">
					<ProductCard v-for="item in 6" :key="item" :product="{ id: item }" />
				</div>
			</div>
		</section>
		<!-- hot products -->
	</main>
</template>
<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
	display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}

.swiper-pagination-bullet {
	width: 12px;
	height: 12px;
	background-color: #888;
	opacity: 0.5;
	margin: 0 6px;
	border-radius: 9999px;
	transition: all 0.3s ease;
}

.swiper-pagination-bullet-active {
	background-color: #feed01;
	opacity: 1;
	width: 16px;
	height: 16px;
}
</style>
