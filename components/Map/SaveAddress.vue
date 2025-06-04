<script setup lang="ts">
//===============================-< imports >-===============================
//> service
// types
import Service from '~/service/Service'
import urls from '~/service/urls'
import { useMapStore } from '~/store/map.store'
// utils
const { locale } = useI18n()
const token = useToken()
const toast = useToast()
// store
const mapStore = useMapStore()

// emits
const emit = defineEmits(['success'])

//===============================-< address types >-===============================
//> variables
const addressType = ref(1)
const addressTypes = [
	{
		label: 'Uy',
		icon: 'tabler:home',
		value: 1,
	},
	{
		label: 'Ish',
		icon: 'pajamas:work',
		value: 2,
	},
	{
		label: 'Boshqa',
		icon: 'ph:map-pin-light',
		value: 3,
	},
]
//> functions

//===============================-< save address >-===============================
//> variables
const isEmpty = ref(false)
const state = reactive({
	address: '',
	latitude: '',
	longitude: '',
	name: '',
	description: '',
	address_type: 1,
	street: '',
	house: '',
	floor: '',
})
//> functions
async function saveAddress() {
	const formdata = new FormData()
	formdata.append('address', state.address)
	formdata.append('latitude', state.latitude)
	formdata.append('longitude', state.longitude)
	formdata.append('name', state.name)
	formdata.append('description', state.description)
	formdata.append('address_type', state.address_type.toString())
	formdata.append('street', state.street)
	formdata.append('house', state.house)
	formdata.append('floor', state.floor)
	console.log(formdata)

	const res = await Service.post(
		urls.createAddress(),
		locale.value,
		state,
		token.value
	)
	if (!res.success) {
		toast.add({
			title: "Iltimos barcha maydonlarni to'ldiring",
			color: 'error',
		})
		isEmpty.value = true
	} else {
		emit('success')
		toast.add({
			title: "Yangi manzil muvaffaqqiyatli qo'shildi",
			color: 'success',
		})
	}
}

//===============================-< on load >-===============================
//> variables
//> functions
onMounted(() => {
	if (mapStore.currentMapCenter) {
		state.address = mapStore.currentMapCenter?.address.road
		state.longitude = mapStore.currentMapCenter?.lon
		state.latitude = mapStore.currentMapCenter?.lat
	}
})
</script>
<template>
	<div>
		<section class="px-3 py-4.5 rounded-xl bg-white">
			<h2 class="font-medium font-inter">Manzil</h2>
			<article class="mt-3 border-b border-b-gray-2 pb-3">
				<div class="flex items-center justify-between p-3 bg-gray-1 rounded-xl">
					<div class="flex items-center gap-3">
						<Icon name="ion:home-outline" class="text-xl text-black" />
						<p>
							<span class="line-clamp-1 text-gray-4 text-xs font-inter">
								{{ mapStore.currentMapCenter?.address.road }}</span
							>
							<span class="text-sm font-inter">{{
								mapStore.currentMapCenter?.address.city
							}}</span>
						</p>
					</div>
				</div>
			</article>
			<article class="mt-3 flex items-stretch gap-3">
				<div class="w-1/3 h-full">
					<USelect
						v-model="addressType"
						:searchable="false"
						model-key="value"
						label-key="label"
						:items="addressTypes"
						class="w-full py-4.5"
						:ui="{}"
					/>
				</div>
				<div class="w-2/3">
					<label
						for="name"
						class="p-2 rounded-xl text-gray-4 font-inter font-medium text-xs border has-focus:border-yellow transition-colors block w-full"
						:class="[
							isEmpty ? 'border-red-400 bg-red-50' : 'border-gray-1 bg-gray-1 ',
						]"
					>
						Nomi
						<input
							id="name"
							v-model="state.name"
							name="name"
							type="text"
							placeholder="Yozing..."
							class="mt-1 font-inter font-medium text-sm text-black w-full inline-block has"
						/>
					</label>
				</div>
			</article>

			<form action="" class="mt-3" @submit.prevent>
				<div class="grid grid-cols-3 gap-3">
					<label
						for="entrance"
						class="p-2 rounded-xl text-gray-4 font-inter font-medium text-xs border has-focus:border-yellow transition-colors"
						:class="[
							isEmpty ? 'border-red-400 bg-red-50' : 'border-gray-1 bg-gray-1 ',
						]"
					>
						Podyezd
						<input
							id="entrance"
							v-model="state.street"
							name="entrance"
							type="text"
							placeholder="Yozing..."
							class="mt-1 font-inter font-medium text-sm text-black w-full inline-block has"
						/>
					</label>
					<label
						for="entrance"
						class="p-2 rounded-xl text-gray-4 font-inter font-medium text-xs border has-focus:border-yellow transition-colors"
						:class="[
							isEmpty ? 'border-red-400 bg-red-50' : 'border-gray-1 bg-gray-1 ',
						]"
					>
						Qavat
						<input
							id="entrance"
							v-model="state.floor"
							name="entrance"
							type="text"
							placeholder="Yozing..."
							class="mt-1 font-inter font-medium text-sm text-black w-full inline-block has"
						/>
					</label>
					<label
						for="entrance"
						class="p-2 rounded-xl text-gray-4 font-inter font-medium text-xs border has-focus:border-yellow transition-colors"
						:class="[
							isEmpty ? 'border-red-400 bg-red-50' : 'border-gray-1 bg-gray-1 ',
						]"
					>
						Xonadon
						<input
							id="entrance"
							v-model="state.house"
							name="entrance"
							type="text"
							placeholder="Yozing..."
							class="mt-1 font-inter font-medium text-sm text-black w-full inline-block has"
						/>
					</label>
				</div>
				<div class="mt-3">
					<label
						for="entrance"
						class="block w-full p-2 rounded-xl text-gray-4 font-inter font-medium text-xs border has-focus:border-yellow transition-colors"
						:class="[
							isEmpty ? 'border-red-400 bg-red-50' : 'border-gray-1 bg-gray-1 ',
						]"
					>
						Qo’shimcha izoh
						<input
							id="entrance"
							v-model="state.description"
							name="entrance"
							type="text"
							placeholder="Yozing.."
							class="mt-1 font-inter font-medium text-sm text-black w-full inline-block has"
						/>
					</label>
				</div>
			</form>
		</section>

		<footer class="w-full px-3 pb-4 pointer-events-none">
			<div class="mt-2 pointer-events-auto">
				<button
					class="bg-yellow rounded-full w-full block text-center px-4 py-4"
					@click="saveAddress"
				>
					Manzilni saqlash
				</button>
			</div>
		</footer>
	</div>
</template>
