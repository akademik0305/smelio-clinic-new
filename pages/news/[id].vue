<template>
    <main class="wrapper">
        <nav class="mt-5 hidden md:block">
            <div class="container">
                <BaseBreadcump :links="[
                    { label: $t('home_page'), url: '/' },
                    { label: $t('news'), url: localePath('/news') },
                    { label: detail?.data?.title || $t('news_detail') },
                ]" />
            </div>
        </nav>

        <section class="mt-6 pb-10">
            <div class="container">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Main Content -->
                    <div class="lg:col-span-2">
                        <article v-if="detail?.data" class="bg-white rounded-lg shadow-sm overflow-hidden">
                            <!-- Featured Image -->
                            <div class="w-full h-64 md:h-96 overflow-hidden">
                                <img :src="detail.data.imageUrl" :alt="detail.data.title"
                                    class="w-full h-full object-cover" />
                            </div>

                            <!-- Article Content -->
                            <div class="p-6 md:p-8">
                                <!-- Date -->
                                <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{{ detail.data.createdAtFormat }}</span>
                                </div>

                                <!-- Title -->
                                <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                    {{ detail.data.title }}
                                </h1>

                                <!-- Content -->
                                <div class="prose prose-sm md:prose-base lg:prose-lg max-w-none"
                                    v-html="detail.data.content" />

                                <!-- Share Buttons -->
                                <div class="mt-8 pt-6 border-t border-gray-200">
                                    <h3 class="text-sm font-semibold text-gray-700 mb-3">{{ $t('share') }}</h3>
                                    <div class="flex flex-wrap gap-3">
                                        <button
                                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                                            @click="shareOnFacebook">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                            Facebook
                                        </button>

                                        <button
                                            class="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm flex items-center gap-2"
                                            @click="shareOnTwitter">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                            Twitter
                                        </button>

                                        <button
                                            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
                                            @click="shareOnWhatsApp">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            WhatsApp
                                        </button>

                                        <button
                                            class="px-4 py-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500 transition-colors text-sm flex items-center gap-2"
                                            @click="shareOnTelegram">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                            </svg>
                                            Telegram
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <!-- Loading State -->
                        <div v-else class="bg-white rounded-lg shadow-sm p-8">
                            <div class="animate-pulse space-y-4">
                                <div class="h-64 bg-gray-200 rounded" />
                                <div class="h-8 bg-gray-200 rounded w-3/4" />
                                <div class="space-y-2">
                                    <div class="h-4 bg-gray-200 rounded" />
                                    <div class="h-4 bg-gray-200 rounded" />
                                    <div class="h-4 bg-gray-200 rounded w-5/6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar - Latest News -->
                    <aside class="lg:col-span-1">
                        <div class="sticky top-24">
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                                {{ $t('latest_news') }}
                            </h2>

                            <!-- Latest News List -->
                            <div v-if="latestNews?.data?.length" class="space-y-4">
                                <NuxtLink v-for="item in latestNews.data" :key="item.id"
                                    :to="localePath(`/news/${item.id}`)"
                                    class="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                                    <div class="flex gap-4 p-4">
                                        <!-- Thumbnail -->
                                        <div class="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shrink-0">
                                            <img :src="item.imageUrl" :alt="item.title"
                                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>

                                        <!-- Content -->
                                        <div class="flex-1 min-w-0">
                                            <h3
                                                class="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {{ item.title }}
                                            </h3>
                                            <p class="text-xs text-gray-500 mt-2">
                                                {{ item.createdAtFormat }}
                                            </p>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>

                            <!-- Empty State -->
                            <div v-else class="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                                <p class="text-sm">{{ $t('no_latest_news') }}</p>
                            </div>

                            <!-- View All Button -->
                            <NuxtLink v-if="latestNews?.data?.length" :to="localePath('/news')"
                                class="mt-6 block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                {{ $t('view_all_news') }}
                            </NuxtLink>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts" setup>
import Service from "~/service/Service"
import urls from "~/service/urls"
import type { TNews } from "~/types/api.types"

const { locale, t } = useI18n()
const token = useToken()
const localePath = useLocalePath()
const route = useRoute()

// State
const detail = ref<TNews>()
const latestNews = ref<TNews>()

// Fetch detail news
async function fetchDetailNews() {
    try {
        detail.value = await Service.get(
            urls.getNewsDetail(route.params.id as string),
            locale.value,
            token.value
        )
    } catch (error) {
        console.error('Error fetching news detail:', error)
    }
}

// Fetch latest news
async function fetchLatestNews() {
    try {
        latestNews.value = await Service.get(
            urls.getLatestNews(),
            locale.value,
            token.value
        )
    } catch (error) {
        console.error('Error fetching latest news:', error)
    }
}

// Share functions
function shareOnFacebook() {
    const url = window.location.href
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
}

function shareOnTwitter() {
    const url = window.location.href
    const text = detail.value?.data?.title || ''
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

function shareOnWhatsApp() {
    const url = window.location.href
    const text = detail.value?.data?.title || ''
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
}

function shareOnTelegram() {
    const url = window.location.href
    const text = detail.value?.data?.title || ''
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

// Watch route changes for navigation between news
watch(
    () => route.params.id,
    () => {
        fetchDetailNews()
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
)

// Initial load
onMounted(() => {
    fetchDetailNews()
    fetchLatestNews()
})

watch(locale, () => {
    fetchDetailNews()
    fetchLatestNews()
})
</script>

<style scoped>
/* Prose styling for content */
:deep(.prose) {
    color: #374151;
}

:deep(.prose p) {
    margin-bottom: 1rem;
    line-height: 1.75;
}

:deep(.prose h2) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

:deep(.prose h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
}

:deep(.prose ul),
:deep(.prose ol) {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
}

:deep(.prose li) {
    margin-bottom: 0.5rem;
}

:deep(.prose a) {
    color: #2563eb;
    text-decoration: underline;
}

:deep(.prose a:hover) {
    color: #1d4ed8;
}

:deep(.prose img) {
    border-radius: 0.5rem;
    margin: 1.5rem 0;
}
</style>