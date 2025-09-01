<script setup lang="ts">
import { useAuthStore } from "./store/auth.store";

//===============================-< seo >-===============================
useSeoMeta({
	title: "Smelio Clinic",
	ogImage: "/icon.png",
});

//===============================-< imports >-===============================
//> store
const authStore = useAuthStore();
//> utils
const colorMode = useColorMode();
const token = useToken();
//===============================-< on app load >-===============================
//> variables
//> functions
onMounted(() => {
	colorMode.preference = "light";
	if (!authStore.user) {
		token.value = null;
	}
});
</script>
<template>
	<div>
		<NuxtRouteAnnouncer />
		<UApp
			:toaster="{ position: 'top-right', duration: 2000 }"
			:scroll-body="{ padding: 0 }"
		>
			<NuxtLayout />
		</UApp>
		<!-- <UiColor /> -->
	</div>
</template>
