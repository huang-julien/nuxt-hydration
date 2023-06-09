export default defineNuxtConfig({
  modules: ['../src/module', 'nuxt-icon', '@nuxtjs/html-validator'],
  devtools: {
    enabled: true
  },
  nitro: {
    devProxy: {
      '/__hydration_client': {
        target: 'http://localhost:4000/__hydration_client',
        ws: true
      }
    }
  }
})
