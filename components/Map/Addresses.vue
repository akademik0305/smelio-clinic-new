<script lang="ts" setup>
//===============================-< imports >-===============================

// service
import Service from '~/service/Service'
import urls from '~/service/urls'
import { useMapStore } from '~/store/map.store'
// types
import type { TAddress, TAddresses } from '~/types/map.types'

//> store
// import { useStore } from '~/store/useful.store'
// const store = useStore()
const mapStore = useMapStore()

//> utils
const { locale } = useI18n()
const token = useToken()
// const router = useRouter()

// props
const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
})
// emit
const emit = defineEmits(['close', 'add-new'])

//===============================-< change active address >-===============================
//> variables
//> functions
function changeActiveAddress(address: TAddress) {
	if (address.id !== mapStore.activeAddress?.id) {
		mapStore.setActiveAddress(address, locale.value, token.value)
		emit('close')
	}
}
//===============================-< get addresses >-===============================
//> variables
const addresses = ref<TAddresses>()

//> functions
async function getAddresses() {
	const res = await Service.get<TAddresses>(
		urls.getAddresses(),
		locale.value,
		token.value
	)
	addresses.value = res.data
	addresses.value.forEach(address => {
		if (address.is_default) {
			mapStore.activeAddress = address
		}
	})
}

//===============================-< watch modal state >-===============================
//> watch
watch(
	() => props.isOpen,
	newValue => {
		if (newValue) getAddresses()
	}
)

//===============================-< on load >-===============================
//> variables
//> functions
onMounted(() => {
	getAddresses()
})
</script>
<template>
	<div class="addresses pb-24 pt-4 bg-gray-1">
		<section class="px-4">
			<article
				v-for="address in addresses"
				:key="address.id"
				class="flex items-center gap-4 mt-4 first:mt-0 bg-white rounded-xl py-2.5 px-3 border"
				:class="[
					mapStore.activeAddress?.id === address.id
						? 'border-yellow'
						: 'border-white',
				]"
				@click="changeActiveAddress(address)"
			>
				<div
					class="w-8 h-8 rounded-md shrink-0 flex items-center justify-center"
					:class="[
						mapStore.activeAddress?.id === address.id
							? 'bg-yellow'
							: 'bg-gray-1',
					]"
				>
					<!-- {{ address.id }} -->
					<UIcon
						name="ph:map-pin-light"
						class="w-full h-full text-2xl text-black"
					/>
				</div>
				<div>
					<!-- {{ place }} -->
					<h4 class="font-inter font-medium text-lg">
						{{ address.address_type_name }}
					</h4>
					<p class="font-inter text-sm line-clamp-1">
						{{ address.address }}
					</p>
					<!-- <p class="font-inter text-sm">989.3m</p> -->
				</div>
			</article>
		</section>

		<footer
			class="fixed bottom-0 left-0 w-full bg-white rounded-t-xl px-3 py-2 shadow-modal"
		>
			<div class="mt-2 pointer-events-auto">
				<button
					class="bg-yellow rounded-full w-full block text-center px-4 py-4"
					@click="emit('add-new')"
				>
					Yangi mazil qo'shish
				</button>
			</div>
		</footer>
	</div>
</template>
<style></style>
