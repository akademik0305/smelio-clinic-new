<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from '~/service/Service'
import urls from '~/service/urls'
import type { TSection } from '~/types/api.types'
const { locale } = useI18n()
const route = useRoute()
const token = useToken()
//===============================-< get section >-===============================
//> variables
const section = ref<TSection>()
//> functions
async function getSection() {
	const res = await Service.get<TSection>(
		urls.getSectionProducts(Number(route.params.id)),
		locale.value,
		token.value
	)

	section.value = res.data
}

getSection()
</script>
<template>
	<main v-if="section" class="pt-5 py-10">
		<nav>
			<div class="container">
				<h2 class="text-2xl font-semibold">{{ section?.name }}</h2>
				<BaseBreadcump
					:links="[
						{ label: 'Asosiy sahifa', url: '/' },
						{ label: section?.name },
					]"
				/>
			</div>
		</nav>
		<section class="mt-8">
			<div class="container">
				<div class="grid grid-cols-4 gap-5">
					<ProductCard
						v-for="product in section?.products"
						:key="product.id"
						:product="product"
						@success-wishlist="getSection"
					/>
				</div>
			</div>
		</section>
	</main>
</template>
