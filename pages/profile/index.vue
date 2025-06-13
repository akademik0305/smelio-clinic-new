<script setup lang="ts">
//===============================-< imports >-===============================
import * as z from 'zod'
// store
import { useAuthStore } from '~/store/auth.store'
// utils
import Service from '~/service/Service'
import urls from '~/service/urls'
const { locale } = useI18n()
const token = useToken()
const authStore = useAuthStore()

//===============================-< submit user data >-===============================
//> variables
const schemaUser = z.object({
	firstname: z
		.string({ required_error: 'Telefon raqamini kiriting' })
		.min(3, 'Telefon raqamini to`g`ri kiriting'),
	lastname: z.string({ required_error: 'Telefon raqamini kiriting' }),
	phone: z
		.string({ required_error: 'Telefon raqamini kiriting' })
		.min(17, 'Telefon raqamini to`g`ri kiriting'),
})

type SchemaUser = z.output<typeof schemaUser>
const stateUser = reactive<Partial<SchemaUser>>({
	firstname: '',
	lastname: '',
	phone: '+998',
})

//> functions
async function onSubmitUser() {
	const formdata = new FormData()
	const unMaskedPhone = stateUser.phone?.replace(/\D/g, '')
	formdata.append('phone', unMaskedPhone ?? '')
	formdata.append('firstname', stateUser.firstname ?? '')
	formdata.append('lastname', stateUser.lastname ?? '')
	const res = await Service.post(
		urls.signUp(),
		locale.value,
		formdata,
		token.value
	)

	console.log(res)
	if (res.status === 200) {
		console.log('success')
	}
}

//===============================-< on page load >-===============================
//> variables
//> functions
onMounted(() => {
	console.log(authStore.user)

	if (authStore.user?.firstname) {
		stateUser.firstname = authStore.user?.firstname || ''
		stateUser.lastname = authStore.user?.lastname || ''
		stateUser.phone = authStore.user?.username
	}
})
</script>

<template>
	<section class="py-10">
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
						{{ $t('personal_info') }}
					</h3>

					<UForm
						:schema="schemaUser"
						:state="stateUser"
						class="mt-8"
						@submit="onSubmitUser"
					>
						<div class="grid grid-cols-2 gap-4">
							<UFormField name="firstname" label="Ism" class="">
								<UInput
									v-model="stateUser.firstname"
									size="xl"
									class="w-full mx-auto flex justify-center"
								/>
							</UFormField>
							<UFormField name="lastname" label="Familiya" class="">
								<UInput
									v-model="stateUser.lastname"
									size="xl"
									class="w-full mx-auto flex justify-center"
								/>
							</UFormField>
							<UFormField label="Telefo'n raqam" name="phone">
								<UInput
									v-model="stateUser.phone"
									v-maska="'+998 ## ### ## ##'"
									class="w-full"
									size="xl"
								/>
							</UFormField>

							<div class="self-end">
								<button
									type="submit"
									class="flex items-center justify-center gap-2 bg-main border border-bg rounded-xl w-full text-white py-2.5 px-10 group hover:bg-bg hover:border-main hover:text-main transition-colors"
								>
									Saqlash
								</button>
							</div>
						</div>
					</UForm>
				</div>
			</div>
		</div>
	</section>
</template>
