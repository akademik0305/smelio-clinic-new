<script lang="ts" setup>
//===============================-< imports >-===============================
//> types
import type { PropType } from 'vue'
import type { TProduct } from '~/types/api.types'
// store
import { useCartStore } from '~/store/cart.store'
import { useStore } from '~/store/useful.store'
const cartStore = useCartStore()
const store = useStore()

// props
const props = defineProps({
	product: {
		type: Object as PropType<TProduct>,
		required: true,
	},
})
</script>
<template>
	<article>
		<div class="h-32 flex items-center justify-center bg-gray-1 rounded-xl">
			<img
				class="w-full h-full object-contain"
				:src="product.images[0]"
				alt="food name"
			/>
		</div>

		<div class="mt-3 text-sm">
			<p class="font-inter">{{ props.product.name }}</p>
			<p class="text-gray-5 mt-2">{{ store.formatCurrency(props.product.price) }}</p>
			<p class="mt-2 text-gray-4 text-xs font-inter">365 gr</p>
		</div>

		<div class="mt-3">
			<div
				v-if="cartStore.getProductCount(props.product.id)"
				class="flex items-center justify-between"
			>
				<button
					class="flex items-center justify-center py-2 px-4 rounded-3xl bg-gray-1"
					@click="cartStore.decProductCount(props.product.id)"
				>
					<Icon name="ic:round-minus" class="w-6 h-6 text-2xl" />
				</button>
				<p>{{ cartStore.getProductCount(props.product.id) }}</p>
				<button
					class="flex items-center justify-center py-2 px-4 rounded-3xl bg-yellow"
					@click="cartStore.incProductCount(props.product.id)"
				>
					<Icon name="ic:round-plus" class="w-6 h-6 text-2xl" />
				</button>
			</div>

			<button
				v-else
				class="flex items-center justify-center gap-2 bg-gray-1 rounded-full w-full py-2 px-6"
				@click="cartStore.addToCart(props.product)"
			>
				<Icon name="ri:shopping-basket-line" class="text-gray-4 w-6 h-6 text-2xl" />
				<span class="text-sm font-inter">Savatga</span>
			</button>
		</div>
	</article>
</template>
<style></style>
