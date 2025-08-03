<script lang="ts" setup>
const services = [
	{
		name: "Kattalar uchun stomatologiya",
		items: [
			{ id: 0, name: "Tish kariesini davolash" },
			{ id: 1, name: "Tish toshlarini tozalash (gigiyena)" },
			{ id: 2, name: "Tish nervini olib plombalash (endodontiya)" },
			{ id: 3, name: "Estetik plombalash" },
		],
	},
	{
		name: "Bolalar stomatologiyasi",
		items: [
			{ id: 4, name: "Tishni oqartirish (bleaching)" },
			{ id: 5, name: "Sun’iy tish o‘rnatish (protezlash)" },
			{ id: 6, name: "Breketlar o‘rnatish (ortodontiya)" },
		],
	},
	{
		name: "Kattalar uchun stomatologiya",
		items: [
			{ id: 6, name: "Breketlar o‘rnatish (ortodontiya)" },
			{ id: 7, name: "Tishni tortib tashlash (ekstraksiya)" },
			{ id: 7, name: "Tishni tortib tashlash (ekstraksiya)" },
		],
	},
];
</script>
<template>
	<main class="wrapper">
		<!-- banner -->
		<header class="mt-3">
			<div class="h-[40svh] md:h-[500px] relative">
				<!-- image -->
				<img
					class="w-full h-full object-cover absolute top-0 left-0"
					src="~/assets/images/jpg/banner-3.jpg"
					alt="kfc"
				/>

				<!-- overlay -->
				<div class="absolute top-0 left-0 w-full h-full bg-black/40" />

				<div class="max-w-3xl mx-auto">
					<div
						class="flex flex-col items-center justify-center py-15 relative gap-6 text-center"
					>
						<h3 class="text-white text-4xl font-bold">Klinika xizmatlari</h3>
						<p class="text-white font-medium">
							"Doktor Keller" klinikasi - oilaviy stomatologiya
						</p>
						<p class="text-white font-medium leading-8 text-sm">
							Do'stona shifokorlar sizga birinchi daqiqalardanoq ijobiy kayfiyat
							bag'ishlaydi qulay davolanish uchun va agar siz oldin stressga
							duchor bo'lsangiz aralashuv, biz "uyquda" davolashni amalga
							oshiramiz. Kel, biz ham kelamiz Barcha oilaviy fotosuratlaringiz
							yorqin tabassumlarga ega ekanligiga ishonch hosil qiling!
						</p>
						<BaseButton text="Qabulga yozilish" />
					</div>
				</div>
			</div>
		</header>
		<!-- banner -->

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
						},
					]"
				/>
			</div>
		</nav>

		<!-- services -->
		<section class="pt-6 pb-10">
			<div class="container">
				<div
					v-for="category in services"
					:key="category.name"
					class="mt-4 first:mt-0"
				>
					<div class="flex items-center justify-between">
						<h2 class="text-2xl font-semibold">{{ category.name }}</h2>
					</div>
					<div class="mt-4 relative grid grid-cols-5 gap-4">
						<ServiceCard
							v-for="serice in category.items"
							:key="serice.name"
							:service="serice"
						/>
					</div>
				</div>
			</div>
		</section>
		<!-- services -->
	</main>
</template>
