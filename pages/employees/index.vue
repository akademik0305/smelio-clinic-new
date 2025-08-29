<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from "~/service/Service";
import urls from "~/service/urls";
import type { TEmployee, TEmployees } from "~/types/api.types";
// //> utils
const { locale } = useI18n();
const token = useToken();

//===============================-< get employees >-===============================
//> variables
const employees = ref<TEmployees>();
const firstEmployee = ref<TEmployee>();

//> functions

async function getEmployees() {
	employees.value = await Service.get(
		urls.getOurTeam(),
		locale.value,
		token.value
	);
	firstEmployee.value = employees.value?.data.shift();
}

getEmployees();

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
</script>
<template>
	<main class="wrapper">
		<nav class="mt-5 hidden md:block">
			<div class="container">
				<BaseBreadcump :links="[
					{
						label: $t('home_page'),
						url: '/',
					},
					{
						label: $t('employees'),
					},
				]" />
			</div>
		</nav>

		<!-- employee cards -->
		<section class="mt-2 pb-6 md:pb-8 lg:pb-10 ">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-xl md:text-2xl lg:text-3xl font-semibold">
						{{ $t('our_stomotologs') }}
					</h2>
				</div>

				<div class="mt-4">
					<!-- ✅ responsive grid -->
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						<div v-for="item in employees?.data" :key="item.id"
							class="bg-white p-4 rounded-md hover:scale-[1.02] hover:shadow-sm transition-all duration-500">
							<NuxtLink :to="`/employees/1`" class="flex flex-col sm:flex-row items-center gap-5">
								<div class="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden shrink-0">
									<img :src="item.imageUrl" class="w-full h-full object-cover" :alt="item.full_name" />
								</div>
								<div class="text-center sm:text-left">
									<h3 class="font-bold text-xl sm:text-2xl text-text">
										{{ item.full_name }}
									</h3>
									<p class="mt-2 font-medium text-text text-sm">
										{{ item.position }}
									</p>
									<div class="mt-4" @click.stop.prevent>
										<BaseButton text="Qabulga yozilish" @click="openOrder(item.id)" />
									</div>
								</div>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>

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
				<OrderCreate :team-id="activeId" @success="submitOrder" />
			</BaseModal>
			<!--===Modals===-->
		</section>
		<!-- employee cards -->
	</main>
</template>
