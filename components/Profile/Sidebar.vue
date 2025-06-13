<script setup lang="ts">
//=============================-< imports >-=================================
// mask for v-calendar
const localePath = useLocalePath()

// function for get data from backend

// store
// router

//============================================-< logout >-============================================
//> variables
//> functions
</script>
<template>
	<div
		class="bg-white rounded-xl h-auto border border-border p-6 duration-500 transition-all"
	>
		<h2
			class="font-bold text-xl text-pr-text flex items-center justify-between"
		>
			{{ $t('personal_cabinet') }}
		</h2>

		<NuxtLink
			:to="localePath('/profile')"
			class="flex items-center justify-start gap-5 mt-7 font-medium"
		>
			<UIcon
				name="proicons:person"
				class="text-2xl w-6 text-text group-hover:text-main transition-colors"
			/>
			{{ $t('personal_info') }}
		</NuxtLink>
		<NuxtLink
			:to="localePath('/profile/orders')"
			class="flex items-center justify-start gap-5 mt-7 font-medium"
		>
			<UIcon
				name="proicons:cart"
				class="text-2xl w-6 text-text group-hover:text-main transition-colors"
			/>
			{{ $t('orders') }}
		</NuxtLink>
	</div>
</template>
