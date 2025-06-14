<script setup lang="ts">
//===============================-< imports >-===============================
//> store
//> utils
const colorMode = useColorMode()

//===============================-< on app load >-===============================
//> variables
//> functions
onMounted(() => {
	colorMode.preference = 'light'
})
</script>
<template>
	<div>
		<NuxtRouteAnnouncer />
		<UApp :toaster="{ position: 'top-right', duration: 2000 }">
			<NuxtLayout />
		</UApp>
	</div>
</template>
