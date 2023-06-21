import { resolve } from 'pathe'

export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools-ui-kit',
    'nuxt-icon',
    '@nuxtjs/tailwindcss'
  ],
  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client')
    }
  },
  devServer: {
    port: 4000
  },
  vite: {
    build: {
      target: 'esnext'
    }
  },
  app: {
    baseURL: '/__hydration_client'
  },
  ssr: false,
  vite: {
    vue: {
      script: {
        defineModel: true
      }
    }
  }
})
