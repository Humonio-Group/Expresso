export default defineNuxtRouteMiddleware((to) => {
  const store = useUserStore();
  const { user } = storeToRefs(store);

  const isLogin = to.path.includes("/auth");
  const isApp = to.path.includes("/app");

  if (isLogin && user.value) return navigateTo(useLocalePath()("/app"));
  if (isApp && !user.value) return navigateTo(useLocalePath()("/auth/login"));
});
