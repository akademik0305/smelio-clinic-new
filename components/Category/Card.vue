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
		class="block rounded-xl overflow-hidden shadow-md border border-border group"
	>
		<div class="w-full h-auto p-4 flex items-center justify-center">
			<img
				:src="category.imageUrl"
				:alt="category.name"
				class="w-full max-w-40 h-full object-contain group-hover:scale-110 transition-transform duration-300"
			/>
		</div>

		<div class="p-4">
			<h3
				class="font-medium text-text text-xl text-center group-hover:text-main transition-colors"
			>
				{{ category.name }}
			</h3>
		</div>
	</NuxtLink>
</template>
