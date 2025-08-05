<script lang="ts" setup>
//===============================-< imports >-===============================
import { useI18n } from "vue-i18n";
import * as z from "zod";
//> useful
import Service from "~/service/Service";
import urls from "~/service/urls";
const toast = useToast();
const token = useToken();
const { locale, t } = useI18n();

// emits
const emits = defineEmits(["success"]);

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
const form = useTemplateRef("form");
async function onSubmit() {
	const data = {
		name: state.name,
		phone: state.phone?.replace(/[\s-]+/g, ""),
	};

  const res = {
    success: true
  }
	// const res = await Service.post(
	// 	urls.addCustomer(),
	// 	locale.value,
	// 	data,
	// 	token.value
	// );
	if (res.success) {
		toast.add({
			title: "Mijoz muvaffaqqiyatli qo'shildi",
			color: "success",
		});
		emits("success", data);
	} else {
		form.value?.setErrors([
			{
				name: "phone",
				message: "Bu raqam tizimda mavjud, boshqa raqam kiriting",
			},
		]);
	}
}
</script>
<template>
	<div class="wrapper">
		<UForm
			ref="form"
			:schema="schema"
			:state="state"
			class="space-y-4"
			@submit="onSubmit"
		>
			<UFormField label="Ism" name="name" class="">
				<UInput v-model="state.name" type="text" class="w-full" size="lg" />
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
				<BaseButton text="Yuborish" is-full/>
			</div>
		</UForm>
	</div>
</template>
