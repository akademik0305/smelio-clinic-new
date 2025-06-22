<script setup lang="ts">
//===============================-< imports >-===============================
// utils
import Service from '~/service/Service'
import urls from '~/service/urls'
import type { TPayment } from '~/types/api.types'
const { locale } = useI18n()
const token = useToken()

//===============================-< get payments >-===============================
//> variables
const payments = ref<TPayment>()
const current_page = ref(1)
//> functions
async function getPayments() {
	const res = await Service.get<TPayment>(
		urls.getPayments(current_page.value),
		locale.value,
		token.value
	)
	payments.value = res.data
}

getPayments()

//===============================-< change page >-===============================
//> variables
//> functions
function changePage(page: number) {
	current_page.value = page
	getPayments()
}

//===============================-< on page load >-===============================
//> variables
//> functions
onMounted(() => {})
</script>

<template>
	<main class="py-10">
		<div class="container max-w-7xl mx-auto px-4 flex-1 flex flex-col">
			<div
				class="flex items-start justify-start gap-5 flex-1 flex-col md:flex-row"
			>
				<!-- sidebar start -->
				<profile-sidebar />
				<!-- sidebar end -->

				<div
					class="bg-white border border-border rounded-2xl p-7 flex-1 w-full"
				>
					<h3 class="font-semibold text-xl text-pr-text">
						{{ $t('payments_history') }}
					</h3>
					<div v-if="payments?.items.length" class="mt-4">
						<article
							v-for="payment in payments?.items"
							:key="payment.id"
							class="border-t border-border py-3 last:pb-0"
						>
							<div class="flex items-center gap-4">
								<p class="text-subtext">ID:</p>
								<p class="font-medium text-text text-lg">{{ payment.id }}</p>
							</div>
							<div class="flex items-center gap-4">
								<p class="text-subtext">{{ $t('payment_type') }}:</p>
								<p class="font-medium text-text text-lg">
									{{ payment.paymentTypeName }}
								</p>
							</div>
							<div class="flex items-center gap-4">
								<p class="text-subtext">{{ $t('all_price') }}:</p>
								<p class="font-medium text-text text-lg">
									{{ payment.amountSumFormat }}
								</p>
							</div>
							<div class="flex items-center gap-4">
								<p class="text-subtext">{{ $t('date') }}:</p>
								<p class="font-medium text-text text-lg">
									{{ payment.dateFormat }}
								</p>
							</div>
						</article>
						<div v-if="payments?._meta.pageCount > 1" class="mt-5">
							<BasePagination
								:meta="payments?._meta"
								@change-page="changePage"
							/>
						</div>
					</div>
					<div
						v-else
						class="w-full h-80 flex flex-col items-center justify-center gap-2"
					>
						<div class="w-40 h-auto flex justify-center">
							<Icon
								name="icon-park-solid:database-network"
								class="mt-2 text-7xl text-slate-400"
							/>
						</div>
						<p class="font-meduim text-base text-gray-4">
							{{ $t('empty_data_product') }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
