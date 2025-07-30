<script setup lang="ts">
//=============================-< imports >-=================================
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";
//> useful
const { t } = useI18n();
//=============================- props -=================================
//variables
const props = defineProps({
	type: {
		type: String as PropType<"main" | "success" | "error">,
		default: "main",
	},
	isLoading: {
		type: Boolean,
		default: false,
	},
	text: {
		type: String,
		required: true,
	},
	isFull: {
		type: Boolean,
		defualt: true,
	},
});

const loadingText = ref(t("loading"));
onMounted(() => {});
</script>

<template>
	<button
		class="flex items-center justify-center rounded-xl px-6 py-2.5 text-center transition-colors duration-500 group gap-2 border text-white hover:bg-white"
		:class="[
			isFull ? ' w-full' : 'w-52',
			{ 'bg-main border-main hover:text-main': props.type === 'main' },
			{ 'bg-green border-green hover:text-green': props.type === 'success' },
			{ 'bg-red border-red hover:text-red': props.type === 'error' },
		]"
	>
		<slot />
		<Icon
			v-if="isLoading"
			name="line-md:loading-twotone-loop"
			class="w-6 h-6"
		/>
		<span class="text-md leading-6">
			{{ props.isLoading ? loadingText : props.text }}
		</span>
	</button>
</template>
