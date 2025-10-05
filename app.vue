<script setup lang="ts">
import { useAuthStore } from "./store/auth.store";
import Service from "~/service/Service";
import urls from "~/service/urls";

const { locale } = useI18n();
const token = useToken();
const metaData = ref<any>(null);
const settings = ref<any>(null);
const route = useRoute();
const authStore = useAuthStore();
const colorMode = useColorMode();

// --- SEO meta defaults (fallback) ---
const defaultTitle = "Smelio Clinic - Tibbiy xizmatlar";
const defaultDescription = "Smelio Clinic rasmiy sayti. Sifatli tibbiy xizmatlar va mutaxassis shifokorlar.";
const defaultImage = "https://www.smelioclinic.uz/og-image.jpg";

// --- Meta data loader ---
async function loadMeta() {
	try {
		const [metaRes, settingsRes] = await Promise.all([
			Service.get(urls.getMetaData(), locale.value, token.value),
			Service.get(urls.getSettings(), locale.value, token.value),
		]);
		metaData.value = metaRes;
		settings.value = settingsRes;
	} catch (e) {
		console.error("MetaData/Settings yuklashda xato:", e);
	}
}

// --- SSR=false bo‘lganda faqat clientda chaqiriladi ---
onMounted(async () => {
	colorMode.preference = "light";
	if (!authStore.user) token.value = null;
	await loadMeta();
});

// --- Dinamik SEO meta ---
useSeoMeta({
	title: () => metaData.value?.data?.title || defaultTitle,
	description: () => metaData.value?.data?.description || defaultDescription,
	keywords: () => metaData.value?.data?.keywords || "klinik, tibbiyot, shifokor",
	robots: "index, follow",

	ogTitle: () => metaData.value?.data?.title || defaultTitle,
	ogDescription: () => metaData.value?.data?.description || defaultDescription,
	ogType: "website",
	ogUrl: () => `https://www.smelioclinic.uz${route.fullPath}`,
	ogImage: () => metaData.value?.data?.imageUrl || defaultImage,

	twitterCard: "summary_large_image",
	twitterTitle: () => metaData.value?.data?.title || defaultTitle,
	twitterDescription: () => metaData.value?.data?.description || defaultDescription,
	twitterImage: () => settings.value?.data?.imageUrl || defaultImage,
});
</script>

<template>
	<div>
		<NuxtRouteAnnouncer />
		<UApp :toaster="{ position: 'top-right', duration: 2000 }" :scroll-body="{ padding: 0 }">
			<NuxtLayout />
		</UApp>
	</div>
</template>
