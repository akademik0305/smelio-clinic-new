import type { TUser } from "~/types/auth.type";

export const useAuthStore = defineStore(
	"authStore",
	() => {
		const user = ref<TUser | null>(null);

		function logOut() {
			user.value = null
		}

		return {
			user,
			logOut
		};
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.sessionStorage(),
		},
	}
);
