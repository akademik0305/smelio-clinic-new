<script setup lang="ts">
import { useAuthStore } from "./store/auth.store";
import Service from "~/service/Service";
import urls from "~/service/urls";
const { locale } = useI18n();
const token = useToken();
const metaData = ref<any>();
const settings = ref<any>();
const route = useRoute();
async function getMetaData() {
	metaData.value = await Service.get(
		urls.getMetaData(),
		locale.value,
		token.value
	);
	console.log(metaData.value);
}
getMetaData();

async function getSettings() {
	settings.value = await Service.get(
		urls.getSettings(),
		locale.value,
		token.value
	);
	console.log(settings.value);
}
getSettings();
//===============================-< seo >-===============================
useSeoMeta({
	// General
	title: () => metaData.value?.data?.title || "No title available",
	description: () => metaData.value?.data?.description || "No description available",
	keywords: () => metaData.value?.data?.keywords || "No keywords available",
	robots: 'index, follow',

	// Open Graph
	ogTitle: () => metaData.value?.data?.title || "No title available",
	ogDescription: () => metaData.value?.data?.description || "No description available",
	ogType: 'website',
	ogUrl: () => `https://www.smelioclinic.uz${route.fullPath}`,
	ogImage: () => metaData.value?.data?.imageUrl || "No image available",

	// Twitter
	twitterCard: 'summary_large_image',
	twitterTitle: () => metaData.value?.data?.title || "No title available",
	twitterDescription: () => metaData.value?.data?.description || "No description available",
	twitterImage: () => settings.value?.data?.imageUrl || "No image available",
})

//===============================-< imports >-===============================
//> store
const authStore = useAuthStore();
//> utils
const colorMode = useColorMode();
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
		<UApp :toaster="{ position: 'top-right', duration: 2000 }" :scroll-body="{ padding: 0 }">
			<NuxtLayout />
		</UApp>
		<!-- <UiColor /> -->
	</div>
</template>
