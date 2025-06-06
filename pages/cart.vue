<script lang="ts" setup></script>
<template>
	<main class="py-6">
		<nav>
			<div class="container">
				<h2 class="text-2xl font-semibold">Korzinka</h2>
				<BaseBreadcump
					:links="[{ label: 'Asosiy sahifa', url: '/' }, { label: 'Korzinka' }]"
				/>
			</div>
		</nav>

		<section class="mt-8">
			<div class="container">
				<div class="flex gap-6">
					<div class="shadow-md border border-border rounded-2xl p-6 flex-2">
						<div class="flex items-center justify-between">
							<h3 class="font-medium text-xl">Mahsulotlar:</h3>
							<button
								class="cursor-pointer hover:text-main transition-colors underline"
							>
								Tozalash
							</button>
						</div>
						<article class="mt-4 flex items-center gap-6">
							<div
								class="w-full max-w-32 h-auto p-4 flex items-center justify-center"
							>
								<img
									src="~/assets/images/png/category.png"
									alt="product"
									class="w-full h-full object-contain"
								/>
							</div>
							<div class="flex-1">
								<NuxtLink :to="`/products/${2}`" class="text-md text-text">
									Smartfon Honor X8b 8/128GB Midnight Black
								</NuxtLink>
							</div>
							<div class="flex items-center justify-between gap-3">
								<button
									class="flex items-center justify-center py-1.5 px-3 rounded-3xl border border-main cursor-pointer hover:bg-main group transition-colors"
								>
									<Icon
										name="ic:round-minus"
										class="w-6 h-6 text-2xl text-text group-hover:text-bg"
									/>
								</button>
								<p>0</p>
								<button
									class="flex items-center justify-center py-1.5 px-3 rounded-3xl border border-main cursor-pointer hover:bg-main group transition-colors"
								>
									<Icon
										name="ic:round-plus"
										class="w-6 h-6 text-2xl text-text group-hover:text-bg"
									/>
								</button>
							</div>
							<div class="flex flex-col items-center justify-center gap-4">
								<button class="cursor-pointer group">
									<UIcon
										name="mdi:heart-outline"
										class="text-2xl w-6 text-text group-hover:text-main"
									/>
								</button>
								<button class="cursor-pointer group">
									<UIcon
										name="mynaui:trash"
										class="text-2xl w-6 text-text group-hover:text-red-500"
									/>
								</button>
							</div>
						</article>
					</div>
					<div class="shadow-md border border-border rounded-2xl p-6 flex-1 flex flex-col">
						<div class="flex items-center justify-between py-2 gap-6 border-b border-b-border">
							<p class="text-subtext">2 dona mahsulot narxi:</p>
							<p class="font-semibold text-text">8 451 000 so'm</p>
						</div>
						<div class="mt-2 flex items-center justify-between py-2 gap-6 border-b border-b-border">
							<p class="font-semibold text-text text-lg">Jami:</p>
							<p class="font-semibold text-text text-lg">8 451 000 so'm</p>
						</div>
						<button
							class="mt-auto flex items-center justify-center gap-2 bg-main border border-bg rounded-full w-full py-2 px-6 cursor-pointer group hover:bg-bg hover:border-main transition-colors"
						>
							<span class="text-sm text-bg group-hover:text-main"
								>Rasmiylashtirish</span
							>
						</button>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
