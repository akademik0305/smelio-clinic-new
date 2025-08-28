<script setup lang="ts">
// props
const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
	},
	withSearch: {
		type: Boolean,
		default: false,
	},
});
// emits
const emit = defineEmits(["close"]);
// search
</script>
<template>
	<div
		class="fixed w-full h-svh z-50 top-0 left-0 transition-all duration-500"
		:class="[props.isOpen ? 'opacity-100 visible' : 'opacity-0 invisible']"
	>
		<!-- overlay -->
		<div
			class="absolute top-0 left-0 bg-gray-950/60 transition-all w-full h-full"
			@click="emit('close')"
		/>
		<!-- main -->
		<Transition name="modal">
			<div
				v-if="props.isOpen"
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto max-h-max w-full max-w-md bg-white overflow-visible transition-all duration-700 rounded-2xl"
			>
				<div class="absolute top-0 left-0 w-full h-full overflow-hidden">
					<div class="absolute -top-16 -left-10 bg-main w-28 h-28 rounded-full" />
					<!-- <div class="absolute top-32 -right-24 bg-main w-28 h-28 rounded-full" /> -->
				</div>
				<div
					class="p-6 pt-10 pb-4 rounded-t-2xl border-b border-b-border relative"
				>
					<slot name="header" />
					<button
						class="absolute top-3 right-3 w-7.5 h-7.5 flex items-center justify-center rounded-full bg-bg-soft cursor-pointer"
						@click="emit('close')"
					>
						<Icon
							name="i-heroicons-x-mark-20-solid"
							class="w-full h-full text-text text-md"
						/>
					</button>
				</div>
				<div class="p-8 pt-4 overflow-y-auto relative">
					<slot />
				</div>
			</div>
		</Transition>
	</div>
</template>
