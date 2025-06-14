<script setup lang="ts">
import { useAuthStore } from './store/auth.store'

//===============================-< imports >-===============================
//> store
const authStore = useAuthStore()
//> utils
const colorMode = useColorMode()
const token = useToken()
//===============================-< on app load >-===============================
//> variables
//> functions
onMounted(() => {
	colorMode.preference = 'light'
	if (!authStore.user) {
		token.value = null
	}
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
