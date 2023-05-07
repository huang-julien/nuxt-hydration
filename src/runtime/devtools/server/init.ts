
import { defineEventHandler, readBody } from 'h3'
import { extendServerRpc, onDevToolsInitialized, addCustomTab } from '@nuxt/devtools-kit'
import { BirpcGroup } from 'birpc'
import { addDevServerHandler } from '@nuxt/kit'
import { Nuxt, NuxtPage } from '@nuxt/schema'
import { RPC_NAMESPACE } from '../../utils'
import { ClientFunctions, ROUTE_TYPE, ServerFunctions } from '../../types'
import { data, incrementFailure } from './data'
import { isRouteWithParams } from './utils'

export default function initServer (nuxt: Nuxt) {
  let rpc: BirpcGroup<ClientFunctions, ServerFunctions>

  nuxt.hook('pages:extend', (pages) => {
    const pagesSet = new Set(pages)

    function searchChildren (page: NuxtPage) {
      if (pagesSet.has(page)) { return }
      pagesSet.add(page)
      page.children?.forEach(searchChildren)
    }
    pages.forEach(searchChildren)
    const routes = Array.from(pagesSet).sort((a, b) => a.path.localeCompare(b.path))

    routes.forEach((r) => {
      if (isRouteWithParams(r.path)) {
        data.routes.push({
          type: ROUTE_TYPE.WITH_PARAMS,
          paths: [],
          route: r.path
        })
      } else {
        data.routes.push({
          type: ROUTE_TYPE.WITHOUT_PARAMS,
          route: r.path,
          failedTime: 0
        })
      }
    })
  })

  onDevToolsInitialized(() => {
    rpc = extendServerRpc<ClientFunctions, ServerFunctions>(RPC_NAMESPACE, {
      updateStats (route: string, path: string) {
        incrementFailure(route, path)
        rpc.broadcast.updateData(data)
      },
      getStats () {
        return data
      },
      reset () {
        for (const routeInfo of data.routes) {
          if (routeInfo.type === ROUTE_TYPE.WITH_PARAMS) {
            routeInfo.paths = []
          } else {
            routeInfo.failedTime = 0
          }
        }
        rpc.broadcast.updateData(data)
      },
      resetRoute (route: string) {
        const routeInfo = data.routes.find(info => info.route === route)
        if (!routeInfo) { throw new Error('This route has not been registered within nuxt-hydration') }
        if (routeInfo.type === ROUTE_TYPE.WITH_PARAMS) {
          routeInfo.paths = []
        } else {
          routeInfo.failedTime = 0
        }
        rpc.broadcast.updateData(data)
      },
      resetPath (path: string) {
        for (const routeInfo of data.routes) {
          if (routeInfo.type === ROUTE_TYPE.WITH_PARAMS) {
            for (const pathInfo of routeInfo.paths) {
              if (pathInfo.path === path) {
                pathInfo.failedTime = 0
                break
              }
            }
          } else if (routeInfo.route === path) {
            routeInfo.failedTime = 0
            break
          }
        }
        rpc.broadcast.updateData(data)
      }
    })

    addCustomTab({
      name: 'nuxt-hydration',
      title: 'Hydration',
      icon: 'material-symbols:water-drop-rounded',
      view: {
        type: 'iframe',
        src: '/__hydration_client'
      }
    })
  })

  addDevServerHandler({
    route: '/__hydration_ping',
    handler: defineEventHandler(async (evt) => {
      const { route, path } = await readBody<{route: string, path:string}>(evt)
      incrementFailure(route, path)
      if (rpc) {
        rpc.broadcast.updateData(data)
      }
    })
  })
}
