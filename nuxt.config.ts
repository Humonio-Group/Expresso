// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    environment: "",
  },
  compatibilityDate: "2025-05-15",
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
  },
  googleFonts: {
    families: {
      Montserrat: {
        ital: "100..900",
        wght: "100..900",
      },
    },
  },
  i18n: {
    defaultLocale: "fr",
    locales: [
      {
        code: "fr",
        iso: "fr-FR",
        name: "Français",
        file: "fr.json",
      },
    ],
    strategy: "prefix_except_default",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
