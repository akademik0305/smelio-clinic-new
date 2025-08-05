<script lang="ts" setup>
//===============================-< order create status >-===============================
//> variables
const isOpenOrder = useOrderStatus();
//> functions
const openOrder = () => {
	isOpenOrder.value = true
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
						<div v-for="item in 4" :key="item" class="bg-white p-4 rounded-md hover:scale-[1.02] hover:shadow-sm transition-all duration-500">
							<NuxtLink :to="`/employees/1`" class="flex items-center gap-5">
								<div class="w-40 h-40 rounded-xl overflow-hidden">
									<img
										src="~/assets/images/webp/doctor.webp"
										class="w-full h-full"
										alt=""
									/>
								</div>
								<div class="">
									<h3 class="font-bold text-2xl text-text">
										Fridman Ilya Yulievich
									</h3>
									<p class="mt-2 font-medium text-text text-xs">
										Bosh shifokor, stomatolog-terapevt
									</p>
									<div class="mt-4" @click.stop.prevent>
										<BaseButton text="Qabulga yozilish" @click="openOrder" />
									</div>
								</div>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- employee cards -->
	</main>
</template>
