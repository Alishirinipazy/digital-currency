// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "https://api.coincap.io/v2/markets/"
    }
  },
  compatibilityDate: '2024-04-03',
  css:['~/assets/css/main.css'],
  devtools: { enabled: false }
})
