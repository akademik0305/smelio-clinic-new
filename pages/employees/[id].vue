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
		<nav class="mt-5">
			<div class="container">
				<BaseBreadcump
					:links="[
						{
							label: 'Asosiy sahifa',
							url: '/',
						},
						{
							label: 'Xodimlar',
							url: '/employees',
						},
						{
							label: activeEmployee?.full_name,
						},
					]"
				/>
			</div>
		</nav>

		<!-- employee cards -->
		<section class="mt-4 pb-10">
			<div class="container">
				<div class="flex gap-5">
					<div class="flex-1 h-auto">
						<img
							:src="activeEmployee?.imageUrl"
							class="w-full h-full"
							:alt="activeEmployee?.full_name"
						/>
					</div>
					<div class="px-4 flex-1">
						<h3 class="mt-5 font-medium text-2xl text-text">
							{{ activeEmployee?.full_name }}
						</h3>
						<p
							class="mt-5 font-medium text-text"
							v-html="activeEmployee?.content"
						/>

						<p class="mt-4 font-medium text-subtext text-xs">
							{{ activeEmployee?.position }}
						</p>

						<div class="mt-4" @click.stop.prevent>
							<BaseButton text="Qabulga yozilish" @click="openOrder" />
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- employee cards -->

		<!--===Modals===-->
		<BaseModal :is-open="isOpenOrder" @close="closeOrder">
			<template #header>
				<h3 class="font-semibold text-lg">Qabulga yozilish</h3>
				<p class="mt-2 text-text">
					Qabulga yozilish uchun
					<span class="text-main font-semibold">Ismingiz</span> va
					<span class="text-main font-semibold">Raqamingiz</span>ni qoldiring
					tez orada operatorlarimiz sizga aloqaga chiqishadi
				</p>
			</template>
			<OrderCreate :team-id="Number(route.params.id)" @success="submitOrder" />
		</BaseModal>
		<!--===Modals===-->
	</main>
</template>
