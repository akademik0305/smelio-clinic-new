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
		<nav class="mt-5">
			<div class="container">
				<BaseBreadcump
					:links="[
						{
							label: 'Asosiy sahifa',
							url: '/',
						},
						{
							label: 'Klinikamiz haqida',
						},
					]"
				/>
			</div>
		</nav>

		<!-- employee cards -->
		<section class="mt-4 pb-10">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-semibold">Klinika haqida</h2>
				</div>

				<p class="mt-4 font-medium" v-html="about?.data.content" />
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
	</main>
</template>
