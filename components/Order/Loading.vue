<script lang="ts" setup>
// emits
const emit = defineEmits(['cancel'])
//===============================-< imports >-===============================
//> functions
</script>
<template>
	<section
		class="fixed z-50 w-full h-svh top-0 left-0 flex flex-col items-center justify-center bg-gray-1/75 backdrop-blur-sm min-h-screen p-6"
	>
		<!-- <div
			class="bg-gray-1 absolute top-0 left-0 w-full h-full opacity-95 backdrop-opacity-90 backdrop-blur-lgxl"
		/> -->
		<div
			class="max-w-52 flex-1 flex flex-col items-center justify-center gap-6 relative"
		>
			<div class="flex items-center justify-center">
				<video autoplay muted loop playsinline>
					<source src="~/assets/images/webm/loading.webm" type="video/webm" />
				</video>
			</div>
			<p class="text-lg text-center">Buyurtma yaratilmoqda...</p>
			<button
				class="bg-white w-full rounded-full py-3 px-4 shadow-lg shadow-gray-2"
				@click="emit('cancel')"
			>
				Bekor qilish
			</button>
		</div>
	</section>
</template>
<style></style>
