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

//===============================-< fixed navbar and category >-===============================
//> variables
const startFixed = 80
const isFixedNav = ref(false)

//> functions
function handleScrool() {
	const navbarHeight =
		document.querySelector('#navbar')?.scrollHeight || startFixed
	if (window.scrollY > navbarHeight) {
		isFixedNav.value = true
		document.body.style.paddingTop = '80px'
	} else {
		isFixedNav.value = false
		document.body.style.paddingTop = '0px'
	}
}

//===============================-< login or register >-===============================
//> variables
const isOpenLogin = ref(false)
const openLogin = () => {
	isOpenLogin.value = true
}

const closeLogin = () => {
	isOpenLogin.value = false
}

//> functions
function submitLogin(){
	closeLogin();
}
//===============================-< on page load >-===============================
//> variables
//> functions
onMounted(() => {
	currentLang.value = locale.value
	window.addEventListener('scroll', handleScrool)
	// mapStore.getUserPosition()
	// console.log(mapStore.activeAddress)
})
onUnmounted(() => {
	window.removeEventListener('scroll', handleScrool)
})
</script>

<template>
	<div>
		<nav
			id="navbar"
			class="-top-10 left-0 bg-navbar-bg w-full z-50 border-b border-b-border transition-all"
			:class="[isFixedNav ? 'fixed top-0 shadow-md ' : 'static']"
		>
			<div class="container">
				<div class="py-4 flex items-center justify-between">
					<div class="flex items-center gap-6">
						<NuxtLink to="/" class="block w-40 h-auto">
							<img
								src="~/assets/images/logo/logo.png"
								alt="logo"
								class="w-full h-full object-cover"
							/>
						</NuxtLink>
						<NuxtLink
							to="/categories"
							class="flex items-center justify-center gap-2 bg-main border border-bg rounded-xl py-2.5 px-10 cursor-pointer group hover:bg-bg hover:border-main transition-colors"
						>
							<UIcon
								name="ic:round-menu"
								class="text-2xl w-6 text-text group-hover:text-main"
							/>
							Katalog
						</NuxtLink>
					</div>
					<!-- navbar right -->
					<div class="flex items-center gap-3">
						<NuxtLink
							to="/search"
							class="flex items-center justify-center gap-2 w-full py-1.5 px-2 cursor-pointer hover:border-main transition-colors relative group"
						>
							<UIcon
								name="i-lucide-search"
								class="text-2xl w-6 text-text group-hover:text-main transition-colors"
							/>
						</NuxtLink>
						<NuxtLink
							to="/wishlist"
							class="flex items-center justify-center gap-2 w-full py-1.5 px-2 cursor-pointer hover:border-main transition-colors relative group"
						>
							<UIcon
								name="mdi:heart-outline"
								class="text-2xl w-6 text-text group-hover:text-main transition-colors"
							/>
							<span
								class="flex items-center justify-center bg-main rounded-full p-0.5 absolute top-0 right-0 text-bg text-xs w-5 h-5"
								>12</span
							>
						</NuxtLink>
						<NuxtLink
							to="/cart"
							class="relative flex items-center justify-center gap-2 w-full py-1.5 px-2 cursor-pointer hover:border-main transition-colors group"
						>
							<UIcon
								name="proicons:cart"
								class="text-2xl w-6 text-text group-hover:text-main transition-colors"
							/>
							<span
								class="flex items-center justify-center bg-main rounded-full p-0.5 absolute top-0 right-0 text-bg text-xs w-5 h-5"
								>12</span
							>
						</NuxtLink>
						<button
							class="relative flex items-center justify-center gap-2 w-full py-1.5 px-2 cursor-pointer hover:border-main transition-colors group"
							@click="openLogin"
						>
							<UIcon
								name="proicons:person"
								class="text-2xl w-6 text-text group-hover:text-main transition-colors"
							/>
							<span class="text-text group-hover:text-main transition-colors"
								>Kirish</span
							>
						</button>
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

		<!--=== modals ===-->
		<!-- send phone number -->
		<BaseModal :is-open="isOpenLogin" @close="closeLogin">
			<template #header>
				<div class="">
					<h5 class="font-semibold text-xl">Kirish yoki ro'yxatdan o'tish</h5>
				</div>
			</template>
			<AuthLogin @success="submitLogin" />
		</BaseModal>
		<!--=== modals ===-->
	</div>
</template>
