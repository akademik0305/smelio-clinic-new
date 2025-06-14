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
		class="bg-white rounded-xl h-auto border border-border p-6 duration-500 transition-all"
	>
		<h2
			class="font-bold text-xl text-pr-text flex items-center justify-between"
		>
			{{ $t('personal_cabinet') }}
		</h2>

		<NuxtLink
			:to="localePath('/profile')"
			class="flex items-center justify-start gap-5 mt-7 font-medium hover:text-main transition-colors group"
		>
			<UIcon
				name="proicons:person"
				class="text-2xl w-6 text-text group-hover:text-main transition-colors"
			/>
			{{ $t('personal_info') }}
		</NuxtLink>
		<NuxtLink
			:to="localePath('/profile/orders')"
			class="flex items-center justify-start gap-5 mt-7 font-medium hover:text-main transition-colors group"
		>
			<UIcon
				name="proicons:cart"
				class="text-2xl w-6 text-text group-hover:text-main transition-colors"
			/>
			{{ $t('orders') }}
		</NuxtLink>
		<button
			class="flex items-center justify-start gap-5 mt-7 font-medium hover:text-main transition-colors group"
			@click="logOut"
		>
			<UIcon
				name="material-symbols:logout-rounded"
				class="text-2xl w-6 text-text group-hover:text-main transition-colors"
			/>
			{{ $t('logout') }}
		</button>
	</div>
</template>
