<script lang="ts" setup>
//===============================-< order create status >-===============================
//> variables
const isOpenOrder = useOrderStatus();
//> functions
const openOrder = () => {
	isOpenOrder.value = true
}
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
							label: 'Xodimlar',
							url: '/employees',
						},
						{
							label: 'Fridman Ilya Yulievich',
						},
					]"
				/>
			</div>
		</nav>

		<!-- employee cards -->
		<section class="mt-4 pb-10">
			<div class="container">
				<div class="flex gap-5">
					<div class="flex-1 h-auto">
						<img
							src="~/assets/images/webp/doctor.webp"
							class="w-full h-full"
							alt=""
						/>
					</div>
					<div class="px-4 flex-1">
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
							ildizini o'rab turgan periodontal to'qimalarning yallig'lanishini
							endodontik davolash. Men professional og'iz gigienasini bajaraman,
							keyin kerak bo'lsa chuqur yoki yuzaki florlash, uyda oqartirish
							yoki Zoom4 oqartirish. Men ortodontik davolanishni qabul qilib
							bo'lmaydigan tish qatoridagi alohida tishlarning holatini qayta
							tiklayman. Men ham protezlash uchun to'liq tayyorgarlik ko'raman.
							Har bir bemor sifatli davolanishi va tish shifokoridan tabassum
							bilan ketishi kerak, deb hisoblayman.
						</p>
						<p class="mt-4 font-medium text-text">
							Bemorlarning yoshi: 14 yoshdan 90 yoshgacha.
						</p>
						<p class="mt-4 font-medium text-subtext text-xs">
							Bosh shifokor, stomatolog-terapevt
						</p>

						<div class="mt-4" @click.stop.prevent>
							<BaseButton text="Qabulga yozilish" @click="openOrder" />
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- employee cards -->
	</main>
</template>
