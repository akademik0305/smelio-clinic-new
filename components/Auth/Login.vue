<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

// emits
const emits = defineEmits(['success'])

//===============================-< submit number >-===============================
//> variables
const formType = ref<'phone' | 'code' | 'name'>('phone')
const schema = z.object({
	phone: z
		.string({ required_error: 'Telefon raqamini kiriting' })
		.min(17, 'Telefon raqamini to`g`ri kiriting'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	phone: '+998',
})

// function
async function onSubmit(event: FormSubmitEvent<Schema>) {
	console.log(state.phone?.length, event)
	formType.value = 'code'
	// emits('success')
}

//===============================-< submit code >-===============================
//> variables
//> functions
const schemaCode = z.object({
	code: z
		.array(z.string(), { required_error: 'Kodni kiriting' })
		.length(5, { message: 'Kod aniq 5 belgidan iborat bo‘lishi kerak' }),
})

type SchemaCode = z.output<typeof schemaCode>
const stateCode = reactive<Partial<SchemaCode>>({
	code: undefined,
})

async function onSubmitCode(event: FormSubmitEvent<SchemaCode>) {
	console.log(stateCode.code?.length, event)
	// emits('success')
	// formType.value = 'name'
}
</script>

<template>
	<div>
		<!-- phone -->
		<UForm
			v-if="formType === 'phone'"
			:schema="schema"
			:state="state"
			class="space-y-6"
			@submit="onSubmit"
		>
			<UFormField label="Telefo'n raqam" name="phone">
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
					Davom etish
				</button>
			</div>
		</UForm>
		<!-- code -->
		<UForm
			v-if="formType === 'code'"
			:schema="schemaCode"
			:state="stateCode"
			class="space-y-6"
			@submit="onSubmitCode"
		>
			<UFormField
				name="code"
				label="Raqamga kod yuborildi"
				class="text-center justify-center"
			>
				<p class="my-2 font-medium text-text text-lg">+998 33 312 31 23</p>
				<UPinInput
					v-model="stateCode.code"
					size="lg"
					class="w-full mx-auto flex justify-center"
				/>
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
</template>
