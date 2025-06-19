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
		<section class="py-4 px-2 rounded-b-xl">
			<div class="container">
				<!-- search -->
				<BaseSearch placeholder="Qidirish" @change-value="handleChangeValue" />
			</div>
			<!-- search -->
		</section>

		<section class="mt-8">
			<div class="container">
				<div v-if="products?.items.length && searchValue">
					<div
						class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5"
					>
						<ProductCard
							v-for="product in products.items"
							:key="product.id"
							:product="product"
							@success-wishlist="handleSearch(searchValue)"
						/>
					</div>
					<div class="mt-5">
						<BasePagination
							v-if="products?._meta.pageCount > 1"
							:meta="products?._meta"
							@change-page="changePage"
						/>
					</div>
				</div>
				<div
					v-else-if="!products?.items.length && isFinishedSearch"
					class="w-full h-80 flex flex-col items-center justify-center gap-2"
				>
					<div class="w-40 h-auto flex justify-center">
						<Icon
							name="icon-park-solid:database-network"
							class="mt-2 text-7xl text-slate-400"
						/>
					</div>
					<p class="font-meduim text-base text-gray-4">
						{{ $t('empty_data_product') }}
					</p>
				</div>
			</div>
		</section>
	</main>
</template>
