<script lang="ts" setup>
//===============================-< imports >-===============================
import Service from "~/service/Service";
import urls from "~/service/urls";
import type { TEmployee, TEmployees } from "~/types/api.types";
// //> utils
const { locale } = useI18n();
const token = useToken();
const route = useRoute();

//===============================-< get employees >-===============================
//> variables
const employees = ref<TEmployees>();
const activeEmployee = ref<TEmployee>();

//> functions

async function getEmployees() {
	employees.value = await Service.get(
		urls.getOurTeam(),
		locale.value,
		token.value
	);
	activeEmployee.value = employees.value?.data.find(
		(emp) => emp.id === Number(route.params.id)
	);
}

getEmployees();
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
		<nav class="mt-5 hidden md:block">
			<div class="container">
				<BaseBreadcump
					:links="[
						{ label: $t('home_page'), url: '/' },
						{ label: $t('employees'), url: '/employees' },
						{ label: activeEmployee?.full_name },
					]"
				/>
			</div>
		</nav>

		<!-- employee cards -->
		<section class="mt-4 pb-6 md:pb-8 lg:pb-10">
			<div class="container">
				<!-- flex -> mobile: column, md: row -->
				<div class="flex flex-col md:flex-row gap-5">
					<!-- image -->
					<div class="w-full md:w-1/2 h-auto">
						<img
							:src="activeEmployee?.imageUrl"
							class="w-full h-full object-cover rounded-lg"
							:alt="activeEmployee?.full_name"
						/>
					</div>

					<!-- content -->
					<div class="w-full md:w-1/2 px-0 md:px-4">
						<h3 class="mt-4 md:mt-5 font-medium text-2xl text-text">
							{{ activeEmployee?.full_name }}
						</h3>

						<p
							class="mt-4 md:mt-5 font-medium text-text leading-relaxed"
							v-html="activeEmployee?.content"
						/>

						<p class="mt-3 md:mt-4 font-medium text-subtext text-xs">
							{{ activeEmployee?.position }}
						</p>

						<div class="mt-4">
							<BaseButton :text="$t('submit_order_btn')" @click="openOrder" />
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- employee cards -->

		<!--===Modals===-->
		<BaseModal :is-open="isOpenOrder" @close="closeOrder">
			<template #header>
				<h3 class="font-semibold text-lg">{{ $t("submit_order_btn") }}</h3>
				<p class="mt-2 text-text">
					{{ $t("order_modal.title") }}
					<span class="text-main font-semibold">{{
						$t("order_modal.name")
					}}</span>
					{{ $t("order_modal.and") }}
					<span class="text-main font-semibold">{{
						$t("order_modal.phone")
					}}</span
					>,
					{{ $t("order_modal.instruction") }}
				</p>
			</template>
			<OrderCreate :team-id="Number(route.params.id)" @success="submitOrder" />
		</BaseModal>
		<!--===Modals===-->
	</main>
</template>
