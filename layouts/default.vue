<script lang="ts" setup>
//===============================-< order create status >-===============================
//> variables
const isOpenOrder = useOrderStatus();
//> functions
const closeOrder = () => {
	isOpenOrder.value = false;
};

// submit
async function submitOrder() {
	closeOrder();
}
</script>
<template>
	<div class="wrapper flex flex-col min-h-screen">
		<UiNavbar />
		<div class="flex-1">
			<NuxtPage />
		</div>
		<UiFooter />

		<!-- submit -->
		<BaseModal :is-open="isOpenOrder" @close="closeOrder">
			<template #header>
				<h3 class="font-semibold text-lg">Qabulga yozilish</h3>
				<p class="mt-2 text-text">
					Qabulga yozilish uchun <span class="text-main font-semibold">Ismingiz</span> va <span class="text-main font-semibold">Raqamingiz</span>ni qoldiring tez orada
					operatorlarimiz sizga aloqaga chiqishadi
				</p>
			</template>
			<OrderCreate @success="submitOrder" />
		</BaseModal>
		<!--===Modals===-->
	</div>
</template>
