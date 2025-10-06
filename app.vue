<script setup lang="ts">
import { useAuthStore } from "./store/auth.store";
import Service from "~/service/Service";
import urls from "~/service/urls";

const { locale , t } = useI18n();
const token = useToken();
const route = useRoute();
const authStore = useAuthStore();
const colorMode = useColorMode();


// --- SSR orqali ma’lumot yuklash ---
// const { data: metaData} = await useAsyncData("metaData", async () => {
//   return await Service.get(urls.getMetaData(), locale.value, token.value);
// });

// const { data: settings } = await useAsyncData("settings", async () => {
//   return await Service.get(urls.getSettings(), locale.value, token.value);
// });

// --- Color mode ---
colorMode.preference = "light";
if (!authStore.user) token.value = null;

// --- Dinamik SEO meta ---
// useSeoMeta({
//   title: () => metaData.value?.data?.title || defaultTitle,
//   description: () => metaData.value?.data?.description || defaultDescription,
//   keywords: () => metaData.value?.data?.keywords || "klinik, tibbiyot, shifokor",
//   robots: "index, follow",

//   ogTitle: () => metaData.value?.data?.title || defaultTitle,
//   ogDescription: () => metaData.value?.data?.description || defaultDescription,
//   ogType: "website",
//   ogUrl: () => `https://www.smelioclinic.uz${route.fullPath}`,
//   ogImage: () => metaData.value?.data?.imageUrl || defaultImage,

//   twitterCard: "summary_large_image",
//   twitterTitle: () => metaData.value?.data?.title || defaultTitle,
//   twitterDescription: () => metaData.value?.data?.description || defaultDescription,
//   twitterImage: () => settings.value?.data?.imageUrl || defaultImage,
// });

</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp :toaster="{ position: 'top-right', duration: 2000 }" :scroll-body="{ padding: 0 }">
      <NuxtLayout />
    </UApp>
  </div>
</template>
