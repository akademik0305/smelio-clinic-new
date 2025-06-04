<script lang="ts" setup>
//===============================-< imports >-===============================
//> store
//> functions
//> functions
</script>
<template>
	<!-- items -->
	<section class="mt-5 px-3 pb-7">
		<article v-for="item in 4" :key="item" class="mt-5 first:mt-0">
			<NuxtLink to="/products/1" class="block h-45">
				<img
					class="w-full h-full object-cover rounded-xl"
					src="~/assets/images/png/kfc.png"
					alt="kfc"
				/>
			</NuxtLink>
			<div class="mt-3 flex items-center gap-1 text-xs font-inter">
				<p class="text-gray-4">Shirinlik</p>
				<span class="w-0.5 h-0.5 bg-gray rounded-full" />
				<Icon name="material-symbols:star-rounded" class="text-yellow" />
				<p>4.6</p>
			</div>
			<h3 class="font-medium mt-2">Sofia</h3>
			<div class="mt-3 flex items-center gap-1.5 text-gray-5 text-sm">
				<Icon name="mdi:food-outline" />
				<span>20-25 daq.</span>
			</div>
		</article>
	</section>
	<!-- items -->
</template>
<style></style>
