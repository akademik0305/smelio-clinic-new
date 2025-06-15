<script lang="ts" setup>
//===============================-< imports >-===============================
import * as z from 'zod'
import type { TabsItem } from '@nuxt/ui'
// import type { FormSubmitEvent } from '@nuxt/ui'
// utils
import Service from '~/service/Service'
import urls from '~/service/urls'
import { useCartStore } from '~/store/cart.store'
const { locale } = useI18n()
const token = useToken()
const cartStore = useCartStore()

// emits
const emits = defineEmits(['success'])

//===============================-< order type >-===============================
//> variables

const orderTypes = ref<TabsItem[]>([
	{
		label: 'Olib ketish',
		// icon: 'i-lucide-user',
		value: 'false',
	},
	{
		label: 'Yetkazib berish',
		value: 'true',
		// icon: 'i-lucide-lock',
	},
])
//> functions
//===============================-< submit number >-===============================
//> variables
const schema = z
	.object({
		phone: z
			.string({ required_error: 'Telefon raqamini kiriting' })
			.min(17, 'Telefon raqamini to`g`ri kiriting'),
		requireAddress: z.string(),
		address: z.string().optional(),
	})
	.refine(
		data => {
			if (data.requireAddress === 'true') {
				return data.address && data.address.length > 0
			}
			return true
		},
		{
			message: 'Manzilni kiriting',
			path: ['address'],
		}
	)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	phone: '+998',
	address: '',
	requireAddress: 'false',
})

// function event: FormSubmitEvent<Schema>
const isSuccessOrder = ref(false)
async function onSubmit() {
	const unMaskedPhone = state.phone?.replace(/\D/g, '') || ''

	const data: {
		phone: string
		products: { product_id: number; count: number }[]
		address?: string
	} = {
		phone: unMaskedPhone,
		products: [],
	}

	cartStore.cart.forEach(product => {
		data.products.push({
			product_id: product.product_id,
			count: product.quantity,
		})
	})

	let url = urls.orderPickup()
	if (state.requireAddress === 'true') {
		url = urls.orderDelivery()
		data.address = state.address
	}

	const res = await Service.post(url, locale.value, data, token.value)

	if (res.status === 200) {
		console.log(res)
		isSuccessOrder.value = true
		cartStore.cart = []
		setTimeout(() => {
			emits('success')
		}, 2000)
	}
}
</script>

<template>
	<div>
		<div v-if="!isSuccessOrder">
			<UTabs
				v-model:model-value="state.requireAddress"
				:items="orderTypes"
				class="w-full"
				color="warning"
			/>
			<UForm
				:schema="schema"
				:state="state"
				class="space-y-6 mt-6"
				@submit="onSubmit"
			>
				<UFormField name="phone" label="Telefo'n raqam" class="">
					<UInput
						v-model="state.phone"
						v-maska="'+998 ## ### ## ##'"
						class="w-full"
						size="xl"
					/>
				</UFormField>
				<UFormField
					v-if="state.requireAddress === 'true'"
					name="address"
					label="Manzil"
					class=""
				>
					<UInput v-model="state.address" class="w-full" size="xl" />
				</UFormField>
				<div class="flex">
					<button
						type="submit"
						class="flex items-center justify-center gap-2 bg-main border border-bg rounded-xl py-2.5 px-10 cursor-pointer group hover:bg-bg hover:border-main hover:text-text transition-colors text-white w-full"
					>
						Davom etish
					</button>
				</div>
			</UForm>
		</div>
		<div v-else>
			<p class="text-center text-text">
				Buyurtmangiz qabul qilindi tez orada operatorlarimiz siz bilan aloqaga
				chiqishadi
			</p>
		</div>
	</div>
</template>
