<script lang="ts" setup>
//===============================-< imports >-===============================
//> utils
import { useI18n } from 'vue-i18n'
import Service from '~/service/Service'
import urls from '~/service/urls'
import type { TSearch } from '~/types/api.types'
const { locale } = useI18n()

//===============================-< handle search >-===============================
//> variables
const products = ref<TSearch>()
const searchValue = ref('')
const current_page = ref(1)
const isFinishedSearch = ref(false)
// Asl qidiruv funksiyamiz
async function handleSearch(value: string) {
	searchValue.value = value
	const res = await Service.get<TSearch>(
		urls.search(value, current_page.value),
		locale.value,
		null
	)
	products.value = res.data
	isFinishedSearch.value = true
}

// Debounce qilingan versiyasi
const debouncedSearch = useDebounce(handleSearch, 500)

//===============================-< handle change value >-===============================
//> variables
//> functions
function handleChangeValue(input: HTMLInputElement) {
	debouncedSearch(input.value)
	isFinishedSearch.value = false
}

//===============================-< change page >-===============================
//> variables
//> functions
function changePage(page: number) {
	current_page.value = page
	handleSearch(searchValue.value)
}
</script>
<template>
	<main>
		<!-- search -->
		<section class="py-4 px-2 md:px-4 lg:px-6 rounded-b-xl">
			<div class="container">
				<BaseSearch placeholder="Qidirish" @change-value="handleChangeValue" />
			</div>
		</section>
		<!-- search -->

		<section class="mt-6 md:mt-8">
			<div class="container">
				<!-- products -->
				<div v-if="products?.items.length && searchValue">
					<div
						class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
						<ProductCard v-for="product in products.items" :key="product.id" :product="product"
							@success-wishlist="handleSearch(searchValue)" />
					</div>

					<!-- pagination -->
					<div class="mt-6 flex justify-center">
						<BasePagination v-if="products?._meta.pageCount > 1" :meta="products?._meta" @change-page="changePage" />
					</div>
				</div>

				<!-- empty state -->
				<div v-else-if="!products?.items.length && isFinishedSearch"
					class="w-full h-72 md:h-80 flex flex-col items-center justify-center gap-3 text-center">
					<div class="w-28 md:w-40 h-auto flex justify-center">
						<Icon name="icon-park-solid:database-network" class="text-6xl md:text-7xl text-slate-400" />
					</div>
					<p class="font-medium text-sm md:text-base text-gray-400">
						{{ $t("empty_data_product") }}
					</p>
				</div>
			</div>
		</section>
	</main>
</template>
