<script lang="ts" setup></script>
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
							src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
							style="filter: grayscale(1) contrast(1.2) opacity(0.4)"
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
								<p class="mt-1">Bu yerga manzil kiritiladi</p>
							</div>
							<div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
								<h4 class="font-semibold text-text tracking-widest text-xs">
									EMAIL
								</h4>
								<a class="text-indigo-500 leading-relaxed">smelioclinic.gmail.com</a>
								<h2
									class="font-semibold text-text tracking-widest text-xs mt-4"
								>
									PHONE
								</h2>
								<p class="leading-relaxed">+998 33 180 10 08</p>
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
						<div class="relative mb-4">
							<label for="name" class="leading-7 text-sm text-subtext"
								>Ism</label
							>
							<input
								type="text"
								id="name"
								name="name"
								class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
						<div class="relative mb-4">
							<label for="email" class="leading-7 text-sm text-subtext"
								>Email</label
							>
							<input
								type="email"
								id="email"
								name="email"
								class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
						<div class="relative mb-4">
							<label for="message" class="leading-7 text-sm text-subtext"
								>Xabar</label
							>
							<textarea
								id="message"
								name="message"
								class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
							/>
						</div>
						<button
							class="relative h-auto w-auto py-1.5 px-6 overflow-hidden border border-main text-main shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-main before:duration-300 before:ease-out hover:text-white hover:shadow-main hover:before:h-full hover:before:w-full hover:before:opacity-80 rounded-md"
						>
							<span class="relative z-10">Yuborish</span>
						</button>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
