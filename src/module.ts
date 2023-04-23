import { defineNuxtModule, addPlugin, createResolver, addDevServerHandler } from '@nuxt/kit'
import sirv from "sirv" 
import {defineEventHandler, readBody} from "h3"
import { extendServerRpc, onDevToolsInitialized, addCustomTab } from '@nuxt/devtools-kit'
import { ClientFunctions, ServerFunctions } from './types'
import { BirpcGroup } from 'birpc'
import { RPC_NAMESPACE } from './utils'

const data: Record<string, number> = {}

export default defineNuxtModule({
  meta: {
    name: 'nuxt-hydration-checker'
  },
  defaults: {},
  setup(_, nuxt) {
    if (!nuxt.options.dev) return

    const resolver = createResolver(import.meta.url)

    addPlugin({ mode: 'client', src: resolver.resolve('./runtime/plugin') })

    nuxt.hook('vite:serverCreated', (server) => {
      server.middlewares.use('/__hydration_client', sirv(resolver.resolve('../dist/client'), { single: true, dev: true }))
    })

    let rpc: BirpcGroup<ClientFunctions, ServerFunctions>
 
    onDevToolsInitialized(() => {
        rpc = extendServerRpc<ClientFunctions, ServerFunctions>(RPC_NAMESPACE, {
        updateStats(route: string) {
          data[route] = data[route] || 0
          data[route]++

          rpc.broadcast.updateData({
            routes: data
          })
        },
        getStats() {
          return {
            routes: data
          }
        }
      })

      
      addCustomTab({
        name: 'nuxt-hydration-checker',
        title: 'Hydration',
        icon: 'material-symbols:water-drop-rounded',
        view: {
          type: 'iframe',
          src: '/__hydration_client',
        },
      })
    })
    
    addDevServerHandler({
      route: '/__hydration_ping',
      handler: defineEventHandler( async (evt) => {
        const {route} = await readBody<{route: string}>(evt)
        data[route] = data[route] || 0
        data[route]++
        console.log(route)
        rpc.broadcast.updateData({
          routes: data
        })
      })
    })
  }
})
