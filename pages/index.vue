<script lang="ts" setup>
//===============================-< imports >-===============================
// types
// import type { TRestaurant, TRestaurantsData } from '~/types/api.types'
// // service
import Service from "~/service/Service";
import urls from "~/service/urls";
import type { THomeSection } from "~/types/api.types";

// //> utils
const { locale } = useI18n();
const token = useToken();
const localePath = useLocalePath();
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
const worksRef = ref<any>(null);
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

//===============================-< get categories >-===============================
//> variables
const categories = ref();
//> functions
async function getCategories() {
	const res = await Service.get(urls.getHomeCategories(), locale.value, null);

	categories.value = res.data;
}

getCategories();

//===============================-< get sections >-===============================
//> variables
const sections = ref<THomeSection[]>();

async function getSections() {
	const res = await Service.get<THomeSection[]>(
		urls.getSections(),
		locale.value,
		token.value
	);
	sections.value = res.data;
}

getSections();

//> functions

// DEBUG
const services = [
	{ id: 0, name: "Tish kariesini davolash" },
	{ id: 1, name: "Tish toshlarini tozalash (gigiyena)" },
	{ id: 2, name: "Tish nervini olib plombalash (endodontiya)" },
	{ id: 3, name: "Estetik plombalash" },
	{ id: 4, name: "Tishni oqartirish (bleaching)" },
	{ id: 5, name: "Sun’iy tish o‘rnatish (protezlash)" },
	{ id: 6, name: "Breketlar o‘rnatish (ortodontiya)" },
	{ id: 6, name: "Breketlar o‘rnatish (ortodontiya)" },
	{ id: 7, name: "Tishni tortib tashlash (ekstraksiya)" },
	{ id: 7, name: "Tishni tortib tashlash (ekstraksiya)" },
];

