<script lang="ts" setup></script>
<template>
	<div class="backet p-3 bg-gray-1">
		<section class="mt-3 px-3 py-6 rounded-xl bg-white">
			<h3 class="text-xl text-center">Buyurtma yetkazildi!</h3>

			<div class="mt-4.5 flex items-center justify-center gap-4">
				<Icon
					name="material-symbols:star-rounded"
					class="text-yellow text-4xl"
				/>
				<Icon
					name="material-symbols:star-rounded"
					class="text-yellow text-4xl"
				/>
				<Icon
					name="material-symbols:star-rounded"
					class="text-yellow text-4xl"
				/>
				<Icon
					name="material-symbols:star-rounded"
					class="text-yellow text-4xl"
				/>
				<Icon
					name="material-symbols:star-rounded"
					class="text-gray-2 text-4xl"
				/>
			</div>
			<div class="mt-6">
				<h4 class="text-center">Hammasi joyidami?</h4>
				<div class="mt-4 flex items-center justify-center gap-3 flex-wrap">
					<article
						class="bg-gray-1 rounded-xl py-2.5 px-4 font-inter text-sm text-nowrap"
					>
						A’lo darajada
					</article>
					<article
						class="bg-gray-1 rounded-xl py-2.5 px-4 font-inter text-sm text-nowrap"
					>
						Yaxshi
					</article>
					<article
						class="bg-gray-1 rounded-xl py-2.5 px-4 font-inter text-sm text-nowrap"
					>
						Qoniqtirmadi
					</article>
					<article
						class="bg-gray-1 rounded-xl py-2.5 px-4 font-inter text-sm text-nowrap"
					>
						Yomon
					</article>
					<article
						class="bg-gray-1 rounded-xl py-2.5 px-4 font-inter text-sm text-nowrap"
					>
						Izoh qoldirish
					</article>
				</div>
			</div>
		</section>

		<section class="mt-3 px-3 py-4.5 rounded-xl bg-white">
			<div class="flex items-center justify-between">
				<h2 class="font-medium font-inter">To’lov turi</h2>
				<div class="flex items-center gap-2">
					<div
						class="flex items-center justify-center rounded-md bg-gray-1 w-7 h-6"
					>
						<img
							src="~/assets/images/png/card.png"
							class="w-full h-full object-contain"
							alt="card"
						/>
					</div>
					<p class="font-inter">**** 6548</p>
				</div>
			</div>
			<div class="mt-5 grid grid-cols-2 gap-4 font-inter">
				<p class="text-sm text-gray-3">Buyurtma summasi</p>
				<p class="text-sm text-gray-3 text-right">90 000 so’m</p>
				<p class="text-sm text-gray-3">Yetkazib berish</p>
				<p class="text-sm text-gray-3 text-right">5 000 so’m</p>
				<p class="text-sm text-gray-3">Tizim xizmati</p>
				<p class="text-sm text-gray-3 text-right">5 000 so’m</p>
				<p class="text-black">Umumiy summa</p>
				<p class="text-black text-right">100 000 so’m</p>
			</div>
		</section>
	</div>
</template>
<style></style>
