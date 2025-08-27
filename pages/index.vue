<script lang="ts" setup>
//===============================-< imports >-===============================
// types
// import type { TRestaurant, TRestaurantsData } from '~/types/api.types'
// // service
import Service from "~/service/Service";
import urls from "~/service/urls";
import type {
	TAwwards,
	TEmployee,
	TEmployees,
	TPortfolios,
} from "~/types/api.types";

// //> utils
const { locale } = useI18n();
const token = useToken();
// const localePath = useLocalePath();
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
const banners = ref();
//> functions
async function getBanners() {
	const res = await Service.get(urls.getBanners(), locale.value, null);

	banners.value = res.data;
}

getBanners();

//===============================-< banners swiper >-===============================
//> variables
const bannersRef = ref(null);
const bannersSwiper = useSwiper(bannersRef, {
	spaceBetween: 20,
	loop: true,
	speed: 500,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
	},
	pagination: {
		clickable: true,
	},
});
//> functions

//===============================-< services >-===============================
//> variables
const serviceCardsRef = ref(null);
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
});
//> functions
//===============================-< employees >-===============================
//> variables
const employeeCardsRef = ref(null);
const employeeCardsSwiper = useSwiper(employeeCardsRef, {
	spaceBetween: 20,
	slidesPerView: 3,
	slideToClickedSlide: true,
	centeredSlides: true,
	loop: true,
	autoplay: {
		delay: 3000,
	},
});
//> functions
//===============================-< awwards >-===============================
//> variables
const awwardsRef = ref(null);
const awwardsSwiper = useSwiper(awwardsRef, {
	spaceBetween: 20,
	slidesPerView: 2,
	effect: "creative",
	creativeEffect: {},
	loop: true,
	autoplay: {
		delay: 3000,
	},
});
//> functions
//===============================-< works swiper >-===============================
//> variables
const worksRef = ref(null);
const worksSwiper = useSwiper(worksRef, {
	loop: true,
	effect: "creative",
	autoplay: {
		delay: 5000,
	},
	creativeEffect: {
		prev: {
			shadow: true,
			origin: "left center",
			translate: ["-5%", 0, -200],
			rotate: [0, 100, 0],
		},
		next: {
			origin: "right center",
			translate: ["5%", 0, -200],
			rotate: [0, -100, 0],
		},
	},
});

const worksSwiperNext = () => {
	worksRef.value?.swiper?.slideNext();
};
const worksSwiperPrev = () => {
	worksRef.value?.swiper?.slidePrev();
};

//> functions

//===============================-< get services >-===============================
//> variables
const services = ref();

//> functions

async function getServices() {
	services.value = await Service.get(
		urls.getServices(),
		locale.value,
		token.value
	);
}
getServices();
//===============================-< get employees >-===============================
//> variables
const employees = ref<TEmployees>();
const firstEmployee = ref<TEmployee>();

//> functions

async function getEmployees() {
	employees.value = await Service.get(
		urls.getOurTeam(),
		locale.value,
		token.value
	);
	firstEmployee.value = employees.value?.data.shift();
}

getEmployees();

//===============================-< get awwards >-===============================
//> variables
const awwards = ref<TAwwards>();

//> functions

async function getAwwards() {
	awwards.value = await Service.get(
		urls.getAwwards(),
		locale.value,
		token.value
	);
}
getAwwards();

//===============================-< get works >-===============================
//> variables
const portfolio = ref<TPortfolios>();

//> functions

async function getPortfolio() {
	portfolio.value = await Service.get(
		urls.getPortfolio(),
		locale.value,
		token.value
	);
}
getPortfolio();

