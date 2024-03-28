// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,

  modules: [
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
  ],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      bucketURL: process.env.BUCKET_URL,
    },
  },
  devtools: { enabled: true },
});
