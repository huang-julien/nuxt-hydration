
/**
 * not implemented yet
 */
export type RouteHydrationInfo = {
    failedCount: number,
    navigationCount: number
}

export type HydrationFailRequest = {
    route: string
    hydrationFailed: boolean
}

export type ServerData = {
    routes: Record<string, number>
}
 
export type  ServerFunctions = {
    updateStats(route: string): void
    getStats(): ServerData
}

export type ClientFunctions = {
     updateData(routes: ServerData): void
}