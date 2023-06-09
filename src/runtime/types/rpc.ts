import { Reason, ROUTE_TYPE } from './reason'

export type PathInfo = {
    reasons: Reason[],
    path: string
}

export type RouteWithParam = {
    paths: PathInfo[],
    route: string,
    type: ROUTE_TYPE.WITH_PARAMS
}

export type RouteInfo = {
    route: string,
    type: ROUTE_TYPE.WITHOUT_PARAMS,
    reasons: Reason[]
}

export type RouteHydrationInfo = RouteWithParam | RouteInfo

export type ServerData = {
    routes: RouteHydrationInfo[]
}

export type ServerFunctions = {
    updateStats(route: string, path: string): void
    getStats(): ServerData
    reset(): void
    resetRoute(route: string): void
    resetPath(path: string): void
}

export type ClientFunctions = {
     updateData(routes: ServerData): void
}
