<script lang="ts" setup>
const props = defineProps({
	product: {
		type: Object,
		required: true,
	},
})
</script>
<template>
	<div
		class="relative rounded-xl overflow-hidden shadow-md border border-gray-700"
	>
		<button
			class="absolute top-3 right-3 cursor-pointer flex items-center justify-center bg-navbar-bg rounded-xl p-2"
		>
			<UIcon
				v-if="props.product.id % 2"
				name="mdi:heart-outline"
				class="text-2xl text-main"
			/>
			<UIcon v-else name="mdi:heart" class="text-2xl text-main" />
		</button>

		<div class="w-full h-auto">
			<img src="~/assets/images/png/image.png" alt="product" />
		</div>
		<div class="p-4">
			<h3 class="text-md text-text">
				Smartfon Honor X8b 8/128GB Midnight Black
			</h3>
			<div class="mt-4">
				<p class="text-xl">180 000 so'm</p>
				<p class="text-sm line-through text-subtext">200 000 so'm</p>
			</div>
			<footer class="mt-4 flex items-center gap-4">
				<div
					v-if="props.product.id % 2"
					class="flex items-center justify-between gap-3"
				>
					<NuxtLink
						to="/cart"
						class="flex items-center justify-center gap-2 bg-main border border-bg rounded-full w-full py-1.5 px-4 cursor-pointer group hover:bg-bg-soft hover:border-main transition-colors"
					>
						<UIcon
							name="proicons:cart"
							class="text-2xl w-6 text-bg group-hover:text-main"
						/>
					</NuxtLink>
					<button
						class="flex items-center justify-center py-1.5 px-3 rounded-3xl border border-main cursor-pointer hover:bg-main group transition-colors"
					>
						<!-- @click="cartStore.decProductCount(props.product.id)" -->
						<Icon
							name="ic:round-minus"
							class="w-6 h-6 text-2xl text-text group-hover:text-bg"
						/>
					</button>
					<p>0</p>
					<button
						class="flex items-center justify-center py-1.5 px-3 rounded-3xl border border-main cursor-pointer hover:bg-main group transition-colors"
					>
						<!-- @click="cartStore.incProductCount(props.product.id)" -->
						<Icon
							name="ic:round-plus"
							class="w-6 h-6 text-2xl text-text group-hover:text-bg"
						/>
					</button>
				</div>

				<button
					v-else
					class="flex items-center justify-center gap-2 bg-main border border-bg rounded-full w-full py-2 px-6 cursor-pointer group hover:bg-bg-soft hover:border-main transition-colors"
				>
					<!-- @click="cartStore.addToCart(props.product)" -->
					<UIcon
						name="proicons:cart"
						class="text-2xl w-6 text-bg group-hover:text-main"
					/>
					<span class="text-sm text-bg group-hover:text-main">Savatga</span>
				</button>
			</footer>
		</div>
	</div>
</template>
