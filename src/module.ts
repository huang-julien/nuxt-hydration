import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import sirv from 'sirv'
import initServer from './runtime/devtools/init'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-hydration-checker'
  },
  defaults: {},
  setup (_, nuxt) {
    if (!nuxt.options.dev) { return }

    const resolver = createResolver(import.meta.url)

    addPlugin({ mode: 'client', src: resolver.resolve('./runtime/plugin') })

    nuxt.hook('vite:serverCreated', (server) => {
      server.middlewares.use('/__hydration_client', sirv(resolver.resolve('./client'), { single: true, dev: true }))
    })

    initServer(nuxt)
  }
})
