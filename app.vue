<script setup lang="ts">
//===============================-< imports >-===============================
//> store
import { useStore } from '~/store/useful.store'
//> utils
const route = useRoute()
// const { t, locale } = useI18n();
// const localePath = useLocalePath();
const store = useStore()
const colorMode = useColorMode()

watch(route, () => {
	if (store.isScroolBlocked) {
		store.enableScrool()
	}
})

//===============================-< on app load >-===============================
//> variables
//> functions
onMounted(() => {
	const token = useToken()
	token.value = '2:if3eQgFM40IetanJ'
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
