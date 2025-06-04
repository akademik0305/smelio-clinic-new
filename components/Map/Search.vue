<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TPlace } from '~/types/map.types'

// props
const props = defineProps({
	places: {
		type: Object as PropType<TPlace[]>,
		required: true,
	},
})
// emit
const emit = defineEmits(['goto-place'])
</script>
<template>
	<div class="addresses" style="height: calc(100svh - 100px)">
		<section class="px-4 py-4">
			<article
				v-for="place in props.places"
				:key="place.display_name"
				class="flex items-center gap-4 mt-4 first:mt-0"
				@click="emit('goto-place', place)"
			>
				<div class="w-6 h-6 shrink-0 flex items-center justify-center">
					<UIcon
						name="ph:map-pin-light"
						class="w-full h-full text-2xl text-black"
					/>
				</div>
				<div>
					<!-- {{ place }} -->
					<h4 class="font-inter font-medium text-lg">{{ place.name }}</h4>
					<p class="font-inter text-sm">
						<!-- <span>Savdo markazi</span> -->
						{{ place.display_name }}
					</p>
					<!-- <p class="font-inter text-sm">989.3m</p> -->
				</div>
			</article>
		</section>
	</div>
</template>
<style></style>
