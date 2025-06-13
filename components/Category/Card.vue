<script lang="ts" setup>
const props = defineProps({
	category: {
		type: Object,
		required: true,
	},
})
</script>
<template>
	<NuxtLink
		:to="`/categories/${props.category.id}`"
		class="block rounded-xl overflow-hidden shadow-md border border-border group p-4"
	>
		<div
			class="w-full h-auto flex items-center justify-center overflow-hidden rounded-lg"
		>
			<img
				:src="category.imageUrl"
				:alt="category.name"
				class="w-full h-40 object-cover group-hover:scale-120 transition-transform duration-300"
			/>
		</div>

		<div class="mt-5">
			<h3
				class="font-medium text-text text-xl text-center group-hover:text-main transition-colors"
			>
				{{ category.name }}
			</h3>
		</div>
	</NuxtLink>
</template>
