<script lang="ts" setup></script>
<template>
	<main class="wrapper">
		<!-- banner -->
		<header class="mt-3">
			<div class="h-[40svh] md:h-[500px] relative flex flex-col justify-center items-center">
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
						<h3 class="text-white text-4xl font-bold">Tish implantatsiyasi</h3>
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
							label: 'Tish implantatsiyasi',
						},
					]"
				/>
			</div>
		</nav>
		<!-- nav -->

		<!--  -->

		<!-- services -->
		<section class="py-10">
			<div class="container">
				<div class="">
					<h3 class="font-bold text-2xl">
						Implant o'rnatish uchun ko'rsatmalar
					</h3>
					<p class="mt-5 font-semibold text-text">
						Implantatsiyaning asosiy ko'rsatkichi - bittadan hammasigacha
						bo'lgan har qanday tishlarning yo'qligi. Tishlarni tiklashning ushbu
						usuli quyidagi hollarda ham qo'llaniladi:
					</p>

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
						Agar sizda bir nechta tishlar etishmayotgan bo'lsa yoki ularni olib
						tashlash kerak bo'lsa, implantatsiyani ko'rib chiqishga arziydi.
						Titan novdalarga mahkamlash tish yo'qolganidan keyin paydo bo'lgan
						ko'plab muammolarni hal qiladi.
					</p>
				</div>

				<div class="mt-8">
					<h3 class="font-bold text-2xl">Kalit taslim implantatsiya turlari</h3>
					<p class="mt-4 font-medium text-text" v-for="item in 5" :key="item">
						<span class="font-semibold">Klassik ikki bosqichli. </span>
						Birinchi, jarrohlik bosqichida implant vidalanadi, va shilliq qavat
						tepada tikiladi, uning ostida u ildiz otadi bir necha oy davomida.
						Ikkinchi, ortopedik bosqichda, shilliq qavat kesiladi va avval
						saqich hosil qiluvchi pinga, keyin esa toj.
					</p>
				</div>
			</div>
		</section>
		<!-- services -->
	</main>
</template>
