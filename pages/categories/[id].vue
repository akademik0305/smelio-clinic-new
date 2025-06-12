<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from '~/service/Service'
import urls from '~/service/urls'
const { locale } = useI18n()
const route = useRoute()
//===============================-< get products >-===============================
//> variables
const products = ref()
//> functions
async function getProducts() {
	const res = await Service.get(
		urls.getCategoryProducts(Number(route.params.id)),
		locale.value,
		null
	)

	products.value = res.data
}

getProducts()
</script>
<template>
	<main class="py-6">
		<nav>
			<div class="container">
				<h2 class="text-2xl font-semibold">Мыши для геймеров</h2>
				<BaseBreadcump
					:links="[
						{ label: 'Asosiy sahifa', url: '/' },
						{ label: 'Kategoriyalar', url: '/categories' },
						{ label: 'Мыши для геймеров' },
					]"
				/>
			</div>
		</nav>
		<section class="mt-8">
			<div class="container">
				<div class="grid grid-cols-4 gap-5">
					<ProductCard v-for="product in products?.items" :key="product.id" :product="product" />
				</div>
			</div>
		</section>
	</main>
</template>
