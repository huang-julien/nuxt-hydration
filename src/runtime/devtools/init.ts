
import {defineEventHandler, readBody} from "h3"
import { extendServerRpc, onDevToolsInitialized, addCustomTab } from '@nuxt/devtools-kit'
import { ClientFunctions, ServerFunctions } from './../../types'
import { BirpcGroup } from 'birpc'
import { RPC_NAMESPACE } from "../utils"
import { addDevServerHandler } from "@nuxt/kit"

const data: Record<string, number> = {}

export default function initServer() {
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
          data[route] = data[route] || 0
          data[route]++
          if(rpc) {
            rpc.broadcast.updateData({
                routes: data
            })
          }
        })
    }) 
}