<script setup lang="ts">
import urls from "~/service/urls";
import Service from "~/service/Service";
const switchLocalePath = useSwitchLocalePath();

const { locale, setLocale } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

type TLocale = "uz" | "ru" | "en";
const locales = ["Uz", "Ru", "En"];
const currentLang = ref<TLocale>(locale.value);

watch(currentLang, () => {
	setLocale(currentLang.value.toLowerCase() as TLocale);
});

const isOpenOrder = useOrderStatus();
const openOrder = () => {
	isOpenOrder.value = true;
};

const startFixed = 80;
const isFixedNav = ref(false);

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

// mobile menu
const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const closeMenu = () => (isMenuOpen.value = false);

onMounted(() => {
	currentLang.value = locale.value;
	window.addEventListener("scroll", handleScrool);
});
onUnmounted(() => {
	window.removeEventListener("scroll", handleScrool);
});
</script>

<template>
	<div>
		<nav id="navbar" class="left-0 bg-navbar-bg w-full z-50 border-b border-b-border transition-all"
			:class="[isFixedNav ? 'fixed top-0 shadow-md ' : 'static']">
			<div class="container">
				<div class="py-4 flex items-center justify-between flex-row">
					<!-- logo -->
					<NuxtLink :to="localePath('/')" class="block">
						<img src="~/assets/images/logo/logo-nobg.png" alt="logo" class="w-full h-full max-h-14 object-cover" />
					</NuxtLink>

					<!-- desktop menu -->
					<div class="hidden lg:flex items-center gap-6">
						<ul class="flex items-center gap-4">
							<li class="relative group">
								<NuxtLink :to="localePath('/')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300">{{ $t('home_page')
									}}
								</NuxtLink>
							</li>
							<li class="relative group">
								<NuxtLink :to="localePath('/about')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300">{{
										$t("about_clinic") }}
								</NuxtLink>
							</li>
							<li class="relative group">
								<NuxtLink :to="localePath('/services')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300">{{
										$t("services") }}
								</NuxtLink>
							</li>
							<li class="relative group">
								<NuxtLink :to="localePath('/employees')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300">{{
										$t("employees") }}
								</NuxtLink>
							</li>
							<li class="relative group">
								<NuxtLink :to="localePath('/contact')"
									class="font-medium text-text group-hover:text-main transition-colors duration-300">{{
										$t("contact") }}
								</NuxtLink>
							</li>
							<li>
								<BaseButton :text="$t('submit_order_btn')" @click="openOrder" />
							</li>
						</ul>
						<USelect v-model="currentLang" leading-icon="material-symbols:language" :items="locales" size="md"
							class="border border-border rounded-md py-2 hover:border-main transition-all duration-300">
							<template #default="{ modelValue }">
								<span class="capitalize text-text">{{ modelValue }}</span>
							</template>
						</USelect>
					</div>

					<!-- mobile hamburger -->
					<button class="lg:hidden flex flex-col gap-1.5" @click="toggleMenu" aria-label="Toggle Menu">
						<span class="w-6 h-0.5 bg-text transition-all" :class="isMenuOpen ? 'rotate-45 translate-y-2' : ''" />
						<span class="w-6 h-0.5 bg-text transition-all" :class="isMenuOpen ? 'opacity-0' : ''" />
						<span class="w-6 h-0.5 bg-text transition-all" :class="isMenuOpen ? '-rotate-45 -translate-y-2' : ''" />
					</button>
				</div>
			</div>
		</nav>

		<!-- Overlay -->
		<transition name="fade">
			<div v-if="isMenuOpen" class="fixed inset-0 bg-black/50 z-40" @click="closeMenu" />
		</transition>

		<!-- mobile side menu -->
		<transition name="slide-right">
			<div v-if="isMenuOpen" class="fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-50 flex flex-col gap-6 p-6">
				<span class="cancel cursor-pointer absolute top-6 right-6" @click="closeMenu">
					<UIcon name="tabler:x" class="text-xl" />
				</span>
				<NuxtLink :to="localePath('/')" @click="closeMenu">{{ $t("home_page") }}</NuxtLink>
				<NuxtLink :to="localePath('/about')" @click="closeMenu">{{ $t("about_clinic") }}</NuxtLink>
				<NuxtLink :to="localePath('/services')" @click="closeMenu">{{ $t("services") }}</NuxtLink>
				<NuxtLink :to="localePath('/employees')" @click="closeMenu">{{ $t("employees") }}</NuxtLink>
				<NuxtLink :to="localePath('/contact')" @click="closeMenu">{{ $t("contact") }}</NuxtLink>
				<BaseButton :text="$t('submit_order_btn')" @click="openOrder" />
				<USelect v-model="currentLang" leading-icon="material-symbols:language" :items="locales" size="md"
					class="border border-border rounded-md py-2 max-w-[100px] hover:border-main transition-all duration-300">
					<template #default="{ modelValue }">
						<span class="capitalize text-text">{{ modelValue }}</span>
					</template>
				</USelect>
			</div>
		</transition>
	</div>
</template>

<style scoped>
a.router-link-active.router-link-exact-active {
	color: var(--color-main);
}

/* overlay fade */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

/* slide menu animation */
.slide-right-enter-active,
.slide-right-leave-active {
	transition: all 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
	transform: translateX(100%);
}
</style>
