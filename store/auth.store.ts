import type { TUser } from "~/types/auth.type";

export const useAuthStore = defineStore(
	"authStore",
	() => {
		const user = ref<TUser>();

		return {
			user,
		};
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.sessionStorage(),
		},
	}
);
