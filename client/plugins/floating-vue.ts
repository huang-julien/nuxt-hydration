import FloatingVue from 'floating-vue'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue, {
    themes: {
      dropdown: {
        $resetCss: true
      }
    }
  })
})
