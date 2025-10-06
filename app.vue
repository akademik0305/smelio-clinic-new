<script setup lang="ts">
import { useI18n } from '#imports'

const { locale, t } = useI18n()
const route = useRoute()

const ogImages = {
  uz: 'https://www.smelioclinic.uz/screenshots/home-uz.png',
  ru: 'https://www.smelioclinic.uz/screenshots/home-ru.png',
  en: 'https://www.smelioclinic.uz/screenshots/home-en.png'
}

// --- reaktiv meta yaratish ---
watchEffect(() => {
  const currentUrl = `https://www.smelioclinic.uz${route.fullPath}`
  const currentLang = locale.value || 'uz'
  const currentOgImage = ogImages[currentLang] || ogImages.uz

  useHead({
    title: t('seo.title'),
    meta: [
      { name: 'description', content: t('seo.description') },
      { name: 'keywords', content: t('seo.keywords') },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },

      // --- Open Graph ---
      { property: 'og:title', content: t('seo.title') },
      { property: 'og:description', content: t('seo.description') },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: currentUrl },
      { property: 'og:image', content: currentOgImage },

      // --- Twitter ---
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: t('seo.title') },
      { name: 'twitter:description', content: t('seo.description') },
      { name: 'twitter:image', content: currentOgImage }
    ],
    link: [
      { rel: 'icon', href: '/favicon_io/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { rel: 'alternate', hreflang: 'uz', href: 'https://www.smelioclinic.uz/' },
      { rel: 'alternate', hreflang: 'ru', href: 'https://www.smelioclinic.uz/ru/' },
      { rel: 'alternate', hreflang: 'en', href: 'https://www.smelioclinic.uz/en/' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://www.smelioclinic.uz/' },
      { rel: 'canonical', href: 'https://www.smelioclinic.uz/' }
    ],
    htmlAttrs: { lang: currentLang }
  })
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
