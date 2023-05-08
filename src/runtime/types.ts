
export enum ROUTE_TYPE {
  WITHOUT_PARAMS,
  WITH_PARAMS
}

export type PathInfo = {
    failedTime: number,
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
    failedTime: number
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
