import { defineNuxtModule, addPlugin, createResolver, addServerPlugin } from '@nuxt/kit'
import sirv from 'sirv'
import initServer from './runtime/devtools/server/init'
export default defineNuxtModule({
  meta: {
    name: 'nuxt-hydration-checker'
  },
  defaults: {},
  setup (_, nuxt) {
    if (!nuxt.options.dev) { return }

    const resolver = createResolver(import.meta.url)

    addPlugin({ mode: 'client', src: resolver.resolve('./runtime/client/plugin') })

    nuxt.hook('vite:serverCreated', (server) => {
      server.middlewares.use('/__hydration_client', sirv(resolver.resolve('./client'), { single: true, dev: true }))
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push(
        { path: resolver.resolve('./runtime/types.d.ts') }
      )
    })

    addServerPlugin(resolver.resolve('./runtime/nitro'))
    initServer(nuxt)
  }
})
