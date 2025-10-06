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

const ogImages = {
  uz: '/screenshots/home-uz.png',
  ru: '/screenshots/home-ru.png',
  en: '/screenshots/home-en.png'
}

useHead({
  title: () => t('seo.title'),
  meta: [
    // General SEO
    { name: 'description', content: t('seo.description') },
    { name: 'keywords', content: t('seo.keywords') },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },

    // Open Graph
    { property: 'og:title', content: t('seo.title') },
    { property: 'og:description', content: t('seo.description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://www.smelioclinic.uz${route.fullPath}` },
    { property: 'og:image', content: ogImages[locale.value] || ogImages['uz'] },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('seo.title') },
    { name: 'twitter:description', content: t('seo.description') },
    { name: 'twitter:image', content: ogImages[locale.value] || ogImages['uz'] },
  ],
  link: [
    // Favicon
    { rel: 'icon', href: '/favicon_io/favicon-16x16.png', type: 'image/png', sizes: '16x16' },

    // Alternate hreflangs
    { rel: 'alternate', hreflang: 'uz', href: 'https://www.smelioclinic.uz/' },
    { rel: 'alternate', hreflang: 'ru', href: 'https://www.smelioclinic.uz/ru/' },
    { rel: 'alternate', hreflang: 'en', href: 'https://www.smelioclinic.uz/en/' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://www.smelioclinic.uz/' },

    // Canonical
    { rel: 'canonical', href: `https://www.smelioclinic.uz${route.fullPath}` },
  ],
  htmlAttrs: {
    lang: locale.value,
  },
})

</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp :toaster="{ position: 'top-right', duration: 2000 }" :scroll-body="{ padding: 0 }">
      <NuxtLayout />
    </UApp>
  </div>
</template>
