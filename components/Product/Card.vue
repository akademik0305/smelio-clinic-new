<script lang="ts" setup>
//===============================-< imports >-===============================
// types
import type { TProduct, TWishlist } from '~/types/api.types'

//> utils
import Service from '~/service/Service'
import urls from '~/service/urls'
import { useAuthStore } from '~/store/auth.store'
const { locale } = useI18n()
const authStore = useAuthStore()
const toast = useToast()
const token = useToken()
const wishlistCount = useWishlistCount()

// props
const props = defineProps({
	product: {
		type: Object as PropType<TProduct>,
		required: true,
	},
})

// emits
const emits = defineEmits(['success-wishlist'])

//===============================-< get wishlists >-===============================
//> variables
const wishlists = ref<TWishlist>()
//> functions
async function getWishlists() {
	const res = await Service.get<TWishlist>(
		urls.getWishlists(),
		locale.value,
		token.value
	)
	wishlists.value = res.data
	wishlistCount.value = wishlists.value.length
}

//===============================-< add or remove product from wishlist >-===============================
//> variables
//> functions
async function toggleWishlist(product_id: number) {
	if (authStore.isLogged) {
		const res = await Service.get(
			urls.addToWishlist(product_id),
			locale.value,
			token.value
		)

		if (res.status === 200) {
			setTimeout(() => {
				getWishlists()
				emits('success-wishlist')
			}, 1000)
		}
	} else {
		toast.add({
			title: "Saqlanganlarga qo'shish uchun ro'yhatdan o'tishiz kerak",
			color: 'error',
		})
	}
}

//===============================-< on load >-===============================
//> variables
onMounted(() => {
	if(!wishlistCount.value && authStore.isLogged) {
		getWishlists()
	}	
})
</script>
<template>
	<article
		class="relative rounded-xl overflow-hidden shadow-md border border-border p-4"
	>
		<button
			class="absolute top-3 right-3 cursor-pointer flex items-center justify-center p-1.5 bg-gray-100 rounded-full shadow-sm"
			@click="toggleWishlist(props.product.id)"
		>
			<UIcon
				v-if="props.product.isSaved"
				name="mdi:heart"
				class="text-2xl text-main"
			/>

			<UIcon v-else name="mdi:heart-outline" class="text-2xl text-main" />
		</button>

		<NuxtLink
			:to="`/products/${props.product.id}`"
			class="w-full h-auto flex items-center justify-center"
		>
			<img
				:src="product.imageUrl"
				:alt="product.name"
				class="w-full h-full max-h-40 object-contain"
			/>
		</NuxtLink>
		<div class="mt-4">
			<NuxtLink :to="`/products/${props.product.id}`" class="text-md text-text">
				{{ product.name }}
			</NuxtLink>
			<div class="mt-4">
				<p class="text-xl">{{ props.product.priceFormat }}</p>
				<p class="text-sm line-through text-subtext">{{ props.product.oldPriceFormat }}</p>
			</div>
			<footer class="mt-4 flex items-center gap-4">
				<div
					v-if="props.product.id % 2"
					class="w-full flex items-center justify-between gap-3"
				>
					<NuxtLink
						to="/cart"
						class="flex items-center justify-center gap-2 bg-main border border-bg rounded-full w-full py-1.5 px-4 cursor-pointer group hover:bg-bg hover:border-main transition-colors"
					>
						<UIcon
							name="proicons:cart"
							class="text-2xl w-6 text-bg group-hover:text-main"
						/>
					</NuxtLink>
					<button
						class="flex items-center justify-center py-1.5 px-4 gap-2 rounded-3xl border border-main cursor-pointer hover:bg-main group transition-colors"
					>
						<UIcon
							name="mynaui:trash"
							class="text-2xl w-6 text-main group-hover:text-white"
						/>
						<span class="text-sm text-main group-hover:text-white"
							>O'chirish</span
						>
					</button>
				</div>

				<button
					v-else
					class="flex items-center justify-center gap-2 bg-main border border-bg rounded-full w-full py-2 px-6 cursor-pointer group hover:bg-bg hover:border-main transition-colors"
				>
					<UIcon
						name="proicons:cart"
						class="text-2xl w-6 text-bg group-hover:text-main"
					/>
					<span class="text-sm text-bg group-hover:text-main">Savatga</span>
				</button>
			</footer>
		</div>
	</article>
</template>
