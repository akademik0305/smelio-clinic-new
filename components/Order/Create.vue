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

const props = defineProps({
	teamId: {
		type: Number,
		default: null,
	},
	serviceId: {
		type: Number,
		default: null,
	},
});

// emits
const emits = defineEmits(["success"]);

//===============================-< submit add >-===============================
//> variables
const schema = z.object({
	name: z.string({ required_error: t("enter_name") }),
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

	if (props.teamId) data.team_id = props.teamId;
	if (props.serviceId) data.service_id = props.serviceId;

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
		emits("success", data);
	} else {
		toast.add({
			title: "Qayta urinib ko'ring",
			color: "error",
		});
	}
}
</script>
<template>
	<div class="wrapper">
		<UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField :label="t('order_modal.name')" name="name" class="">
				<UInput v-model="state.name" type="text" class="w-full" size="lg" />
			</UFormField>

			<UFormField :label="t('order_modal.phone')" name="phone" class="">
				<UInput v-model="state.phone" v-maska="'+998 ## ###-##-##'" type="text" class="w-full" size="lg" />
			</UFormField>

			<div class="">
				<BaseButton :text="t('send')" is-full />
			</div>
		</UForm>
	</div>
</template>
