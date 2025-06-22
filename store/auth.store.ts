import type { TUser } from "~/types/auth.type";

export const useAuthStore = defineStore(
	"authStore",
	() => {
		const user = ref<TUser | null>(null);
		const isLogged = ref(false)

		function logOut() {
			user.value = null
			isLogged.value = false
		}

		return {
			user,
			isLogged,
			logOut
		};
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.localStorage(),
			key: 'rm-auth'
		},
	}
);
