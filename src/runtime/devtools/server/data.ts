import { ROUTE_TYPE, RouteHydrationInfo, RouteWithParam, ServerData } from '../../types'

export const data: ServerData = {
  routes: []
}

export function getRoute (route: string) {
  return data.routes.find(r => r.route === route)
}

export function getRouteWithParam (route: string): RouteWithParam | undefined {
  return data.routes.filter((r): r is RouteWithParam => r.type === ROUTE_TYPE.WITH_PARAMS).find(r => r.route === route)
}

export function safeGetRoute (route: string, path: string): RouteHydrationInfo {
  const routeData = route === path ? getRoute(route) : getRouteWithParam(route)
  if (!routeData) {
    const createdData: RouteHydrationInfo = route === path
      ? {
          route,
          type: ROUTE_TYPE.WITHOUT_PARAMS,
          failedTime: 0
        }
      : {
          route,
          type: ROUTE_TYPE.WITH_PARAMS,
          paths: []
        }

    data.routes.push(createdData)

    return createdData
  }
  return routeData
}

export function incrementFailure (route: string, path: string) {
  const data = safeGetRoute(route, path)
  if (data.type === ROUTE_TYPE.WITH_PARAMS) {
    const pathInfo = data.paths.find(p => p.path === path)
    if (!pathInfo) {
      const info = {
        failedTime: 1,
        path
      }
      data.paths.push(info)
    } else {
      pathInfo.failedTime++
    }
  } else {
    data.failedTime++
  }
}
