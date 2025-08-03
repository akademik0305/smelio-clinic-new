<script lang="ts" setup>
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
</script>
<template>
	<main class="wrapper">
		<!-- banner -->
		<section class="mt-3">
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
		</section>
		<!-- banner -->

		<!-- services -->
		<section class="py-10">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-semibold">Barcha xizmatlar</h2>
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
		<!-- services -->
	</main>
</template>
