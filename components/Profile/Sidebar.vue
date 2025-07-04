<script setup lang="ts">
//=============================-< imports >-=================================
import { useAuthStore } from '~/store/auth.store'
const localePath = useLocalePath()
const authStore = useAuthStore()

// utils
const token = useToken()
const router = useRouter()

//============================================-< logout >-============================================
//> variables
//> functions
function logOut() {
	token.value = null
	authStore.logOut()
	router.push(localePath('/'))
}
</script>
<template>
	<div
		class="bg-white rounded-xl h-auto border border-border p-6 duration-500 transition-all w-full md:w-auto"
	>
		<h2
			class="font-bold text-xl text-pr-text flex items-center justify-between"
		>
			{{ $t('personal_cabinet') }}
		</h2>

		<div
			class="mt-4 md:mt-0 flex flex-row md:flex-col overflow-x-auto gap-4 md:gap-0 pb-4 md:pb-0"
		>
			<NuxtLink
				:to="localePath('/profile/cards')"
				class="flex items-center justify-start gap-5 md:mt-7 font-medium text-nowrap md:text-wrap hover:text-main transition-colors group"
			>
				<UIcon
					name="proicons:person"
					class="text-2xl w-6 text-text group-hover:text-main transition-colors"
				/>
				{{ $t('company_cards') }}
			</NuxtLink>
			<NuxtLink
				:to="localePath('/profile')"
				class="flex items-center justify-start gap-5 md:mt-7 font-medium text-nowrap md:text-wrap hover:text-main transition-colors group"
			>
				<UIcon
					name="proicons:person"
					class="text-2xl w-6 text-text group-hover:text-main transition-colors"
				/>
				{{ $t('personal_info') }}
			</NuxtLink>
			<NuxtLink
				:to="localePath('/profile/orders')"
				class="flex items-center justify-start gap-5 md:mt-7 font-medium text-nowrap md:text-wrap hover:text-main transition-colors group"
			>
				<UIcon
					name="proicons:cart"
					class="text-2xl w-6 text-text group-hover:text-main transition-colors"
				/>
				{{ $t('orders') }}
			</NuxtLink>
			<NuxtLink
				:to="localePath('/profile/payments')"
				class="flex items-center justify-start gap-5 md:mt-7 font-medium text-nowrap md:text-wrap hover:text-main transition-colors group"
			>
				<UIcon
					name="ic:sharp-history"
					class="text-2xl w-6 text-text group-hover:text-main transition-colors"
				/>
				{{ $t('payments') }}
			</NuxtLink>
			<button
				class="flex items-center justify-start gap-5 md:mt-7 font-medium text-nowrap md:text-wrap hover:text-main transition-colors group"
				@click="logOut"
			>
				<UIcon
					name="material-symbols:logout-rounded"
					class="text-2xl w-6 text-text group-hover:text-main transition-colors"
				/>
				{{ $t('logout') }}
			</button>
		</div>
	</div>
</template>
<style>
a.router-link-active.router-link-exact-active {
	color: var(--color-main);
}

a.router-link-active.router-link-exact-active span {
	background-color: var(--color-main);
}
</style>
