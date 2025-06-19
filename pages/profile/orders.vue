<script setup lang="ts">
//===============================-< imports >-===============================
// import * as z from 'zod'
// // utils
// import Service from '~/service/Service'
// import urls from '~/service/urls'
// import type { TUser } from '~/types/auth.type'
// const { locale } = useI18n()
// const token = useToken()


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
				</div>
			</div>
		</div>
	</main>
</template>
