<script setup lang="ts">
//===============================-< imports >-===============================
import urls from "~/service/urls";
import Service from "~/service/Service";
const switchLocalePath = useSwitchLocalePath();

// import { useRouter } from 'vue-router'
// const router = useRouter()

//utils
const { locale,} = useI18n();
const router = useRouter();
// const token = useToken()
// const toast = useToast()
const localePath = useLocalePath();
// store

// get data
// const companyData = useCompanyData();
// async function getdata() {
//   const res = await Service.get(urls.allSettingsGet, locale.value, token.value);
//   companyData.value = res?.data[0];
// }

// getdata();
//===============================-< languages >-===============================
//> variables
type TLocale = "uz" | "ru" | "en";
const locales = ["Uz", "Ru", "En"];

const currentLang = ref<TLocale>(locale.value);

//> functions
watch(currentLang, () => {
	// setLocale(currentLang.value.toLowerCase() as TLocale)
	router.push(switchLocalePath(currentLang.value.toLowerCase() as TLocale));
});

//===============================-< order create status >-===============================
//> variables
const isOpenOrder = useOrderStatus();
//> functions
const openOrder = () => {
	isOpenOrder.value = true
}


//===============================-< fixed navbar and category >-===============================
//> variables
const startFixed = 80;
const isFixedNav = ref(false);

//> functions
function handleScrool() {
	const navbarHeight =
		document.querySelector("#navbar")?.scrollHeight || startFixed;
	if (window.scrollY > navbarHeight) {
		isFixedNav.value = true;
		document.body.style.paddingTop = "80px";
	} else {
		isFixedNav.value = false;
		document.body.style.paddingTop = "0px";
	}
}

//===============================-< get contact >-===============================
//> variables
const contact = ref();
//> functions
async function getContact() {
	const res = await Service.get(urls.getContactInfo(), locale.value, null);
	contact.value = res.data;
}

getContact();

//===============================-< on page load >-===============================
//> variables
//> functions
onMounted(() => {
	currentLang.value = locale.value;
	window.addEventListener("scroll", handleScrool);
	// mapStore.getUserPosition()
});
onUnmounted(() => {
	window.removeEventListener("scroll", handleScrool);
});
</script>

<template>
	<div>
		<nav
			id="navbar"
			class="-top-10 left-0 bg-navbar-bg w-full z-50 border-b border-b-border transition-all"
			:class="[isFixedNav ? 'fixed top-0 shadow-md ' : 'static']"
		>
			<div class="container">
				<div
					class="py-4 flex items-center justify-between flex-col gap-4 md:flex-row"
				>
					<div class="flex items-center gap-6 justify-between">
						<!-- logo -->
						<NuxtLink :to="localePath('/')" class="block">
							<img
								src="~/assets/images/logo/logo-nobg.png"
								alt="logo"
								class="w-full h-full max-h-14 object-cover"
							/>
						</NuxtLink>
					</div>
					<!-- navbar right -->
					<div class="flex items-center gap-6">
						<!-- menu -->
						<ul class="flex items-center gap-4">
							<li class="relative group">
								<NuxtLink
									:to="localePath('/')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300"
									>Asosiy sahifa</NuxtLink
								>
								<span
									class="absolute bottom-0 left-0 w-full bg-main h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
								/>
							</li>
							<li class="relative group">
								<NuxtLink
									:to="localePath('/about')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300"
									>Klinika haqida</NuxtLink
								>
								<span
									class="absolute bottom-0 left-0 w-full bg-main h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
								/>
							</li>
							<li class="relative group">
								<NuxtLink
									:to="localePath('/services')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300"
									>Xizmatlar</NuxtLink
								>
								<span
									class="absolute bottom-0 left-0 w-full bg-main h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
								/>
							</li>
							<li class="relative group">
								<NuxtLink
									:to="localePath('/employees')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300"
									>Xodimlar</NuxtLink
								>
								<span
									class="absolute bottom-0 left-0 w-full bg-main h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
								/>
							</li>
							<li class="relative group">
								<NuxtLink
									:to="localePath('/contact')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300"
									>Bog'lanish</NuxtLink
								>
								<span
									class="absolute bottom-0 left-0 w-full bg-main h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
								/>
							</li>
							<li class="relative">
								<BaseButton text="Qabulga yozilish" @click="openOrder"/>
							</li>
						</ul>
						<!-- language -->
						<USelect
							v-model="currentLang"
							leading-icon="material-symbols:language"
							:items="locales"
							size="md"
							class="border border-border rounded-md py-2 hover:border-main transition-all duration-300"
						>
							<template #default="{ modelValue }">
								<span class="capitalize text-text">{{ modelValue }}</span>
							</template>
						</USelect>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>
