// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  colorMode: {
    preference: 'light'
  },

  ssr: false,

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    },
  },

  app: {
    head: {
      title: 'Smelio Clinic — sizning sog‘lom tabassumingiz kafolati.',
      htmlAttrs: {
        lang: 'uz',
      },
      meta: [
        // General SEO
        { name: 'description', content: 'Smelio Clinic — sizning sog‘lom tabassumingiz kafolati. Zamonaviy uskunalar va yuqori malakali shifokorlar jamoasi bilan xizmat ko‘rsatamiz. Klinikamizda tish davolash, oqartirish, implantatsiya va estetik xizmatlar mavjud.' },
        { name: 'keywords', content: 'smelio, dental, clinic, fergana, Farg\'ona, Implant, best dental, stomatologiga, uzbekistan, plomba, tish, oqartirish' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },

        // Open Graph
        { property: 'og:title', content: 'Smelio Clinic — sizning sog‘lom tabassumingiz kafolati.' },
        { property: 'og:description', content: 'Smelio Clinic — sizning sog‘lom tabassumingiz kafolati. Zamonaviy uskunalar va yuqori malakali shifokorlar jamoasi bilan xizmat ko‘rsatamiz. Klinikamizda tish davolash, oqartirish, implantatsiya va estetik xizmatlar mavjud.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.smelioclinic.uz/' },
        { property: 'og:image', content: '/screenshots/main.jpg' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Smelio Clinic — sizning sog‘lom tabassumingiz kafolati.' },
        { name: 'twitter:description', content: 'Smelio Clinic — sizning sog‘lom tabassumingiz kafolati. Zamonaviy uskunalar va yuqori malakali shifokorlar jamoasi bilan xizmat ko‘rsatamiz. Klinikamizda tish davolash, oqartirish, implantatsiya va estetik xizmatlar mavjud.' },
        { name: 'twitter:image', content: '/screenshots/main.jpg' },
      ],
      link: [
        // Favicon
        { rel: 'icon', type: 'image/png', href: '/favicon_io/favicon-16x16.png', sizes: '16x16' },

        // Alternate hreflangs
        { rel: 'alternate', hreflang: 'uz', href: 'https://www.smelioclinic.uz/' },
        { rel: 'alternate', hreflang: 'ru', href: 'https://www.smelioclinic.uz/ru/' },
        { rel: 'alternate', hreflang: 'en', href: 'https://www.smelioclinic.uz/en/' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://www.smelioclinic.uz/' },

        // Canonical
        { rel: 'canonical', href: 'https://www.smelioclinic.uz/' },
      ],
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  mapbox: { accessToken: 'pk.eyJ1IjoiamFob25naXI3NyIsImEiOiJjbG9tajIzYW4yMWhsMnJudnRjbGUzOGFzIn0.WeJnZlP1FGzGJ3FK2IM9UA' },


  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/main.css'],


  i18n: {
    defaultLocale: "uz",
    langDir: "./locales/",
    locales: [
      {
        code: "uz",
        name: "uz",
        file: "uz.json",
      },
      {
        code: "ru",
        name: "ru",
        file: "ru.json",
      },
      {
        code: "en",
        name: "en",
        file: "en.json",
      },
    ],
  },


})