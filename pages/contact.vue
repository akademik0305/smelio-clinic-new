<script lang="ts" setup>
//===============================-< imports >-===============================
import { useI18n } from "vue-i18n";
import * as z from "zod";
import Service from "~/service/Service";
import urls from "~/service/urls";
import type { TSettings } from "~/types/api.types";
// //> utils
const { locale, t } = useI18n();
const token = useToken();
const toast = useToast();

//===============================-< get settings >-===============================
//> variables
const settings = ref<TSettings>();

//> functions

async function getSettings() {
	settings.value = await Service.get(
		urls.getSettings(),
		locale.value,
		token.value
	);
}

getSettings();

//===============================-< submit add >-===============================
//> variables
const schema = z.object({
	name: z.string({ required_error: "Ismni kiriting" }),
	phone: z
		.string({ required_error: t("enter_phone") })
		.min(17, t("wrong_number")),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	name: undefined,
	phone: "+998 ",
});

//> fuctions
interface IData {
	full_name: string | undefined;
	phone: string | undefined;
	team_id?: number;
	service_id?: number;
}

const form = useTemplateRef("form");
async function onSubmit() {
	const data: IData = {
		full_name: state.name,
		phone: state.phone?.replace(/[\s-]+/g, ""),
	};

	const res = await Service.post(
		urls.sendContact(),
		locale.value,
		data,
		token.value
	);
	if (res.status === 200) {
		toast.add({
			title: "Xabaringiz muvaffaqqiyali yuborildi",
			color: "success",
		});
		state.name = ""
		state.phone = "+998"
	} else {
		toast.add({
			title: "Qayta urinib ko'ring",
			color: "error",
		});
	}
}
</script>
<template>
	<main class="py-10">
		<section class="text-subtext relative">
			<div class="container px-5">
				<div class="flex flex-col md:flex-row">
					<div
						class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative"
					>
						<iframe
							width="100%"
							height="100%"
							class="absolute inset-0"
							title="map"
							src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3039.9419228630854!2d71.7761512!3d40.3658121!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb856e07d8c5d3%3A0x10577e00597fff0f!2sSmelio%20Stomatalogiya!5e0!3m2!1sru!2s!4v1756054859649!5m2!1sru!2s"
							style=""
						/>
						<div
							class="bg-white relative flex flex-wrap py-6 rounded shadow-md"
						>
							<div class="lg:w-1/2 px-6">
								<h2
									class="title-font font-semibold text-text tracking-widest text-xs"
								>
									Manzil
								</h2>
								<p class="mt-1">{{ settings?.data.address }}</p>
							</div>
							<div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
								<h4 class="font-semibold text-text tracking-widest text-xs">
									EMAIL
								</h4>
								<a class="text-indigo-500 leading-relaxed">{{
									settings?.data.email
								}}</a>
								<h2
									class="font-semibold text-text tracking-widest text-xs mt-4"
								>
									PHONE
								</h2>
								<p class="leading-relaxed">{{ settings?.data.phone }}</p>
							</div>
						</div>
					</div>
					<div
						class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-md p-4"
					>
						<h2 class="text-text text-lg mb-1 font-medium title-font">
							Bog'lanish
						</h2>
						<p class="leading-relaxed mb-5 text-subtext">
							Ushbu formadan foydalanib bizga e-mail jo'nating. Biz siz bilan
							tez orada bog'lanamiz.
						</p>
						<UForm
							ref="form"
							:schema="schema"
							:state="state"
							class="space-y-4 relative mb-4"
							@submit="onSubmit"
						>
							<UFormField label="Ism" name="name" class="">
								<UInput
									v-model="state.name"
									type="text"
									class="w-full"
									size="lg"
								/>
							</UFormField>

							<UFormField label="Telefon" name="phone" class="">
								<UInput
									v-model="state.phone"
									v-maska="'+998 ## ###-##-##'"
									type="text"
									class="w-full"
									size="lg"
								/>
							</UFormField>

							<div class="">
								<BaseButton text="Yuborish" is-full />
							</div>
						</UForm>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
