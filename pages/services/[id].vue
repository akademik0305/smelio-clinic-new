<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from "~/service/Service";
import urls from "~/service/urls";
import type { TService, TServices } from "~/types/api.types";
// //> utils
const { locale } = useI18n();
const token = useToken();
const route = useRoute();
// const localePath = useLocalePath();
//===============================-< get services >-===============================
//> variables
const services = ref<TServices>();
const activeService = ref<TService>();

//> functions

async function getServices() {
	services.value = await Service.get(
		urls.getServices(),
		locale.value,
		token.value
	);
	const current = services.value?.data.find(
		(ser) => ser.id === Number(route.params.id)
	);
	if (current) {
		activeService.value = current;
	}
}
getServices();

//===============================-< order create status >-===============================
//> variables
const isOpenOrder = ref(false);
//> functions
const openOrder = () => {
	isOpenOrder.value = true;
};

const closeOrder = () => {
	isOpenOrder.value = false;
};

// submit
async function submitOrder() {
	closeOrder();
}
</script>
<template>
	<main class="wrapper">
		<!-- banner -->
		<header class="mt-3">
			<div class="h-[40svh] md:h-[500px] relative flex flex-col justify-center items-center">
				<!-- image -->
				<img class="w-full h-full object-cover absolute top-0 left-0" src="~/assets/images/jpg/banner-3.jpg"
					alt="kfc" />

				<!-- overlay -->
				<div class="absolute top-0 left-0 w-full h-full bg-black/40" />

				<div class="max-w-3xl mx-auto h-auto">
					<div class="flex flex-col items-center justify-center py-10 relative gap-6 text-center">
						<h3 class="text-white text-2xl md:text-4xl font-bold">
							{{ activeService?.name }}
						</h3>
						<p class="text-white font-medium text-sm md:text-base">
							{{ $t('services_clinic') }}
						</p>
					</div>
				</div>
			</div>
		</header>
		<!-- banner -->

		<!-- nav -->
		<nav class="hidden md:block mt-5">
			<div class="container">
				<BaseBreadcump :links="[
					{
						label: $t('home_page'),
						url: '/',
					},
					{
						label: $t('services'),
						url: '/services',
					},
					{
						label: activeService?.name ?? '',
					},
				]" />
			</div>
		</nav>
		<!-- nav -->

		<!-- services -->
		<section class="py-6 md:py-8 lg:py-10">
			<div class="container">
				<div class="flex flex-col lg:flex-row gap-6 items-start">
					<!-- text -->
					<div class="flex-1">
						<h3 class="font-bold text-xl md:text-2xl lg:text-3xl">
							{{ activeService?.name }}
						</h3>
						<p class="mt-5 font-medium text-text text-sm md:text-base" v-html="activeService?.content" />
					</div>

					<!-- card -->
					<div class="shadow-lg rounded-lg w-full lg:max-w-[400px] p-6 border border-border">
						<div>
							<p class="font-semibold text-text">{{ $t('price') }}</p>
							<p class="text-lg md:text-xl font-semibold mt-2 text-main">
								{{ activeService?.priceFormat }}
							</p>
						</div>
						<div class="mt-4">
							<p class="font-semibold text-text">{{ $t('duration') }}</p>
							<p class="text-lg md:text-xl font-semibold mt-2 text-main">
								{{ activeService?.duration }}
							</p>
						</div>
						<div class="mt-4">
							<BaseButton :text="$t('submit_order_btn')" :is-full="true" @click="openOrder" />
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- services -->

		<!--===Modals===-->
		<BaseModal :is-open="isOpenOrder" @close="closeOrder">
			<template #header>
				<h3 class="font-semibold text-lg">{{ $t('submit_order_btn') }}</h3>
				<p class="mt-2 text-text text-sm md:text-base">
					{{ $t('order_modal.title') }}
					<span class="text-main font-semibold">{{ $t('order_modal.name') }}</span> {{ $t('order_modal.and') }}
					<span class="text-main font-semibold">{{ $t('order_modal.phone') }}</span>,
					{{ $t('order_modal.instruction') }}
				</p>
			</template>
			<OrderCreate :service-id="Number(route.params.id)" @success="submitOrder" />
		</BaseModal>
		<!--===Modals===-->
	</main>
</template>
