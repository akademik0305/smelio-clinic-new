<script setup>
console.log('categories')
</script>
<template>
	<main class="py-6">
		<nav>
			<div class="container">
				<h2 class="text-2xl font-semibold">Kategoriyalar</h2>
				<BaseBreadcump
					:links="[
						{ label: 'Asosiy sahifa', url: '/' },
						{ label: 'Kategoriyalar' },
					]"
				/>
			</div>
		</nav>

		<section class="mt-8">
			<div class="container">
				<div class="mt-6 grid grid-cols-5 gap-5">
					<NuxtLink
						v-for="item in 8"
						:key="item"
						:to="`/categories/${item}`"
						class="rounded-xl overflow-hidden shadow-md border border-border group"
					>
						<div class="w-full h-auto p-4 flex items-center justify-center">
							<img
								src="~/assets/images/png/category.png"
								alt="category"
								class="w-full max-w-40 h-full object-contain group-hover:scale-110 transition-transform duration-300"
							/>
						</div>

						<div class="p-4">
							<h3
								class="font-medium text-text text-xl text-center group-hover:text-main transition-colors"
							>
								Мыши для геймеров
							</h3>
						</div>
					</NuxtLink>
				</div>
			</div>
		</section>
	</main>
</template>
