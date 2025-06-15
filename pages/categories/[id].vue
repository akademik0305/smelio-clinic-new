<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from '~/service/Service'
import urls from '~/service/urls'
import type { TSection } from '~/types/api.types'
const { locale } = useI18n()
const route = useRoute()
const token = useToken()
//===============================-< get category >-===============================
//> variables
const category = ref<TSection>()
const current_page = ref(1)
//> functions
async function getCategory() {
	const res = await Service.get<TSection>(
		urls.getCategoryProducts(Number(route.params.id), current_page.value),
		locale.value,
		token.value
	)

	category.value = res.data
}

getCategory()

//===============================-< change page >-===============================
//> variables
//> functions
function changePage(page: number) {
	current_page.value = page
	getCategory()
}
</script>
<template>
	<main v-if="category" class="py-6">
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
					<ProductCard
						v-for="product in category.dataProvider.items"
						:key="product.id"
						:product="product"
						@success-wishlist="getCategory"
					/>
				</div>
				<div class="mt-5">
					<BasePagination
						v-if="category?.dataProvider?._meta.pageCount > 1"
						:meta="category?.dataProvider?._meta"
						@change-page="changePage"
					/>
				</div>
			</div>
		</section>
	</main>
</template>
