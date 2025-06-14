<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from '~/service/Service'
import urls from '~/service/urls'
import type { TProduct } from '~/types/api.types'
const { locale } = useI18n()
const route = useRoute()
const token = useToken()
//===============================-< get product detail >-===============================
//> variables
const product = ref<TProduct>()
//> functions
async function getProduct() {
	const res = await Service.get<TProduct>(
		urls.productDetail(Number(route.params.id)),
		locale.value,
		token.value
	)

	product.value = res.data
	console.log(product.value)
}

getProduct()
</script>
<template>
	<main v-if="product" class="py-6">
		<nav>
			<div class="container">
				<h2 class="text-2xl font-semibold">
					{{ product?.name }}
				</h2>
				<BaseBreadcump
					:links="[
						{ label: 'Asosiy sahifa', url: '/' },
						{ label: 'Kategoriyalar', url: '/categories' },
						{ label: product?.name },
					]"
				/>
			</div>
		</nav>

		<section class="mt-8">
			<div class="container">
				<div class="flex items-start justify-start gap-8">
					<div class="w-1/2">
						<ClientOnly>
							<!-- MAIN SWIPER -->
							<UiFuncybox
								:options="{
									Carousel: {
										infinite: false,
									},
								}"
							>
								<!-- <swiper-container
									:init="true"
									:loop="true"
									:slides-per-view="1"
									:space-between="20"
									:pagination="{
										clickable: true,
									}"
									:autoplay="{
										delay: 3000,
									}"
									class="rounded-2xl overflow-hidden border border-border"
								>
									<swiper-slide v-for="idx in 10" :key="idx" class="p-4">
								</swiper-slide>
									</swiper-container> -->
								<div
									class="rounded-2xl overflow-hidden border border-border p-8"
								>
									<a
										data-fancybox="gallery"
										class="w-full h-auto flex items-center justify-center"
										:href="product?.imageUrl"
									>
										<img
											:src="product?.imageUrl"
											:alt="product?.name"
											class="w-full h-full max-w-80"
										/>
									</a>
								</div>
							</UiFuncybox>
						</ClientOnly>
					</div>
					<div class="flex-1 flex flex-col">
						<h4 class="text-xl font-semibold">Mahsulot haqida qisqacha</h4>
						<p class="mt-2">
							{{ product.description }}
						</p>

						<div class="mt-6">
							<div
								v-if="false"
								class="w-max flex items-center justify-between gap-3"
							>
								<NuxtLink
									to="/cart"
									class="flex items-center justify-center gap-2 bg-main border border-bg rounded-full w-full py-1.5 px-4 cursor-pointer group hover:bg-bg hover:border-main transition-colors"
								>
									<UIcon
										name="proicons:cart"
										class="text-2xl w-6 text-bg group-hover:text-main"
									/>
								</NuxtLink>
								<button
									class="flex items-center justify-center py-1.5 px-4 gap-2 rounded-3xl border border-main cursor-pointer hover:bg-main group transition-colors"
								>
									<UIcon
										name="mynaui:trash"
										class="text-2xl w-6 text-main group-hover:text-white"
									/>
									<span class="text-sm text-main group-hover:text-white"
										>O'chirish</span
									>
								</button>
							</div>
							<button
								v-else
								class="flex items-center justify-center gap-2 bg-main border border-bg rounded-full py-2 px-10 cursor-pointer group hover:bg-bg hover:border-main transition-colors"
							>
								<UIcon
									name="proicons:cart"
									class="text-2xl w-6 text-bg group-hover:text-main"
								/>
								<span class="text-sm text-bg group-hover:text-main"
									>Savatga</span
								>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- <section class="mt-8">
			<div class="container">
				<h4 class="text-xl font-semibold">Mahsulot xususiyatlari</h4>
				<div class="mt-5">
					<h5 class="font-semibold text-lg">Tavsif</h5>
					<p class="mt-2">
						Ushbu zamonaviy Artel UA43H3502 Smart televizori ajoyib
						xususiyatlarga ega zamonaviy qurilmadir. Uning 43 dyuymli diagonali
						ajoyib vizual tajribani yaratadi va 4K UHD (3840x2160) o'lchamlari
						tasvirning yuqori darajadagi ravshanligi va tafsilotlarini
						ta'minlaydi.
						<br />
						Ips matritsasi bilan jihozlangan LCD displey turi 178 daraja keng
						ko'rish burchagidan bahramand bo'lish imkonini beradi, bu qurilmani
						oilaviy tomosha qilish va kompaniyadagi qiziqarli oqshomlar uchun
						ideal qiladi. Direct LED yoritish texnologiyasi ilg'or LED
						texnologiyasi bilan birgalikda boy ranglar, boy kontrast va real
						tasvirni taqdim etadi. 16:9 nisbatda u yuqori aniqlikdagi filmlar va
						videolarni o'z ichiga olgan katta formatli tomosha qilish uchun
						ideal. Shuningdek, u sifatni keyingi bosqichga olib chiqadigan
						tasvirni qayta ishlash texnologiyasi bilan jihozlangan.
					</p>
				</div>
			</div>
		</section> -->
	</main>
</template>
