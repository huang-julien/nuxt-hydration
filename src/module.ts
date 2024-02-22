import { defineNuxtModule, addPlugin, createResolver, addServerPlugin, addBuildPlugin, addTemplate, installModule } from '@nuxt/kit'
import defu from 'defu'
import { SFCComponentHydrationPlugin } from './plugins/component-hydration'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-hydration'
  },
  defaults: {},
  async setup (_, nuxt) {
    if (!nuxt.options.dev) { return }

    const resolver = createResolver(import.meta.url)

    addPlugin({ mode: 'client', src: resolver.resolve('./runtime/client/plugin') })

    addBuildPlugin(SFCComponentHydrationPlugin)

    addTemplate({
      filename: 'nuxt-hydration-composables.ts',
      src: await resolver.resolvePath('./runtime/composables/component-hydration')
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push(
        { path: resolver.resolve('./runtime/types.d.ts') }
      )
    })
    await installModule(await resolver.resolvePath('@unocss/nuxt'))
  }
})
