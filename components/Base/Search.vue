<script lang="ts" setup>
// props
const props = defineProps({
	placeholder: {
		type: String,
		default: 'Search...',
	},
})
// emits
const emit = defineEmits(['change-value'])
</script>
<template>
	<div
		class="flex items-center gap-4 bg-bg-soft py-3 px-4 rounded-xl border border-border transition-colors has-focus:border-main"
	>
		<UIcon name="i-lucide-search" class="text-xl" />
		<label for="search" class="w-full block px-2">
			<input
				id="search"
				type="search"
				name="search"
				class="w-full text-text has"
				:placeholder="props.placeholder"
				@input="emit('change-value', $event)"
			/>
		</label>
	</div>
</template>
