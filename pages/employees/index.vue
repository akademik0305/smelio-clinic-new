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
						},
					]"
				/>
			</div>
		</nav>

		<!-- employee cards -->
		<section class="mt-2 pb-10">
			<div class="container">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-semibold">Bizning stomatologlarimiz</h2>
				</div>

				<div class="mt-4">
					<div class="grid grid-cols-2 gap-4">
						<div
							v-for="item in employees?.data"
							:key="item.id"
							class="bg-white p-4 rounded-md hover:scale-[1.02] hover:shadow-sm transition-all duration-500"
						>
							<NuxtLink :to="`/employees/1`" class="flex items-center gap-5">
								<div class="w-40 h-40 rounded-xl overflow-hidden">
									<img
										:src="item.imageUrl"
										class="w-full h-full"
										:alt="item.full_name"
									/>
								</div>
								<div class="">
									<h3 class="font-bold text-2xl text-text">
										{{ item.full_name }}
									</h3>
									<p class="mt-2 font-medium text-text text-xs">
										{{ item.position }}
									</p>
									<div class="mt-4" @click.stop.prevent>
										<BaseButton
											text="Qabulga yozilish"
											@click="openOrder(item.id)"
										/>
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
					<h3 class="font-semibold text-lg">Qabulga yozilish</h3>
					<p class="mt-2 text-text">
						Qabulga yozilish uchun
						<span class="text-main font-semibold">Ismingiz</span> va
						<span class="text-main font-semibold">Raqamingiz</span>ni qoldiring
						tez orada operatorlarimiz sizga aloqaga chiqishadi
					</p>
				</template>
				<OrderCreate :team-id="activeId" @success="submitOrder" />
			</BaseModal>
			<!--===Modals===-->
		</section>
		<!-- employee cards -->
	</main>
</template>
