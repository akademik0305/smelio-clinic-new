<script setup>
//===============================-< imports >-===============================
import Service from '~/service/Service'
import urls from '~/service/urls'
const { locale } = useI18n()
const localePath = useLocalePath()
//===============================-< get contact >-===============================
//> variables
const contact = ref()
//> functions
async function getContact() {
	const res = await Service.get(urls.getContactInfo(), locale.value, null)
	contact.value = res.data
}

getContact()

watch(locale, () => {
	getContact()
})
</script>
<template>
	<!-- footer -->
	<footer class="footer border-t border-border bg-navbar-bg py-8">
		<div class="container">
			<div class="flex flex-col md:flex-row items-start justify-between gap-6">
				<div class="flex flex-col gap-3 w-full md:w-1/2">
					<NuxtLink :to="localePath('/')" class="block max-w-28">
						<img
							src="~/assets/images/logo/logo-nobg.png"
							alt="logo"
							class="w-full h-full object-cover"
						/>
					</NuxtLink>
					<p class="font-inter text-gray-600">
						<!-- {{ contact?.description }} -->
						🦷 Smelio Clinic — sizning sog‘lom tabassumingiz kafolati. Zamonaviy
						uskunalar va yuqori malakali shifokorlar jamoasi bilan xizmat
						ko‘rsatamiz. Klinikamizda tish davolash, oqartirish, implantatsiya
						va estetik xizmatlar mavjud.
					</p>
				</div>

				<div class="flex flex-col gap-3">
					<h4>{{ $t('contact') }}</h4>
					<div class="flex items-center gap-2">
						<a
							v-if="contact?.instagram_url"
							href="https://www.instagram.com/p/DL99vZpN23v/"
							target="_blank"
						>
							<UIcon
								name="hugeicons:instagram"
								class="text-xl text-gray-500 hover:text-main transition"
							/>
						</a>
						<a v-if="contact?.facebook_url" href="#" target="_blank">
							<UIcon
								name="circum:facebook"
								class="text-xl text-gray-500 hover:text-main transition"
							/>
						</a>
						<a v-if="contact?.telegram_url" href="#" target="_blank">
							<UIcon
								name="hugeicons:telegram"
								class="text-xl text-gray-500 hover:text-main transition"
							/>
						</a>
						<a v-if="contact?.youtube_url" href="#" target="_blank">
							<UIcon
								name="hugeicons:youtube"
								class="text-xl text-gray-500 hover:text-main transition"
							/>
						</a>
					</div>
					<a
						:href="`mailto:smelioclinic.gmail.com`"
						class="text-gray-500 font-inter hover:text-main transition-all"
						>{{ $t('email') }}: smelioclinic.gmail.com</a
					>
					<a
						:href="`tel:+998 33 180 10 08`"
						class="text-gray-500 font-inter hover:text-main transition-all"
						>{{ $t('phone') }}: +998 33 180 10 08</a
					>
					<a
						:href="`https://maps.app.goo.gl/xesCLfjJVR1gFbmcA`"
						target="_blank"
						class="text-gray-500 font-inter hover:text-main transition-all"
						>{{ $t('address') }}:  Smelio Clinic </a
					>
				</div>
				<div class="w-full max-w-72 rounded-md overflow-hidden">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.756800690699!2d69.23431717643692!3d41.31415400053402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba126df1961%3A0x8303adc34f63582f!2z0JzQtdC00LjQsNC_0LDRgNC6IFFvcmF0b3No!5e0!3m2!1sru!2s!4v1752594166251!5m2!1sru!2s"
						title="map"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					/>
				</div>
				<!-- <div class="flex flex-col gap-3">
					<h4>{{ $t('contact') }}</h4>
					<div class="flex items-center gap-2">
						<a
							v-if="contact?.instagram_url"
							:href="contact?.instagram_url"
							target="_blank"
						>
							<UIcon
								name="hugeicons:instagram"
								class="text-xl text-gray-500 hover:text-main transition"
							/>
						</a>
						<a
							v-if="contact?.facebook_url"
							:href="contact?.facebook_url"
							target="_blank"
						>
							<UIcon
								name="circum:facebook"
								class="text-xl text-gray-500 hover:text-main transition"
							/>
						</a>
						<a
							v-if="contact?.telegram_url"
							:href="contact?.telegram_url"
							target="_blank"
						>
							<UIcon
								name="hugeicons:telegram"
								class="text-xl text-gray-500 hover:text-main transition"
							/>
						</a>
						<a
							v-if="contact?.youtube_url"
							:href="contact?.youtube_url"
							target="_blank"
						>
							<UIcon
								name="hugeicons:youtube"
								class="text-xl text-gray-500 hover:text-main transition"
							/>
						</a>
					</div>
					<a
						:href="`mailto:${contact?.email}`"
						class="text-gray-500 font-inter hover:text-main transition-all"
						>{{ $t('email') }}: {{ contact?.email }}</a
					>
					<a
						:href="`tel:${contact?.phone}`"
						class="text-gray-500 font-inter hover:text-main transition-all"
						>{{ $t('phone') }}: {{ contact?.phone }}</a
					>
				</div> -->
			</div>

			<div
				class="border-t border-t-gray-200 mt-6 pt-6 text-center font-inter text-gray-600 text-sm"
			>
				© {{ new Date().getFullYear() }} .{{ $t('footer_copy') }}
			</div>
		</div>
	</footer>
	<!-- footer -->
</template>
