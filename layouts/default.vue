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
	</div>
</template>