onMounted(() => {
	console.log(worksSwiper.instance);
});
</script>
<template>
	<main class="">
		<!-- banner -->
		<header class="pb-10">
			<ClientOnly>
				<div class="relative">
					<swiper-container
						ref="bannersRef"
						:init="true"
						class="overflow-hidden"
					>
						<swiper-slide v-for="(slide, idx) in banners" :key="idx">
							<a
								:href="slide.url"
								target="_blank"
								class="block h-[40svh] md:h-[400px]"
							>
								<img
									class="w-full h-full object-cover rounded-sm"
									:src="slide.imageUrl"
									alt="Banner"
								/>
							</a>
						</swiper-slide>
					</swiper-container>
					<button
						class="absolute top-1/2 -translate-y-1/2 left-0 w-15 h-[40svh] md:h-[500px] bg-gradient-to-r from-white/40 to-transparent hidden md:flex items-center justify-center p-0 z-10"
						@click="bannersSwiper.prev()"
					>
						<UIcon name="tabler:chevron-left" class="text-2xl text-main" />
					</button>
					<button
						class="absolute top-1/2 -translate-y-1/2 right-0 w-15 h-[40svh] md:h-[500px] bg-gradient-to-r from-transparent to-white/40 hidden md:flex items-center justify-center p-0 z-10"
						@click="bannersSwiper.next()"
					>
						<UIcon name="tabler:chevron-right" class="text-2xl text-main" />
					</button>
				</div>
			</ClientOnly>
		</header>
		<!-- banner -->

		<!-- service cards -->
		<section class="pb-10">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-semibold">Klinika xizmatlari</h2>
					<NuxtLink
						to="/services"
						class="text-main hover:text-main-hover flex items-center gap-1 text-sm group transition-color duration-300"
					>
						Barcha xizmatlarni ko'rish
						<UIcon
							name="tabler:chevron-right"
							class="text-lg text-main group-hover:translate-x-1 transition-transform duration-300"
						/>
					</NuxtLink>
				</div>
				<div class="mt-4 relative grid grid-cols-5 gap-4">
					<ServiceCard
						v-for="serice in services?.data"
						:key="serice.name"
						:service="serice"
					/>
				</div>
			</div>
		</section>
		<!-- service cards -->

		<!-- employee cards -->
		<section class="pb-10">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-semibold">Bizning stomatologlarimiz</h2>
					<NuxtLink
						to="/employees"
						class="text-main hover:text-main-hover flex items-center gap-1 text-sm group transition-color duration-300"
					>
						Barcha shifokorlarni ko'rish
						<UIcon
							name="tabler:chevron-right"
							class="text-lg text-main group-hover:translate-x-1 transition-transform duration-300"
						/>
					</NuxtLink>
				</div>

				<div class="mt-8 flex items-start gap-5">
					<NuxtLink
						:to="`/employees/${firstEmployee?.id}`"
						class="block max-w-1/2 border-b border-b-border pb-4"
					>
						<div class="w-full h-auto">
							<img
								:src="firstEmployee?.imageUrl"
								class="w-full h-full"
								:alt="firstEmployee?.full_name"
							/>
						</div>
						<div class="px-4">
							<h3 class="mt-5 font-medium text-2xl text-text">
								{{ firstEmployee?.full_name }}
							</h3>
							<p class="mt-4 font-medium text-subtext text-xs">
								{{ firstEmployee?.position }}
							</p>
							<p
								class="mt-5 font-medium text-text"
								v-html="firstEmployee?.content"
							/>
						</div>
					</NuxtLink>

					<div class="grid grid-cols-2 gap-4">
						<NuxtLink
							v-for="item in employees?.data"
							:key="item.id"
							:to="`/employees/${item.id}`"
							class="block border-b border-b-border pb-4"
						>
							<div class="w-full h-auto">
								<img
									:src="item.imageUrl"
									class="w-full h-full"
									:alt="item.full_name"
								/>
							</div>
							<div class="px-4">
								<h3 class="mt-5 font-medium text-xl text-text">
									{{ item.full_name }}
								</h3>
								<p class="mt-4 font-medium text-subtext text-xs">
									{{ item.position }}
								</p>
							</div>
						</NuxtLink>
					</div>
				</div>
			</div>
		</section>
		<!-- employee cards -->

		<!-- awwars  -->
		<section class="pb-10">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-semibold">Stomatologiyamiz mukofotlari</h2>
					<!-- <NuxtLink
						to="/services"
						class="text-main hover:text-main-hover flex items-center gap-1 text-sm group transition-color duration-300"
					>
						Barcha mukofotlarni ko'rish
						<UIcon
							name="tabler:chevron-right"
							class="text-lg text-main group-hover:translate-x-1 transition-transform duration-300"
						/>
					</NuxtLink> -->
				</div>
				<div class="mt-4 relative">
					<UiFuncybox
						:options="{
							Carousel: {
								infinite: false,
							},
						}"
					>
						<swiper-container ref="awwardsRef" :init="true">
							<swiper-slide v-for="item in awwards?.data" :key="item.id">
								<div class="flex gap-4 border-b border-border pb-4">
									<div class="w-full max-w-48">
										<a
											class="w-full h-auto flex items-center justify-center"
											:href="item.imageUrl"
											data-fancybox="gallery"
											data-caption="Благодарственное письмо от I`MOMS"
										>
											<img
												:src="item.imageUrl"
												:alt="item.title"
												class="w-full h-full max-w-80"
											/>
										</a>
									</div>
									<div class="p-4">
										<h4 class="text-text text-xl font-medium">
											{{ item.title }}
										</h4>
										<p class="mt-4 text-text font-medium">
											{{ item.description }}
										</p>
									</div>
								</div>
							</swiper-slide>
						</swiper-container>
					</UiFuncybox>
					<button
						v-if="awwards?.data?.length && awwards?.data?.length > 2"
						class="absolute top-1/2 -translate-y-1/2 -left-12 w-12 h-12 rounded-full hidden md:flex items-center justify-center p-0 z-10"
						@click="awwardsSwiper.prev()"
					>
						<UIcon name="tabler:chevron-left" class="text-4xl text-main" />
					</button>
					<button
						v-if="awwards?.data?.length && awwards?.data?.length > 2"
						class="absolute top-1/2 -translate-y-1/2 -right-12 w-12 h-12 rounded-full hidden md:flex items-center justify-center p-0 z-10"
						@click="awwardsSwiper.next()"
					>
						<UIcon name="tabler:chevron-right" class="text-4xl text-main" />
					</button>
				</div>
			</div>
		</section>
		<!-- awwars  -->

		<!-- works -->
		<section class="pb-10">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-semibold">Bizning ishlarimiz</h2>
				</div>
				<div class="mt-4 relative">
					<ClientOnly>
						<swiper-container
							ref="worksRef"
							class="overflow-hidden"
							:init="false"
						>
							<swiper-slide
								v-for="item in portfolio?.data"
								:key="item.id"
								class="h-[40svh] md:max-h-[500px]"
							>
								<img
									class="w-full h-full object-cover"
									:src="item.imageUrl"
									alt="banner"
								/>
							</swiper-slide>
						</swiper-container>
						<button
							class="absolute top-1/2 -translate-y-1/2 left-0 w-15 h-[40svh] md:h-[500px] bg-gradient-to-r from-white/40 to-transparent hidden md:flex items-center justify-center p-0 z-10"
							@click="worksSwiperPrev"
						>
							<UIcon name="tabler:chevron-left" class="text-2xl text-main" />
						</button>
						<button
							class="absolute top-1/2 -translate-y-1/2 right-0 w-15 h-[40svh] md:h-[500px] bg-gradient-to-r from-transparent to-white/40 hidden md:flex items-center justify-center p-0 z-10"
							@click="worksSwiperNext"
						>
							<UIcon name="tabler:chevron-right" class="text-2xl text-main" />
						</button>
					</ClientOnly>
				</div>
			</div>
		</section>
		<!-- works -->

		<!-- map -->
		<section class="pb-10">
			<div class="relative overflow-hidden w-full">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3039.9419228630854!2d71.7761512!3d40.3658121!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb856e07d8c5d3%3A0x10577e00597fff0f!2sSmelio%20Stomatalogiya!5e0!3m2!1sru!2s!4v1756054859649!5m2!1sru!2s"
					style="border: 0"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					class="h-[50vh] w-full"
				/>
			</div>
			<!-- map -->
		</section>
	</main>
</template>
