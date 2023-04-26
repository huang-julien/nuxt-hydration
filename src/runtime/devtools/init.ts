
import {defineEventHandler, readBody} from "h3"
import { extendServerRpc, onDevToolsInitialized, addCustomTab } from '@nuxt/devtools-kit'
import { ClientFunctions, ServerFunctions } from './../../types'
import { BirpcGroup } from 'birpc'
import { RPC_NAMESPACE } from "../utils"
import { addDevServerHandler } from "@nuxt/kit"
import { Nuxt, NuxtPage } from "@nuxt/schema"

const routesCount: Record<string, number> = {}

export default function initServer(nuxt: Nuxt) {
    let rpc: BirpcGroup<ClientFunctions, ServerFunctions>

    nuxt.hook('pages:extend', (pages) => {
      const pagesSet = new Set(pages)
      
      function searchChildren(page: NuxtPage) {
        if (pagesSet.has(page)) return;
        pagesSet.add(page)
        page.children?.forEach(searchChildren)
      }
      pages.forEach(searchChildren)
      const routes = Array.from(pagesSet).sort((a, b) => a.path.localeCompare(b.path))
      routes.forEach((r) => {
        routesCount[r.path] = routesCount[r.path] ?? 0
      })
    })

    onDevToolsInitialized(() => {
        rpc = extendServerRpc<ClientFunctions, ServerFunctions>(RPC_NAMESPACE, {
        updateStats(route: string) {
          routesCount[route] = routesCount[route] || 0
          routesCount[route]++

          rpc.broadcast.updateData({
            routes: routesCount
          })
        },
        getStats() {
          return {
            routes: routesCount
          }
        }
      })

      addCustomTab({
        name: 'nuxt-hydration',
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
          routesCount[route] = routesCount[route] || 0
          routesCount[route]++
          if(rpc) {
            rpc.broadcast.updateData({
                routes: routesCount
            })
          }
        })
    }) 
}