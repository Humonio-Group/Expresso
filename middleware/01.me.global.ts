export default defineNuxtRouteMiddleware(async () => {
  const store = useUserStore();
  const { user } = storeToRefs(store);

  if (user.value) return;

  await store.getMe();
});
