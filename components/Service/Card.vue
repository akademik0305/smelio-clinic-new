<script lang="ts" setup>
const localePath = useLocalePath();

// props
const props = defineProps({
	service: {
		type: Object,
		required: true,
	},
});
</script>
<template>
	<NuxtLink
		:to="localePath(`/services/${props.service.id}`)"
		class="rounded-lg overflow-hidden border border-border shadow-md relative group p-4 h-full flex flex-col after:bg-main after:w-full after:h-full after:absolute after:top-0 after:left-0 after:scale-y-4 after:origin-top hover:after:scale-y-100 transition-transform duration-300 after:transition-transform after:duration-300"
	>
		<!-- Icon -->
		<div
			class="relative z-10 w-28 h-28 mx-auto flex items-center justify-center rounded-full bg-white p-4"
		>
			<img
				:src="service.imageUrl"
				alt="karies"
				class="object-contain"
			/>
		</div>

		<!-- Title -->
		<h3
			class="relative z-10 mt-4 text-center text-lg font-medium text-text capitalize transition-colors duration-500 group-hover:text-white"
		>
			{{ props?.service?.name }}
		</h3>
	</NuxtLink>
</template>
