<template>
  <main class="wrapper">
    <nav class="mt-5 hidden md:block">
      <div class="container">
        <BaseBreadcump :links="[
          { label: $t('home_page'), url: '/' },
          { label: $t('news') },
        ]" />
      </div>
    </nav>

    <section class="mt-2 pb-6 md:pb-8 lg:pb-10">
      <div class="container">
        <div class="flex items-end justify-between gap-4">
          <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold">
            {{ $t("news") }}
          </h2>
          <UInput v-model="search" :placeholder="$t('search')" class="max-w-xs" @update:model-value="handleSearch" />
        </div>

        <div class="mt-4">
          <!-- News Grid -->
          <div v-if="news?.data?.items?.length" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="item in news.data.items" :key="item.id"
              class="bg-white rounded-md shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-500">
              <NuxtLink :to="localePath(`/news/${item.id}`)" class="flex flex-col h-full">
                <!-- Image -->
                <div class="w-full h-48 rounded-t-md overflow-hidden shrink-0">
                  <img :src="item.imageUrl" :alt="item.title" class="w-full h-full object-cover" />
                </div>

                <!-- Content -->
                <div class="p-4 flex-1 flex flex-col">
                  <h3 class="font-bold text-xl text-text line-clamp-2">
                    {{ item.title }}
                  </h3>

                  <!-- Content preview (stripped HTML) -->
                  <p class="mt-2 text-gray-600 text-sm line-clamp-3 flex-1">
                    {{ stripHtml(item.content) }}
                  </p>

                  <!-- Date -->
                  <p class="mt-3 text-xs text-gray-500">
                    {{ item.createdAtFormat }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center py-16 text-gray-500">
            <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 class="text-lg font-medium mb-2">{{ $t('no_news_found') }}</h3>
            <p class="text-sm">{{ $t('try_different_search') }}</p>
          </div>

          <!-- Pagination -->
          <div v-if="news?.data?._meta && news.data._meta.pageCount > 1" class="mt-8 flex justify-center">
            <UPagination v-model:page="page" :items-per-page="news.data._meta.perPage"
              :total="news.data._meta.totalCount" :sibling-count="1" show-edges @update:page="handlePageChange" />
          </div>
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
const router = useRouter()

// State
const news = ref<TNews>()
const search = ref<string>((route.query.search as string) || '')
const page = ref<number>(Number(route.query.page) || 1)

// Fetch news function
async function fetchNews() {
  try {
    news.value = await Service.get(
      urls.getNews(search.value, page.value),
      locale.value,
      token.value
    )
  } catch (error) {
    console.error('Error fetching news:', error)
  }
}

// Handle search
function handleSearch() {
  page.value = 1
  updateQuery()
  fetchNews()
}

// Handle page change
function handlePageChange(newPage: number) {
  page.value = newPage
  updateQuery()
  fetchNews()
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Update URL query
function updateQuery() {
  const query: any = { page: page.value }

  if (search.value) {
    query.search = search.value
  }

  router.replace({ query })
}

// Strip HTML tags from content
function stripHtml(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

// Watch route query changes
watch(
  () => route.query,
  (newQuery) => {
    page.value = Number(newQuery.page) || 1
    search.value = (newQuery.search as string) || ''
  }
)

// Initial load
onMounted(() => {
  fetchNews()
})

watch(locale, () => {
  fetchNews()
})
</script>