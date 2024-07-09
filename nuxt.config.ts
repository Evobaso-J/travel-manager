// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
  ],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  eslint: {
    config: {
      stylistic: true,
    },
    checker: true,
  },

  srcDir: 'src/',
  serverDir: 'server',
  ssr: false,
  compatibilityDate: '2024-07-04',
})
