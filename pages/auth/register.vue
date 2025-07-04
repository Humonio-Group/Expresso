<script setup lang="ts">
import { Eye, EyeClosed } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { toast } from "vue-sonner";

const { t } = useI18n();

definePageMeta({
  layout: "authentication",
});

const store = useUserStore();
const showPassword = ref<boolean>(false);

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  })),
});
const submit = handleSubmit(async (values) => {
  const state = await store.register(values);

  if (!state) {
    resetForm();
    return;
  }

  navigateTo(useLocalePath()("/app"));
});
</script>

<template>
  <Card class="w-[min(368px,100%)]">
    <CardHeader>
      <CardTitle>{{ $t("register.title") }}</CardTitle>
    </CardHeader>

    <form
      class="grid gap-6"
      @submit="submit"
    >
      <CardContent class="grid gap-4">
        <FormField
          v-slot="{ componentField }"
          name="firstName"
        >
          <FormItem>
            <FormLabel>{{ $t("labels.first-name") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="ex. John" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="lastName"
        >
          <FormItem>
            <FormLabel>{{ $t("labels.last-name") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="ex. DOE" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ $t("labels.email") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="email"
                placeholder="ex. john.doe@example.com"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem>
            <FormLabel>{{ $t("labels.password") }}</FormLabel>
            <FormControl>
              <div class="relative">
                <Input
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="················"
                  v-bind="componentField"
                />
                <Button
                  type="button"
                  tabindex="0"
                  size="icon"
                  variant="ghost"
                  class="absolute top-0.5 right-0.5 size-8"
                  @click="showPassword = !showPassword"
                >
                  <EyeClosed v-if="showPassword" />
                  <Eye v-else />
                </Button>
              </div>
            </FormControl>
          </FormItem>
        </FormField>
      </CardContent>

      <CardFooter class="flex flex-col gap-1 items-center">
        <Button type="submit">
          {{ $t("register.create-account") }}
        </Button>
        <Button
          type="button"
          variant="link"
          class="!text-foreground"
          as-child
        >
          <NuxtLinkLocale to="/auth/login">
            {{ $t("register.have-account") }}
          </NuxtLinkLocale>
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
