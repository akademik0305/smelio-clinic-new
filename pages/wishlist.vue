<script lang="ts" setup></script>
<template>
	<main class="py-6">
		<nav>
			<div class="container">
				<h2 class="text-2xl font-semibold">Sevimlilar</h2>
				<BaseBreadcump
					:links="[
						{ label: 'Asosiy sahifa', url: '/' },
						{ label: 'Sevimlilar' },
					]"
				/>
			</div>
		</nav>

		<section class="mt-8">
			<div class="container">
				<div class="grid grid-cols-4 gap-5">
					<ProductCard v-for="item in 10" :key="item" :product="{ id: item }" />
				</div>
			</div>
		</section>
	</main>
</template>
