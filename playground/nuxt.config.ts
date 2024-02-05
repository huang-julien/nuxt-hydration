import { fileURLToPath } from 'url'
const projectRoot = fileURLToPath(new URL('../', import.meta.url))

export default defineNuxtConfig({
  modules: ['../src/module', 'nuxt-icon', '@nuxtjs/html-validator'],
  devtools: {
    enabled: true
  },
  alias: {
    'nuxt-hydration': projectRoot
  }
})
