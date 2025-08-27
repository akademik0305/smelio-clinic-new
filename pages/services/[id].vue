<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from "~/service/Service";
import urls from "~/service/urls";
import type { TService, TServices } from "~/types/api.types";
// //> utils
const { locale } = useI18n();
const token = useToken();
const route = useRoute();
// const localePath = useLocalePath();
//===============================-< order create status >-===============================
//> variables
const isOpenOrder = useOrderStatus();
//> functions
const openOrder = () => {
	isOpenOrder.value = true;
};

//===============================-< get services >-===============================
//> variables
const services = ref<TServices>();
const activeService = ref<TService>();

//> functions

async function getServices() {
	services.value = await Service.get(
		urls.getServices(),
		locale.value,
		token.value
	);
	const current = services.value?.data.find(
		(ser) => ser.id === Number(route.params.id)
	);
	if (current) {
		activeService.value = current;
	}
}
getServices();
</script>
<template>
	<main class="wrapper">
		<!-- banner -->
		<header class="mt-3">
			<div
				class="h-[40svh] md:h-[500px] relative flex flex-col justify-center items-center"
			>
				<!-- image -->
				<img
					class="w-full h-full object-cover absolute top-0 left-0"
					src="~/assets/images/jpg/banner-3.jpg"
					alt="kfc"
				/>

				<!-- overlay -->
				<div class="absolute top-0 left-0 w-full h-full bg-black/40" />

				<div class="max-w-3xl mx-auto h-auto">
					<div
						class="flex flex-col items-center justify-center py-10 relative gap-6 text-center"
					>
						<h3 class="text-white text-4xl font-bold">
							{{ activeService?.name }}
						</h3>
						<p class="text-white font-medium">
							"Doktor Keller" klinikasi - oilaviy stomatologiya
						</p>
					</div>
				</div>
			</div>
		</header>
		<!-- banner -->

		<!-- nav -->
		<nav class="mt-5">
			<div class="container">
				<BaseBreadcump
					:links="[
						{
							label: 'Asosiy sahifa',
							url: '/',
						},
						{
							label: 'Xizmatlar',
							url: '/services',
						},
						{
							label: activeService?.name ?? '',
						},
					]"
				/>
			</div>
		</nav>
		<!-- nav -->

		<!-- services -->
		<section class="py-10">
			<div class="container">
				<div class="flex gap-4 items-start">
					<div class="">
						<h3 class="font-bold text-2xl">
							{{ activeService?.name }}
						</h3>
						<p
							class="mt-5 font-medium text-text"
							v-html="activeService?.content"
						/>
						<!-- 
						<ul class="mt-5">
							<li
								v-for="item in 4"
								:key="item"
								class="mt-2 first:mt-0 flex items-center gap-2"
							>
								<UIcon
									name="material-symbols:check-rounded"
									class="text-xl text-main"
								/>
								<p class="text-sm font-medium text-text">
									Protezni qo'shni tirik tishlarga yoki ularning ildizlariga
									mahkamlash imkoniyati yo'q;
								</p>
							</li>
						</ul>
						<p class="mt-5 font-semibold text-text">
							Agar sizda bir nechta tishlar etishmayotgan bo'lsa yoki ularni
							olib tashlash kerak bo'lsa, implantatsiyani ko'rib chiqishga
							arziydi. Titan novdalarga mahkamlash tish yo'qolganidan keyin
							paydo bo'lgan ko'plab muammolarni hal qiladi.
						</p> -->
					</div>
					<div
						class="shadow-lg rounded-lg w-full max-w-[400px] p-6 border border-border"
					>
						<div>
							<p class="font-semibold text-text">Davolash narxi</p>
							<p class="text-xl font-semibold mt-2 text-main">
								{{ activeService?.priceFormat }}
							</p>
						</div>
						<div class="mt-4">
							<p class="font-semibold text-text">Davomiyligi</p>
							<p class="text-xl font-semibold mt-2 text-main">
								{{ activeService?.duration }}
							</p>
						</div>
						<div class="mt-4">
							<BaseButton
								text="Qabulga yozilish"
								:is-full="true"
								@click="openOrder"
							/>
						</div>
					</div>
				</div>

				<!-- <div class="mt-8">
					<h3 class="font-bold text-2xl">Kalit taslim implantatsiya turlari</h3>
					<p v-for="item in 5" :key="item" class="mt-4 font-medium text-text">
						<span class="font-semibold">Klassik ikki bosqichli. </span>
						Birinchi, jarrohlik bosqichida implant vidalanadi, va shilliq qavat
						tepada tikiladi, uning ostida u ildiz otadi bir necha oy davomida.
						Ikkinchi, ortopedik bosqichda, shilliq qavat kesiladi va avval
						saqich hosil qiluvchi pinga, keyin esa toj.
					</p>
				</div> -->
			</div>
		</section>
		<!-- services -->
	</main>
</template>
