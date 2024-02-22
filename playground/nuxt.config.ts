import { fileURLToPath } from 'url'
const projectRoot = fileURLToPath(new URL('../', import.meta.url))

export default defineNuxtConfig({
  modules: ['nuxt-hydration', 'nuxt-icon', '@nuxtjs/html-validator'],
  devtools: {
    enabled: true
  },
})
