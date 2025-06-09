<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

// emits
const emits = defineEmits(['success'])

//===============================-< submit number >-===============================
//> variables
//> functions
const schema = z.object({
	code: z
		.array(z.string({ required_error: 'Yuborilgan kodni kiriting' }))
		.min(5, 'Kod xato kiritildi'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	code: [],
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
	console.log(state.code?.length, event)
	emits('success')
}
</script>

<template>
	<UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
		<UFormField label="Telefo'n raqam" name="phone">
			<UPinInput v-model="state.code" />
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
</template>