onMounted(() => {
	console.log(worksSwiper.instance);
});
</script>
<template>
	<main class="">
		<!-- banner -->
		<section class="pb-8">
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
						<swiper-slide class="h-[40svh] md:max-h-[500px]">
							<img
								class="w-full h-full object-cover"
								src="~/assets/images/jpg/banner.jpg"
								alt="kfc"
							/>
						</swiper-slide>
						<swiper-slide class="h-[40svh] md:max-h-[500px]">
							<img
								class="w-full h-full object-cover"
								src="~/assets/images/jpg/banner-2.jpg"
								alt="kfc"
							/>
						</swiper-slide>
						<swiper-slide class="h-[40svh] md:max-h-[500px]">
							<img
								class="w-full h-full object-cover"
								src="~/assets/images/jpg/banner-3.jpg"
								alt="kfc"
							/>
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
		</section>
		<!-- banner -->

		<!-- service cards -->
		<section class="pb-8">
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
						v-for="serice in services"
						:key="serice.name"
						:service="serice"
					/>
				</div>
			</div>
		</section>
		<!-- service cards -->

		<!-- employee cards -->
		<section class="pb-8">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-semibold">Bizning stomatologlarimiz</h2>
					<NuxtLink
						to="/services"
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
						:to="`/employees/1`"
						class="block max-w-1/2 border-b border-b-border pb-4"
					>
						<div class="w-full h-auto">
							<img
								src="~/assets/images/webp/doctor.webp"
								class="w-full h-full"
								alt=""
							/>
						</div>
						<div class="px-4">
							<h3 class="mt-5 font-medium text-2xl text-text">
								Fridman Ilya Yulievich
							</h3>
							<p class="mt-5 font-medium text-text">
								Mening ismim Ekaterina Aleksandrovna Zaitseva, men Doktor Keller
								stomatologiya klinikasining bosh shifokoriman.
							</p>
							<p class="mt-4 font-medium text-text">
								Men har bir bemorga individual yondashuvni topaman, ayniqsa tish
								shifokoriga tashrif buyurishdan qo'rqish. Men har qanday
								murakkablikdagi kariesni davolayman, asabning o'zi va tish
								ildizini o'rab turgan periodontal to'qimalarning
								yallig'lanishini endodontik davolash. Men professional og'iz
								gigienasini bajaraman, keyin kerak bo'lsa chuqur yoki yuzaki
								florlash, uyda oqartirish yoki Zoom4 oqartirish. Men ortodontik
								davolanishni qabul qilib bo'lmaydigan tish qatoridagi alohida
								tishlarning holatini qayta tiklayman. Men ham protezlash uchun
								to'liq tayyorgarlik ko'raman. Har bir bemor sifatli davolanishi
								va tish shifokoridan tabassum bilan ketishi kerak, deb
								hisoblayman.
							</p>
							<p class="mt-4 font-medium text-text">
								Bemorlarning yoshi: 14 yoshdan 90 yoshgacha.
							</p>
							<p class="mt-4 font-medium text-subtext text-xs">
								Bosh shifokor, stomatolog-terapevt
							</p>
						</div>
					</NuxtLink>

					<div class="grid grid-cols-2 gap-4">
						<NuxtLink
							v-for="item in 4"
							:key="item"
							:to="`/employees/1`"
							class="block border-b border-b-border pb-4"
						>
							<div class="w-full h-auto">
								<img
									src="~/assets/images/webp/doctor.webp"
									class="w-full h-full"
									alt=""
								/>
							</div>
							<div class="px-4">
								<h3 class="mt-5 font-medium text-xl text-text">
									Fridman Ilya Yulievich
								</h3>
								<p class="mt-4 font-medium text-subtext text-xs">
									Bosh shifokor, stomatolog-terapevt
								</p>
							</div>
						</NuxtLink>
					</div>
				</div>
			</div>
		</section>
		<!-- employee cards -->

		<!-- awwars  -->
		<section class="pb-8">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-semibold">Stomatologiyamiz mukofotlari</h2>
					<NuxtLink
						to="/services"
						class="text-main hover:text-main-hover flex items-center gap-1 text-sm group transition-color duration-300"
					>
						Barcha mukofotlarni ko'rish
						<UIcon
							name="tabler:chevron-right"
							class="text-lg text-main group-hover:translate-x-1 transition-transform duration-300"
						/>
					</NuxtLink>
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
							<swiper-slide v-for="item in 6" :key="item">
								<div class="flex gap-4 border-b border-border pb-4">
									<div class="w-full">
										<a
											class="w-full h-auto flex items-center justify-center"
											href="./awward.webp"
											data-fancybox="gallery"
											data-caption="Благодарственное письмо от I`MOMS"
										>
											<img
												src="~/assets/images/webp/awward.webp"
												alt="product.name"
												class="w-full h-full max-w-80"
											/>
										</a>
									</div>
									<div class="p-4">
										<h4 class="text-text text-xl font-medium">
											I`MOMS dan minnatdorchilik maktubi
										</h4>
										<p class="mt-4 text-text font-medium">
											Doctor Keller stomatologiya klinikalari tarmog'i 2024
											yilgi "Yil klinikasi" tanlovida keng ko'lamli xizmatlar
											nominatsiyasiga ega ultra zamonaviy oilaviy klinikada
											g'olib chiqdi.
										</p>
									</div>
								</div>
							</swiper-slide>
						</swiper-container>
					</UiFuncybox>
					<button
						class="absolute top-1/2 -translate-y-1/2 -left-12 w-12 h-12 rounded-full hidden md:flex items-center justify-center p-0 z-10"
						@click="awwardsSwiper.prev()"
					>
						<UIcon name="tabler:chevron-left" class="text-4xl text-main" />
					</button>
					<button
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
		<section class="pb-8">
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
							<swiper-slide class="h-[40svh] md:max-h-[500px]">
								<img
									class="w-full h-full object-cover"
									src="~/assets/images/jpg/banner.jpg"
									alt="kfc"
								/>
							</swiper-slide>
							<swiper-slide class="h-[40svh] md:max-h-[500px]">
								<img
									class="w-full h-full object-cover"
									src="~/assets/images/jpg/banner-2.jpg"
									alt="kfc"
								/>
							</swiper-slide>
							<swiper-slide class="h-[40svh] md:max-h-[500px]">
								<img
									class="w-full h-full object-cover"
									src="~/assets/images/jpg/banner-3.jpg"
									alt="kfc"
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
		<section class="pb-8">
			<div class="relative overflow-hidden w-full">
				<a
					href="https://yandex.uz/maps/org/235868343416/?utm_medium=mapframe&utm_source=maps"
					style="color: #eee; font-size: 12px; position: absolute; top: 0px"
					>Smelio Dental Clinic</a
				><a
					href="https://yandex.uz/maps/10336/fergana/category/medical_center_clinic/184106108/?utm_medium=mapframe&utm_source=maps"
					style="color: #eee; font-size: 12px; position: absolute; top: 14px"
					>Медцентр, клиника в Фергане</a
				><iframe
					title="map"
					src="https://yandex.uz/map-widget/v1/org/235868343416/?ll=71.779813%2C40.365999&z=18.46"
					allowfullscreen="true"
					class="relative w-full h-[50svh]"
				/>
			</div>
			<!-- map -->
		</section>
	</main>
</template>
