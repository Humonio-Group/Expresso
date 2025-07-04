import type { TNull } from "~/types/globals";
import type { IUser, IUserCreate } from "~/types/users";
import { toast } from "vue-sonner";

interface UserState {
  user: TNull<IUser>;
  loading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    loading: false,
  }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,
    loggedIn: state => !!state.user,
  },
  actions: {
    async getMe() {
      try {
        const { data } = await useFetch<IUser>("/api/account/me");
        if (!data.value) return;
        this.user = data.value;
      }
      catch {
        this.user = null;
      }
    },
    async register(body: IUserCreate): Promise<boolean> {
      this.loading = true;
      let state = true;

      try {
        const user = await $fetch<IUser>("/api/account/register", {
          method: "POST",
          body,
        });

        this.user = user;
        toast.success(this.translate("register.toasts.welcome", { name: user.firstName }));
      }
      catch {
        state = false;
        toast.error(this.translate("register.toasts.email-conflict"));
      }
      finally {
        this.loading = false;
      }

      return state;
    },
    async login(body: { email: string; password: string }): Promise<boolean> {
      this.loading = true;
      let state = true;

      try {
        const user = await $fetch<IUser>("/api/account/login", {
          method: "POST",
          body,
        });

        this.user = user;
        toast.success(this.translate("login.toasts.welcome", { name: user.firstName }));
      }
      catch {
        state = false;
        toast.error(this.translate("login.toasts.wrong-credentials"));
      }
      finally {
        this.loading = false;
      }

      return state;
    },
  },
});
