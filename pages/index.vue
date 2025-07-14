<script lang="ts" setup>
//===============================-< imports >-===============================
// types
// import type { TRestaurant, TRestaurantsData } from '~/types/api.types'
// // service
import Service from '~/service/Service'
import urls from '~/service/urls'
import type { THomeSection } from '~/types/api.types'

// //> utils
const { locale } = useI18n()
const token = useToken()
const localePath = useLocalePath()
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

//===============================-< get  banner >-===============================
//> variables
const banners = ref()
//> functions
async function getBanners() {
	const res = await Service.get(urls.getBanners(), locale.value, null)

	banners.value = res.data
}

getBanners()

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

//===============================-< categories >-===============================
//> variables
const categoryCardsRef = ref(null)
const categoryCardsSwiper = useSwiper(categoryCardsRef, {
	spaceBetween: 20,
	breakpoints: {
		320: {
			slidesPerView: 2.2,
			spaceBetween: 12,
		},
		450: {
			slidesPerView: 2.2,
		},
		600: {
			slidesPerView: 2.6,
		},
		768: {
			slidesPerView: 3.2,
		},
		1024: {
			slidesPerView: 4.2,
		},
		1280: {
			slidesPerView: 5.2,
		},
	},
	autoplay: {
		delay: 3000,
	},
})
//> functions

//===============================-< get categories >-===============================
//> variables
const categories = ref()
//> functions
async function getCategories() {
	const res = await Service.get(urls.getHomeCategories(), locale.value, null)

	categories.value = res.data
}

getCategories()

//===============================-< get sections >-===============================
//> variables
const sections = ref<THomeSection[]>()

async function getSections() {
	const res = await Service.get<THomeSection[]>(
		urls.getSections(),
		locale.value,
		token.value
	)
	sections.value = res.data
}

getSections()
// refetch sections
function refetchSections() {
	getSections()
}
//> functions
</script>
<template>
	<main class="">
		<!-- banner -->
		<section class="mt-3 pb-8">
			<div class="container">
				<ClientOnly>
					<div class="relative">
						<swiper-container ref="bannersRef" :init="true">
							<!-- <swiper-slide v-for="(slide, idx) in banners" :key="idx">
								<a
									:href="slide.url"
									target="_blank"
									class="block h-[40svh] md:h-[400px]"
								>
									<img
										class="w-full h-full object-cover rounded-sm"
										:src="slide.imageUrl"
										alt="kfc"
									/>
								</a>
							</swiper-slide> -->
							<swiper-slide>
								<a href="#" class="block h-[40svh] md:h-[400px]">
									<img
										class="w-full h-full object-cover rounded-sm"
										src="~/assets/images/jpg/banner.jpg"
										alt="kfc"
									/>
								</a>
							</swiper-slide>
							<swiper-slide>
								<a href="#" class="block h-[40svh] md:h-[400px]">
									<img
										class="w-full h-full object-cover rounded-sm"
										src="~/assets/images/jpg/banner-2.jpg"
										alt="kfc"
									/>
								</a>
							</swiper-slide>
							<swiper-slide>
								<a href="#" class="block h-[40svh] md:h-[400px]">
									<img
										class="w-full h-full object-cover rounded-sm"
										src="~/assets/images/jpg/banner-3.jpg"
										alt="kfc"
									/>
								</a>
							</swiper-slide>
						</swiper-container>
						<button
							class="absolute top-1/2 -translate-y-1/2 -left-5 w-12 h-12 rounded-full bg-main shadow-md hidden md:flex items-center justify-center p-2 z-10"
							@click="bannersSwiper.prev()"
						>
							<UIcon name="tabler:chevron-left" class="text-2xl" />
						</button>
						<button
							class="absolute top-1/2 -translate-y-1/2 -right-5 w-12 h-12 rounded-full bg-main shadow-md hidden md:flex items-center justify-center p-2 z-10"
							@click="bannersSwiper.next()"
						>
							<UIcon name="tabler:chevron-right" class="text-2xl" /></button
						>main
					</div>
				</ClientOnly>
			</div>
		</section>
		<!-- banner -->

		<!-- categories cards -->
		<section class="pb-8">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-semibold">{{ $t('popular_categories') }}</h2>
				</div>
				<div class="mt-4 relative">
					<swiper-container ref="categoryCardsRef" :init="true" class="">
						<swiper-slide v-for="(slide, idx) in categories" :key="idx">
							<!-- <CategoryCard :category="slide" /> -->
						</swiper-slide>
					</swiper-container>
					<button
						class="absolute top-1/2 -translate-y-1/2 -left-5 w-12 h-12 rounded-full bg-white shadow-md hidden md:flex items-center justify-center p-2 z-10"
						@click="categoryCardsSwiper.prev()"
					>
						<UIcon name="tabler:chevron-left" class="text-2xl" />
					</button>
					<button
						class="absolute top-1/2 -translate-y-1/2 -right-5 w-12 h-12 rounded-full bg-white shadow-md hidden md:flex items-center justify-center p-2 z-10"
						@click="categoryCardsSwiper.next()"
					>
						<UIcon name="tabler:chevron-right" class="text-2xl" />
					</button>
				</div>
			</div>
		</section>
		<!-- categories cards -->

		<!-- <div>
			<div
				class="bg-[--bg-color] shadow-lg rounded-lg max-w-sm py-8 px-4 border border-[--pr-color]"
			>
				<div class="flex flex-col items-center">
					<div
						class="w-32 h-32 rounded-full border-2 border-[--pr-color] relative"
					>
						<img
							src="~/assets/images/jpg/muhammadrasul.jpg"
							class="w-full h-full rounded-full"
							alt=""
						/>

						<a
							class="w-8 h-8 z-10 flex items-center justify-center absolute right-0 bottom-0"
							href="https://www.linkedin.com/in/nurmukhamedov/"
						>
							<img
								class="w-full h-full"
								src="~/assets/images/svg/linkedin-icon.svg"
								alt="LinkedIn"
							/>
						</a>
					</div>
				</div>
				<div class="text-center mt-4">
					<h4 class="text-2xl text-white font-semibold">
						Muhammadrasul Nurmukhamedov
					</h4>
					<h5 class="text-md text-white opacity-75">Frontend Engineer</h5>
				</div>

				<ul class="space-y-3 text-sm mt-5">
					<li
						v-for="item in 4"
						:key="item"
						class="flex items-center gap-x-3 min-w-0"
					>
						<Icon
							name="i-heroicons:check-circle-20-solid"
							class="w-5 h-5 flex-shrink-0 text-white"
						/>
						<span class="text-gray-600 dark:text-gray-400 truncate"
							>Frontend</span
						>
					</li>
				</ul>
				<div class="mt-4 text-white text-center">
					<div class="flex items-center justify-center gap-2">
						<p class="font-semibold">Tajriba:</p>
						<p class="text-[#FBEA97] font-medium uppercase">2.5 yil+</p>
					</div>
				</div>
				<div class="mt-2 text-center">
					<p class="text-white font-semibold">Intervyu darajasi:</p>
					<p class="text-[#FBEA97] opacity-90 uppercase">Junior - Middle</p>
				</div>
			</div>
		</div> -->
	</main>
</template>
