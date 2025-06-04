<script lang="ts" setup></script>
<template>
	<div class="backet p-3 bg-gray-1">
		<section class="mt-3 px-3 py-4.5 rounded-xl bg-white">
			<h3 class="text-lg">Manzil</h3>
			<p class="font-inter mt-3">Toshkent Shahar, Chilonzor tumani. 321 uy</p>

			<div class="grid grid-cols-3 gap-3 mt-4.5">
				<article
					v-for="item in 3"
					:key="item"
					class="flex items-center justify-between px-3 py-2 border border-gray-1 rounded-lg"
				>
					<p class="font-inter text-sm text-gray-4">Podyed</p>
					<p class="font-inter text-sm">1</p>
				</article>
			</div>
			<article class="mt-3 px-3 py-2 border border-gray-1 rounded-lg">
				<p class="font-inter text-sm text-gray-4">Izoh</p>
				<p class="mt-1 font-inter text-sm">Domofon: 1234</p>
			</article>
		</section>

		<section class="mt-3 px-3 py-4.5 rounded-xl bg-white">
			<h3 class="text-lg">Mahsulotlar</h3>
			<article
				v-for="item in 2"
				:key="item"
				class="mt-3 first:mt-0 bg-white p-2 rounded-lg"
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="h-12 rounded-md bg-gray-1 p-1">
							<img
								src="~/assets/images/png/lavash.png"
								class="w-full h-full"
								alt="food name"
							/>
						</div>
						<div>
							<p class="text-sm font-medium font-inter">Tovuqli katta lavash</p>
							<p class="mt-2 text-xs text-gray-4">37 000 uzs</p>
						</div>
					</div>
					<p class="text-sm">1x</p>
				</div>
			</article>
		</section>

		<section class="mt-3 px-3 py-4.5 rounded-xl bg-white">
			<h2 class="font-medium font-inter">To’lov summasi</h2>
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

		<section class="mt-3 flex items-center justify-center">
			<button class="text-red-500 py-3 px-8 text-center">Bekor qilish</button>
		</section>
	</div>
</template>
<style></style>
