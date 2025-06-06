<script setup lang="ts">
//===============================-< imports >-===============================
// import { useRouter } from 'vue-router'
// const router = useRouter()

//utils
// const token = useToken()

// ===================== multi language =============================
// variables
const { locale, setLocale } = useI18n()
// const localePath = useLocalePath()

// get data
// const companyData = useCompanyData();
// async function getdata() {
//   const res = await Service.get(urls.allSettingsGet, locale.value, token.value);
//   companyData.value = res?.data[0];
// }

// getdata();
//===============================-< languages >-===============================
//> variables
type TLocale = 'uz' | 'ru' | 'en'
const locales = ['Uz', 'Ru', 'En']
console.log(locale.value)

const currentLang = ref<TLocale>(locale.value)

//> functions
watch(currentLang, () => {
	setLocale(currentLang.value.toLowerCase() as TLocale)
})

//===============================-< on page load >-===============================
onMounted(() => {
	currentLang.value = locale.value
	console.log(currentLang.value)
})
</script>
<template>
	<nav
		class="fixed top-0 left-0 bg-navbar-bg w-full z-50 shadow-md border-b border-b-border"
	>
		<div class="container">
			<div class="py-4 flex items-center justify-between">
				<h2>
					<NuxtLink to="/" class="block w-40 h-auto">
						<img
							src="~/assets/images/logo/logo.png"
							alt="logo"
							class="w-full h-full object-cover"
						/>
					</NuxtLink>
				</h2>
				<div class="flex items-center gap-3">
					<NuxtLink
						to="/cart"
						class="flex items-center justify-center gap-2 w-full py-1.5 px-2 cursor-pointer hover:border-main transition-colors relative"
					>
						<UIcon
							name="mdi:heart-outline"
							class="text-2xl w-6 text-text group-hover:text-main"
						/>
						<span
							class="flex items-center justify-center bg-orange-500 rounded-full p-0.5 absolute top-0 right-0 text-bg text-xs w-5 h-5"
							>12</span
						>
					</NuxtLink>
					<NuxtLink
						to="/cart"
						class="relative flex items-center justify-center gap-2 w-full py-1.5 px-2 cursor-pointer hover:border-main transition-colors"
					>
						<UIcon
							name="proicons:cart"
							class="text-2xl w-6 text-text group-hover:text-main"
						/>
						<span
							class="flex items-center justify-center bg-orange-500 rounded-full p-0.5 absolute top-0 right-0 text-bg text-xs w-5 h-5"
							>12</span
						>
					</NuxtLink>
					<USelect
						v-model="currentLang"
						leading-icon="material-symbols:language"
						:items="locales"
						size="md"
						class="border border-gray-500"
					>
						<template #default="{ modelValue }">
							<span class="capitalize text-text">{{ modelValue }}</span>
						</template>
					</USelect>
				</div>
			</div>
		</div>
	</nav>
</template>
