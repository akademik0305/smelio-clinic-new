<script lang="ts" setup>
//===============================-< imports >-===============================
// types
// import type { TRestaurant, TRestaurantsData } from '~/types/api.types'
// // service
import { EmployeeCard } from '#components'
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
	loop: true,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
	},
	pagination: {
		clickable: true,
	},
})
//> functions

//===============================-< services >-===============================
//> variables
const serviceCardsRef = ref(null)
const serviceCardsSwiper = useSwiper(serviceCardsRef, {
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
//===============================-< employees >-===============================
//> variables
const employeeCardsRef = ref(null)
const employeeCardsSwiper = useSwiper(employeeCardsRef, {
	spaceBetween: 20,
	slidesPerView: 3,
	slideToClickedSlide: true,
	centeredSlides: true,
	loop: true,
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

//> functions

// DEBUG
const services = [
	{ id: 0, name: 'Tish kariesini davolash' },
	{ id: 1, name: 'Tish toshlarini tozalash (gigiyena)' },
	{ id: 2, name: 'Tish nervini olib plombalash (endodontiya)' },
	{ id: 3, name: 'Estetik plombalash' },
	{ id: 4, name: 'Tishni oqartirish (bleaching)' },
	{ id: 5, name: 'Sun’iy tish o‘rnatish (protezlash)' },
	{ id: 6, name: 'Breketlar o‘rnatish (ortodontiya)' },
	{ id: 7, name: 'Tishni tortib tashlash (ekstraksiya)' },
	{
		id: 8,
		name: 'Sut tishlariga davolovchi xizmatlar (bolalar stomatologiyasi)',
	},
	{ id: 9, name: 'Implantatsiya (tish ildizini o‘rniga implant qo‘yish)' },
]

onMounted(() => {
	
})
</script>
<template>
	<main class="">
		<!-- banner -->
		<section class="mt-3 pb-8">
			<div class="container">
				<ClientOnly>
					<div class="relative">
						<swiper-container
							ref="bannersRef"
							:init="true"
							class="overflow-hidden"
						>
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
							<swiper-slide class="h-[40svh] md:max-h-[400px]">
								<img
									class="w-full h-full object-cover rounded-sm"
									src="~/assets/images/jpg/banner.jpg"
									alt="kfc"
								/>
							</swiper-slide>
							<swiper-slide class="h-[40svh] md:max-h-[400px]">
								<img
									class="w-full h-full object-cover rounded-sm"
									src="~/assets/images/jpg/banner-2.jpg"
									alt="kfc"
								/>
							</swiper-slide>
							<swiper-slide class="h-[40svh] md:max-h-[400px]">
								<img
									class="w-full h-full object-cover rounded-sm"
									src="~/assets/images/jpg/banner-3.jpg"
									alt="kfc"
								/>
							</swiper-slide>
						</swiper-container>
						<button
							class="absolute top-1/2 -translate-y-1/2 left-0 w-15 h-full bg-gradient-to-r from-white/40 to-transparent hidden md:flex items-center justify-center p-0 z-10"
							@click="bannersSwiper.prev()"
						>
							<UIcon name="tabler:chevron-left" class="text-2xl text-main" />
						</button>
						<button
							class="absolute top-1/2 -translate-y-1/2 right-0 w-15 h-full bg-gradient-to-r from-transparent to-white/40 hidden md:flex items-center justify-center p-0 z-10"
							@click="bannersSwiper.next()"
						>
							<UIcon name="tabler:chevron-right" class="text-2xl text-main" />
						</button>
					</div>
				</ClientOnly>
			</div>
		</section>
		<!-- banner -->

		<!-- service cards -->
		<section class="pb-8">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-semibold">{{ $t('services') }}</h2>
				</div>
				<div class="mt-4 relative">
					<swiper-container ref="serviceCardsRef" :init="true" class="">
						<swiper-slide v-for="(service, idx) in services" :key="idx">
							<ServiceCard :service="service" />
						</swiper-slide>
					</swiper-container>
					<button
						class="absolute top-1/2 -translate-y-1/2 -left-10 w-12 h-12 rounded-full bg-white shadow-md hidden md:flex items-center justify-center p-2 z-10"
						@click="serviceCardsSwiper.prev()"
					>
						<UIcon name="tabler:chevron-left" class="text-2xl" />
					</button>
					<button
						class="absolute top-1/2 -translate-y-1/2 -right-10 w-12 h-12 rounded-full bg-white shadow-md hidden md:flex items-center justify-center p-2 z-10"
						@click="serviceCardsSwiper.next()"
					>
						<UIcon name="tabler:chevron-right" class="text-2xl" />
					</button>
				</div>
			</div>
		</section>
		<!-- service cards -->

		<!-- employe cards -->
		<section class="pb-8 employees">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-semibold">{{ $t('employees') }}</h2>
				</div>
				<div class="mt-4 relative flex items-center gap-4">
					<div class="w-1/4">
						<h4 class="font-semibold text-xl text-text">
							Bizning hodimlarimiz
						</h4>
						<p class="font-medium mt-3 text-subtext">
							Bizning shifokorlarimiz ular bilan yaqinroq tanishadilar. <br />
							Qarang, ular qanchalik zo'r!
						</p>
					</div>
					<div class="w-3/4">
						<swiper-container ref="employeeCardsRef" :init="true" class="">
							<swiper-slide v-for="(service, idx) in services" :key="idx">
								<EmployeeCard :service="service" />
							</swiper-slide>
						</swiper-container>
					</div>
				</div>
			</div>
		</section>
		<!-- employe cards -->
	</main>
</template>
<style>
.employees swiper-container {
	.swiper-slide-active {
		transform: scale(1);
		filter: blur(0);
		pointer-events: all;
	}
}

.employees swiper-slide {
	transition: transform 0.3s ease;
	transform: scale(0.8);
	/* filter: blur(4px); */
	user-select: none;
	/* pointer-events: none; */
}
</style>
