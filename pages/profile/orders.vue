<script setup lang="ts">
//===============================-< imports >-===============================
// utils
import Service from '~/service/Service'
import urls from '~/service/urls'
import type { TOrder } from '~/types/api.types'
const { locale } = useI18n()
const token = useToken()

//===============================-< get orders >-===============================
//> variables
const orders = ref<TOrder>()
const current_page = ref(1)
//> functions
async function getOrders() {
	const res = await Service.get<TOrder>(
		urls.getOrders(current_page.value),
		locale.value,
		token.value
	)
	orders.value = res.data
}

getOrders()

//===============================-< change page >-===============================
//> variables
//> functions
function changePage(page: number) {
	current_page.value = page
	getOrders()
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
						{{ $t('orders_history') }}
					</h3>
					<div v-if="orders?.items.length" class="mt-4">
						<article
							v-for="order in orders?.items"
							:key="order.id"
							class="border-t border-border py-3 last:pb-0"
						>
							<div class="flex items-center gap-4">
								<p class="text-subtext">ID:</p>
								<p class="font-medium text-text text-lg">{{ order.id }}</p>
							</div>
							<div class="flex items-center gap-4">
								<p class="text-subtext">{{ $t('type') }}:</p>
								<p class="font-medium text-text text-lg">
									{{ order.deliveryTypeName }}
								</p>
							</div>
							<div
								v-if="order.delivery_type === 1"
								class="flex items-center gap-4"
							>
								<p class="text-subtext">{{ $t('delivery_price') }}:</p>
								<p class="font-medium text-text text-lg">
									{{ order.deliverySumFormat }}
								</p>
							</div>
							<div class="flex items-center gap-4">
								<p class="text-subtext">{{ $t('all_price') }}:</p>
								<p class="font-medium text-text text-lg">
									{{ order.totalSumFormat }}
								</p>
							</div>
							<div class="flex items-center gap-4">
								<p class="text-subtext">{{ $t('phone') }}:</p>
								<p class="font-medium text-text text-lg">{{ order.phone }}</p>
							</div>
							<div class="flex items-center gap-4">
								<p class="text-subtext">{{ $t('date') }}:</p>
								<p class="font-medium text-text text-lg">
									{{ order.dateFormat }}
								</p>
							</div>

							<div class="mt-4">
								<details class="group">
									<summary
										class="flex justify-between items-center font-medium cursor-pointer list-none"
									>
										<h4 class="font-semibold text-text">
											{{ $t('products')
											}}<span class="text-main inline-block"
												>({{ order.orderItems.length }})</span
											>:
										</h4>
										<span class="transition group-open:rotate-180">
											<UIcon
												name="tabler:chevron-down"
												class="font-medium text-2xl text-text"
											/>
										</span>
									</summary>
									<div
										v-for="product in order.orderItems"
										:key="product.id"
										class="py-2 px-4"
									>
										<div class="flex items-center gap-4">
											<p class="text-subtext">{{ $t('name') }}:</p>
											<p class="font-medium text-text">
												{{ product.productName }}
											</p>
										</div>
										<div class="flex items-center gap-4">
											<p class="text-subtext">{{ $t('count') }}:</p>
											<p class="font-medium text-text">{{ product.count }}</p>
										</div>
										<div class="flex items-center gap-4">
											<p class="text-subtext">{{ $t('price') }}:</p>
											<p class="font-medium text-text">
												{{ product.productPriceFormat }}
											</p>
										</div>
										<div class="flex items-center gap-4">
											<p class="text-subtext">{{ $t('all_price') }}:</p>
											<p class="font-medium text-text">
												{{ product.totalSumFormat }}
											</p>
										</div>
									</div>
								</details>
							</div>
						</article>
						<div v-if="orders?._meta.pageCount > 1" class="mt-5">
							<BasePagination :meta="orders?._meta" @change-page="changePage" />
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
