<script lang="ts" setup>
const localePath = useLocalePath()

// props
const props = defineProps({
	service: {
		type: Object,
		required: true,
	},
})
</script>
<template>
	<NuxtLink
		:to="localePath(`/services/${props.service.id}`)"
		class="rounded-lg overflow-hidden border border-border shadow-md relative group p-4 h-full flex flex-col after:bg-main after:w-full after:h-full after:absolute after:top-0 after:left-0 after:scale-y-4 after:origin-top hover:after:scale-y-100 transition-transform duration-300 after:transition-transform after:duration-300"
	>
		<!-- Gradient background (hoverda chiqadigan) -->
		<!-- <div
			class="absolute inset-0 top-0 w-full h-full bg-main rounded-lg overflow-hidden origin-top scale-y-5 group-hover:scale-y-100 transition-all duration-300 z-0"
		/> -->

		<!-- Icon -->
		<div
			class="relative z-10 w-15 h-15 mx-auto flex items-center justify-center rounded-full bg-white"
		>
			<img src="~/assets/images/png/karies.png" alt="karies" />
		</div>

		<!-- Title -->
		<h3
			class="relative z-10 mt-4 text-lg font-semibold text-text capitalize transition-colors duration-500 group-hover:text-white"
		>
			Tish kariesini davolash
		</h3>

		<!-- Text -->
		<p
			class="relative z-10 mt-2 text-sm text-subtext leading-relaxed tracking-wide transition-colors duration-500 group-hover:text-gray-100"
		>
			Tish sathidagi kariyesni zamonaviy usullar bilan tozalash va plombalash.
		</p>
	</NuxtLink>
</template>
