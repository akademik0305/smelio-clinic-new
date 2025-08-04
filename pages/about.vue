<script lang="ts" setup>
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

				<p class="mt-4 font-medium">
					Klinikamiz faxri bu shifokorlarimiz bo'lib, ularning har biri o'z
					sohasining birinchi raqamli mutaxassislaridir. Biz ko'p yillik
					tajribaga ega implantologlar, ortopedlar, maxillofacial jarrohlar,
					ortodontistlar, pediatrik stomatologlar va terapevtlarni ish bilan
					ta'minlaymiz. Biz barcha mutaxassislarimiz uchun muntazam ravishda
					malaka oshirishni tashkil qilamiz!
				</p>
				<p class="mt-4 font-medium">
					Ko'pgina doimiy mijozlar shifokorlarimiz bilan juda iliq
					munosabatlarni o'rnatdilar, bu faqat ishonchni mustahkamlaydi va tish
					shifokoriga tashrifni faqat ijobiy munosabat bilan qabul qilish
					imkonini beradi. Ular davolanish vaqtida ularning yordami va
					e'tiborini tashkil qilib, har qanday bemorlar bilan osongina umumiy
					til topadilar!
				</p>
				<p class="mt-4 font-medium">
					Klinikamiz uchun asosiy qadriyat bu oila va salomatlik institutidir.
					Shuning uchun biz nafaqat kattalarni, balki bolalarni ham davolashga
					katta e'tibor beramiz. Bolalar bizning kelajagimizdir va biz ularga
					stomatologik parvarish bo‘yicha to‘g‘ri va sog‘lom odatlarni
					singdirish uchun hamma narsani qilamiz.
				</p>
				<p class="mt-4 font-medium">
					Kichkina bemorlarning qulayligi uchun bizning klinikamiz maxsus o'yin
					maydonchalari bilan jihozlangan, ularning o'lchamlari ba'zan 150 m2
					dan oshadi. Bolalarni davolash uchun mo‘ljallangan barcha xonalar eng
					so‘nggi texnologiyalar bilan jihozlangan bo‘lib, “ertak” xonalar
					sifatida yaratilgan bo‘lib, u yerda hech bir bola zerikmaydi! Biz
					mutlaqo har qanday bolaga yondashuvni topamiz! Barcha davolash
					jarayoni o'yin shaklida amalga oshiriladi!
				</p>
				<p class="mt-4 font-medium">
					Xavotirga tushgan yoki davolanishning salbiy tajribasiga ega bo'lgan
					bolalar uchun biz azot oksidi sedativi - "kuluvchi gaz" yordamida
					davolash usullarini taklif qilishimiz mumkin. Lokal anesteziyaga
					alerjisi bo'lgan, shuningdek, rivojlanishning boshqa xususiyatlariga
					ega bo'lgan bolalarni "Sevofluran" gazi bilan behushlik bilan davolash
					mumkin - bu zamonaviy anesteziologiyaning eng yaxshisi!
				</p>
				<p>
					“Doktor Keller” oilaviy stomatologiya poliklinikasi shifokorlari
					“kichkina” bemorning tishini saqlab qolish uchun barcha imkoniyatlarni
					ishga soladi. Axir, biz, hech kim kabi, doimiy tishlarning "otilishi"
					ga qadar barcha tishlarni saqlab qolish qanchalik muhimligini
					tushunamiz.
				</p>
			</div>
		</section>
		<!-- employee cards -->

		<!-- awwars  -->
		<section class="pb-10">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-semibold">Stomatologiyamiz mukofotlari</h2>
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
	</main>
</template>
