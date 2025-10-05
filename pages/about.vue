<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from "~/service/Service";
import urls from "~/service/urls";
import type { TAbout, TAwwards } from "~/types/api.types";
// //> utils
const { locale } = useI18n();
const token = useToken();
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

//===============================-< get about >-===============================
//> variables
const about = ref<TAbout>();

//> functions

async function getAbout() {
	about.value = await Service.get(urls.getAbout(), locale.value, token.value);
}
getAbout();
</script>
<template>
	<main class="wrapper">
		<nav class="hidden md:block mt-5">
			<div class="container">
				<BaseBreadcump :links="[
					{ label: $t('home_page'), url: '/' },
					{ label: $t('about_clinic') }
				]" />
			</div>
		</nav>

		<!-- about -->
		<section class="mt-4 pb-6 md:pb-8 lg:pb-10">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-xl md:text-2xl lg:text-3xl font-semibold">
						{{ $t('about_clinic') }}
					</h2>
				</div>
				<p class="mt-4 font-medium" v-html="about?.data.content" />
			</div>
		</section>

		<!-- awards -->
		<section class="pb-10">
			<div class="container">
				<div class="flex items-center justify-between flex-wrap gap-2">
					<h2 class="text-xl md:text-2xl lg:text-3xl font-semibold">
						{{ $t('awwards') }}
					</h2>
				</div>

				<div class="mt-6 relative">
					<UiFuncybox :options="{
						Carousel: {
							infinite: false,
						},
					}">
						<swiper-container ref="awwardsRef" :init="true">
							<swiper-slide v-for="item in awwards?.data" :key="item.id">
								<div class="flex flex-col sm:flex-row gap-4 border-b border-border pb-4">
									<!-- image -->
									<div class="w-full sm:w-48 flex-shrink-0">
										<a :href="item.imageUrl" data-fancybox="gallery" :data-caption="item.title"
											class="block w-full h-auto flex items-center justify-center">
											<img :src="item.imageUrl" :alt="item.title" class="w-full h-auto max-w-80 object-contain" />
										</a>
									</div>

									<!-- text -->
									<div class="p-2 sm:p-4 flex-1">
										<h4 class="text-text text-lg sm:text-xl font-medium">
											{{ item.title }}
										</h4>
										<p class="mt-3 text-text text-sm sm:text-base font-medium">
											{{ item.description }}
										</p>
									</div>
								</div>
							</swiper-slide>
						</swiper-container>
					</UiFuncybox>

					<!-- navigation arrows (faqat md+ ekranlarda) -->
					<button v-if="awwards?.data?.length > 2"
						class="absolute top-1/2 -translate-y-1/2 -left-12 w-10 h-10 md:w-12 md:h-12 rounded-full hidden md:flex items-center justify-center bg-white shadow"
						@click="awwardsSwiper.prev()">
						<UIcon name="tabler:chevron-left" class="text-2xl md:text-3xl text-main" />
					</button>
					<button v-if="awwards?.data?.length > 2"
						class="absolute top-1/2 -translate-y-1/2 -right-12 w-10 h-10 md:w-12 md:h-12 rounded-full hidden md:flex items-center justify-center bg-white shadow"
						@click="awwardsSwiper.next()">
						<UIcon name="tabler:chevron-right" class="text-2xl md:text-3xl text-main" />
					</button>
				</div>
			</div>
		</section>
	</main>
</template>
