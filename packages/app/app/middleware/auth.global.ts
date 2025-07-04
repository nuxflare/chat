export default defineNuxtRouteMiddleware(async (to) => {
  if (
    to.path.startsWith("/api") ||
    to.path.startsWith("/login") ||
    to.path.startsWith("/clientId")
  )
    return;
  const { redirect, sessionState } = useAuth();

  const fetchSession = async () => {
    try {
      const time = new Date().getTime();
      const user = await $fetch("/api/auth/session", {
        credentials: "same-origin",
      });
      sessionState.value = { time, user };
    } catch {}
  };

  if (
    !sessionState.value.time ||
    new Date().getTime() - sessionState.value.time >
      useRuntimeConfig().public.sessionInterval
  ) {
    const sessionPromise = fetchSession();
    if (!sessionState.value.user?.id) await sessionPromise;
  }
  if (import.meta.server || sessionState.value.user?.id) {
    return;
  }
  sessionState.value = {};
  redirect.value = to.path;
  return navigateTo("/login");
});
