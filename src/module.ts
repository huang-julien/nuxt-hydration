import { defineNuxtModule, addPlugin, createResolver, addServerPlugin, addBuildPlugin, addTemplate } from '@nuxt/kit'
import sirv from 'sirv'
import defu from 'defu'
import initServer from './runtime/devtools/server/init'
import { SFCComponentHydrationPlugin } from './plugins/component-hydration'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-hydration-checker'
  },
  defaults: {},
  setup (_, nuxt) {
    if (!nuxt.options.dev) { return }

    const resolver = createResolver(import.meta.url)

    addPlugin({ mode: 'client', src: resolver.resolve('./runtime/client/plugin') })

    addBuildPlugin(SFCComponentHydrationPlugin)

    addTemplate({
      filename: 'nuxt-hydration-composables.mjs',
      src: resolver.resolve('./runtime/client/composables/component-hydration.mjs')
    })

    nuxt.hook('vite:serverCreated', (server) => {
      server.middlewares.use('/__hydration_client', sirv(resolver.resolve('./client'), { single: true, dev: true }))
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push(
        { path: resolver.resolve('./runtime/types.d.ts') }
      )
    })

    // @ts-expect-error @nuxtjs/html-validator integration
    nuxt.options.htmlValidator = defu(nuxt.options.htmlValidator, { hookable: true })

    addServerPlugin(resolver.resolve('./runtime/nitro'))
    initServer(nuxt)
  }
})
