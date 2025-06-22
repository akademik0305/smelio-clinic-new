<script lang="ts" setup>
//===============================-< imports >-===============================
//> variables
//> functions
import * as z from 'zod'
// import type { FormSubmitEvent } from '@nuxt/ui'
// utils
import Service from '~/service/Service'
import urls from '~/service/urls'
const { locale, t } = useI18n()
const token = useToken()

// emits
const emits = defineEmits(['success'])

//===============================-< submit number >-===============================
//> variables
const formType = ref<'phone' | 'code' | 'name'>('phone')
const schema = z.object({
	phone: z
		.string({ required_error: t('enter_phone') })
		.min(17, t('wrong_number')),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	phone: '+998',
})

// function event: FormSubmitEvent<Schema>
async function onSubmit() {
	const formdata = new FormData()
	const unMaskedPhone = state.phone?.replace(/\D/g, '')
	formdata.append('phone', unMaskedPhone ?? '')
	const res = await Service.post(
		urls.sendPhone(),
		locale.value,
		formdata,
		token.value
	)

	if (res.status === 200) {
		formType.value = 'code'
		startTimer(120)
	}
}

//=============================- coutdown -=================================
//variables
const isTimeOver = ref(false)
let timeInSecs: number
let ticker: ReturnType<typeof setInterval>
const pretty = ref('02:00')

//functions
function startTimer(secs: number) {
	timeInSecs = secs
	ticker = setInterval(tick, 1000)
}

function tick() {
	let secs = timeInSecs
	if (secs > 0) {
		timeInSecs--
	} else {
		clearInterval(ticker)
		// startTimer(20); // 4 minutes in seconds
		isTimeOver.value = true
	}

	const mins = Math.floor(secs / 60)
	secs %= 60
	pretty.value =
		(mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs
}

//===============================-< submit code >-===============================
//> variables
const schemaCode = z.object({
	code: z
		.array(z.string(), { required_error: t('enter_code') })
		.length(4, { message: t('wrong_code') }),
})

type SchemaCode = z.output<typeof schemaCode>
const stateCode = reactive<Partial<SchemaCode>>({
	code: undefined,
})

const codeForm = useTemplateRef('codeForm')
//> functions
async function onSubmitCode() {
	const formdata = new FormData()
	const unMaskedPhone = state.phone?.replace(/\D/g, '')
	formdata.append('phone', unMaskedPhone ?? '')
	formdata.append('code', stateCode.code?.join('') ?? '')
	const res = await Service.post(
		urls.verifyCode(),
		locale.value,
		formdata,
		token.value
	)

	if (res.status === 200) {
		if (!res.data) {
			formType.value = 'name'
		} else {
			emits('success', res.data)
		}
	} else {
		console.log('code error')
		codeForm.value?.setErrors([
			{
				name: 'code',
				message: t('code_error'),
			},
		])
	}
}

//===============================-< submit user data >-===============================
//> variables
const schemaUser = z.object({
	firstname: z
		.string({ required_error: t('enter_name') })
		.min(3, t('wrong_name')),
	lastname: z.string({ required_error: t('enter_lastname') }),
})

type SchemaUser = z.output<typeof schemaUser>
const stateUser = reactive<Partial<SchemaUser>>({
	firstname: '',
	lastname: '',
})

//> functions
async function onSubmitUser() {
	const formdata = new FormData()
	const unMaskedPhone = state.phone?.replace(/\D/g, '')
	formdata.append('phone', unMaskedPhone ?? '')
	formdata.append('code', stateCode.code?.join('') ?? '')
	formdata.append('firstname', stateUser.firstname ?? '')
	formdata.append('lastname', stateUser.lastname ?? '')
	const res = await Service.post(
		urls.signUp(),
		locale.value,
		formdata,
		token.value
	)

	if (res.status === 200) {
		emits('success', res.data)
	}
}
</script>

<template>
	<div class="">
		<!-- phone -->
		<UForm
			v-if="formType === 'phone'"
			:schema="schema"
			:state="state"
			class="space-y-6"
			@submit="onSubmit"
		>
			<UFormField :label="$t('phone_number')" name="phone">
				<UInput
					v-model="state.phone"
					v-maska="'+998 ## ### ## ##'"
					class="w-full"
					size="xl"
				/>
			</UFormField>

			<div class="flex">
				<button
					type="submit"
					class="flex items-center justify-center gap-2 bg-main border border-bg rounded-xl py-2.5 px-10 cursor-pointer group hover:bg-bg hover:border-main hover:text-text transition-colors text-white w-full"
				>
					{{ $t('continue') }}
				</button>
			</div>
		</UForm>
		<!-- code -->
		<UForm
			v-if="formType === 'code'"
			ref="codeForm"
			:schema="schemaCode"
			:state="stateCode"
			class="space-y-6"
			@submit="onSubmitCode"
		>
			<UFormField
				name="code"
				:label="$t('enter_code')"
				class="text-center justify-center"
			>
				<p class="my-2 font-medium text-text text-lg">{{ state.phone }}</p>
				<UPinInput
					v-model="stateCode.code"
					size="xl"
					:length="4"
					class="w-full mx-auto flex justify-center"
				/>
			</UFormField>

			<div class="flex justify-center mt-5">
				<button v-if="isTimeOver" class="font-medium" @click="onSubmit">
					{{ $t('resend_code') }}
				</button>
				<p v-else>{{ pretty }}</p>
			</div>

			<div class="flex">
				<button
					type="submit"
					class="flex items-center justify-center gap-2 bg-main border border-bg rounded-xl py-2.5 px-10 cursor-pointer group hover:bg-bg hover:border-main hover:text-text transition-colors text-white w-full"
				>
					{{ $t('continue') }}
				</button>
			</div>
		</UForm>
		<!-- user data -->
		<UForm
			v-if="formType === 'name'"
			:schema="schemaUser"
			:state="stateUser"
			class="space-y-6"
			@submit="onSubmitUser"
		>
			<UFormField name="firstname" :label="$t('firstname')" class="">
				<UInput
					v-model="stateUser.firstname"
					size="xl"
					class="w-full mx-auto flex justify-center"
				/>
			</UFormField>
			<UFormField name="lastname" :label="$t('lastname')" class="">
				<UInput
					v-model="stateUser.lastname"
					size="xl"
					class="w-full mx-auto flex justify-center"
				/>
			</UFormField>

			<div class="flex">
				<button
					type="submit"
					class="flex items-center justify-center gap-2 bg-main border border-bg rounded-xl py-2.5 px-10 cursor-pointer group hover:bg-bg hover:border-main hover:text-text transition-colors text-white w-full"
				>
					{{ $t('continue') }}
				</button>
			</div>
		</UForm>
	</div>
</template>
