<script setup lang="ts">
import type { IUser } from "~/types/users";

const store = useUserStore();
const user = computed(() => store.user as IUser);
</script>

<template>
  <main data-page="app.home">
    <p>Bonjour {{ user.firstName }}</p>
  </main>
</template>
