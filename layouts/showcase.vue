<script setup lang="ts">
const store = useUserStore();
</script>

<template>
  <div
    data-layout="showcase"
    class="px-6"
  >
    <div class="w-[min(1240px,100%)] mx-auto">
      <header class="h-16 flex items-center justify-between">
        <p class="font-bold">
          expresso.
        </p>

        <div v-if="store.loggedIn">
          <Button as-child>
            <NuxtLinkLocale to="/app">
              {{ $t("btn.go-to-app") }}
            </NuxtLinkLocale>
          </Button>
        </div>
        <div v-else>
          <Button
            variant="link"
            class="!text-foreground"
            as-child
          >
            <NuxtLinkLocale to="/auth/login">
              {{ $t("btn.sign-in") }}
            </NuxtLinkLocale>
          </Button>
          <Button as-child>
            <NuxtLinkLocale to="/auth/register">
              {{ $t("btn.sign-up") }}
            </NuxtLinkLocale>
          </Button>
        </div>
      </header>

      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>

</style>
