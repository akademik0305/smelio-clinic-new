<script lang="ts" setup>
//===============================-< imports >-===============================
// types
import type { TProduct, TWishlist } from '~/types/api.types'

//> utils
import Service from '~/service/Service'
import urls from '~/service/urls'
import { useAuthStore } from '~/store/auth.store'
import { useCartStore } from '~/store/cart.store'
const { locale, t } = useI18n()
const toast = useToast()
const token = useToken()
const wishlistCount = useWishlistCount()
// store
const authStore = useAuthStore()
const cartStore = useCartStore()

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
			title: t('need_register_for_wishlist'),
			color: 'error',
		})
	}
}

//===============================-< on load >-===============================
//> variables
onMounted(() => {
	if (!wishlistCount.value && authStore.isLogged) {
		getWishlists()
	}
})
</script>
<template>
	<article
		class="relative rounded-xl overflow-hidden shadow-md border border-border p-2 md:p-4 flex flex-col"
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
			class="w-full h-auto flex items-center justify-cente rounded-xl overflow-hidden"
		>
			<img
				:src="product.imageUrl"
				:alt="product.name"
				class="w-full max-h-40 min-h-40 object-contain"
			/>
		</NuxtLink>
		<div class="mt-4 flex-1 flex flex-col">
			<NuxtLink :to="`/products/${props.product.id}`" class="text-sm md:text-md text-text">
				{{ product.name }}
			</NuxtLink>
			<div class="mt-2 md:mt-4 flex-1">
				<p class="text-sm md:text-xl">{{ props.product.priceFormat }}</p>
				<p class="text-xs md:text-sm line-through text-subtext">
					{{ props.product.oldPriceFormat }}
				</p>
			</div>
			<footer class="mt-2 md:mt-4 flex items-center gap-4">
				<div
					v-if="cartStore.checkIsExist(props.product.id)"
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
						class="flex items-center justify-center py-1.5 px-4 gap-2 rounded-3xl border border-main cursor-pointer hover:bg-red-500 group transition-colors"
						@click="cartStore.removeFromCart(props.product.id)"
					>
						<UIcon
							name="mynaui:trash"
							class="text-2xl w-6 text-main group-hover:text-white"
						/>
						<span class="text-sm text-main group-hover:text-white hidden md:block"
							>{{ $t('delete') }}</span
						>
					</button>
				</div>

				<div v-else class="w-full">
					<p
						v-if="!props.product.residue"
						class="flex items-center justify-center gap-2 bg-gray-400 border border-bg rounded-full w-full py-2 px-3 md:px-6 flex-1 text-xs md:text-base"
					>
						{{ $t('empty') }}
					</p>
					<button
						v-else
						class="flex items-center justify-center gap-2 bg-main border border-bg rounded-full w-full py-2 px-3 md:px-6 cursor-pointer group hover:bg-bg hover:border-main transition-colors"
						@click="cartStore.addToCart(props.product)"
					>
						<UIcon
							name="proicons:cart"
							class="text-2xl w-6 text-bg group-hover:text-main"
						/>
						<span class="text-sm text-bg group-hover:text-main">{{ $t('add_to_cart') }}</span>
					</button>
				</div>
			</footer>
		</div>
	</article>
</template>
