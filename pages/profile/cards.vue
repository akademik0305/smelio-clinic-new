<script setup lang="ts">
//===============================-< imports >-===============================
// utils
import Service from '~/service/Service'
import urls from '~/service/urls'
import type { TCards } from '~/types/api.types'
const { locale, t } = useI18n()
const token = useToken()
const toast = useToast()

//===============================-< get cards >-===============================
//> variables
const cards = ref<TCards[]>()
//> functions
async function getCards() {
	const res = await Service.get<TCards[]>(
		urls.getCards(),
		locale.value,
		token.value
	)
	cards.value = res.data
}

getCards()

// format card number
function formatCardNumber(cardNumber: string) {
	const cleanedNumber = cardNumber.replace(/\D/g, '')
	return cleanedNumber.replace(/(\d{4})(?=\d)/g, '$1 ')
}

// copy to clipboard
function copyToClipboard(text: string) {
	navigator.clipboard.writeText(text)
	toast.add({
		title: t('card_number_copied'),
		color: 'success',
	})
}

//===============================-< on page load >-===============================
//> variables
//> functions
onMounted(() => {})
</script>

<template>
	<main class="py-10">
		<div class="container max-w-7xl mx-auto px-4 flex-1 flex flex-col">
			<div
				class="flex items-stretch justify-start gap-5 flex-1 flex-col md:flex-row"
			>
				<!-- sidebar start -->
				<profile-sidebar />
				<!-- sidebar end -->

				<div
					class="bg-white border border-border rounded-2xl p-7 flex-1 w-full"
				>
					<h3 class="font-semibold text-xl text-pr-text">
						{{ $t('company_cards') }}
					</h3>
					<div
						class="mt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4"
					>
						<div
							v-for="card in cards"
							:key="card.id"
							class="bg-main rounded-2xl shadow-modal p-6"
						>
							<div class="">
								<p class="text-sm">{{ $t('card_name') }}</p>
								<h4
									class="mt-1 text-lg md:text-xl lg:text-lg xl:text-xl text-text"
								>
									{{ card.card_name }}
								</h4>
							</div>
							<div class="mt-6">
								<p class="text-sm">{{ $t('card_number') }}</p>
								<div class="flex items-center gap-2">
									<h4
										class="mt-1 text-lg md:text-2xl lg:text-lg xl:text-2xl text-text"
									>
										{{ formatCardNumber(card.card_number) }}
									</h4>
									<button
										class="w-4 h-4 text-text hover:text-white transition-colors"
										@click="copyToClipboard(card.card_number)"
									>
										<UIcon name="mynaui:copy" class="text-base" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
