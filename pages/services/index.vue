<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from "~/service/Service";
import urls from "~/service/urls";
// //> utils
const { locale } = useI18n();
const token = useToken();
// const localePath = useLocalePath();
//===============================-< order create status >-===============================
//> variables
const isOpenOrder = ref(false);
const activeId = ref<number | undefined>(undefined);
//> functions
const openOrder = (id: number) => {
	activeId.value = id;
	isOpenOrder.value = true;
};

const closeOrder = () => {
	activeId.value = undefined;
	isOpenOrder.value = false;
};

// submit
async function submitOrder() {
	closeOrder();
}
//===============================-< get services >-===============================
//> variables
const services = ref();

//> functions

async function getServices() {
	services.value = await Service.get(
		urls.getCategoryService(),
		locale.value,
		token.value
	);
}
getServices();
</script>
<template>
	<main class="wrapper">
		<!-- banner -->
		<header class="mt-3">
			<div class="h-[48svh] md:h-[500px] relative">
				<!-- image -->
				<img class="w-full h-full object-cover absolute top-0 left-0" src="~/assets/images/jpg/banner-3.jpg"
					alt="kfc" />

				<!-- overlay -->
				<div class="absolute top-0 left-0 w-full h-full bg-black/40" />

				<div class="max-w-3xl mx-auto">
					<div class="flex flex-col items-center justify-center py-15 relative gap-6 text-center">
						<h3 class="text-white text-xl md:text-2xl lg:text-3xl md:text-4xl font-bold">
							{{ $t('services_clinic') }}
						</h3>
						<p class="text-white font-medium text-sm sm:text-base">
							{{ $t('services_clinic_title') }}
						</p>
						<p class="text-white font-medium leading-6 sm:leading-8 text-xs sm:text-sm">
							{{ $t('services_clinic_description') }}
						</p>
						<BaseButton text="Qabulga yozilish" @click="openOrder" />
					</div>
				</div>
			</div>
		</header>
		<!-- banner -->

		<nav class="mt-5 hidden md:block">
			<div class="container">
				<BaseBreadcump :links="[
					{ label: $t('home_page'), url: '/' },
					{ label: $t('services') },
				]" />
			</div>
		</nav>

		<!-- services -->
		<section class="pt-6 pb-6 md:pb-8 lg:pb-10">
			<div class="container">
				<div v-for="category in services?.data" :key="category.name" class="mt-4 first:mt-0">
					<div class="flex items-center justify-between">
						<h2 class="text-lg sm:text-xl md:text-2xl font-semibold">{{ category.name }}</h2>
					</div>

					<!-- responsive grid -->
					<div class="mt-4 relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
						<ServiceCard v-for="serice in category.services" :key="serice.name" :service="serice" />
					</div>
				</div>
			</div>
		</section>
		<!-- services -->

		<!--===Modals===-->
		<BaseModal :is-open="isOpenOrder" @close="closeOrder">
			<template #header>
				<h3 class="font-semibold text-lg">{{ $t('submit_order_btn') }}</h3>
				<p class="mt-2 text-text">
					{{ $t('order_modal.title') }}
					<span class="text-main font-semibold">{{ $t('order_modal.name') }}</span> {{ $t('order_modal.and') }}
					<span class="text-main font-semibold">{{ $t('order_modal.phone') }}</span>,
					{{ $t('order_modal.instruction') }}
				</p>
			</template>
			<OrderCreate @success="submitOrder" />
		</BaseModal>
		<!--===Modals===-->
	</main>
</template>
