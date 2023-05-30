<template>
  <div class="flex flex-col gap-3">
    <NavHeader>
      <template #prepend>
        <NButton class="rounded-3xl text-2xl p-1" @click="navigateTo('/')">
          <Icon name="material-symbols:chevron-left" />
        </NButton>
      </template>
    </NavHeader>
    <div class="text-xl">
      <h1>
        Route:
      </h1>
      <p>
        {{ route }}
      </p>
    </div>
    <RouteInfo :path="pathInfo?.path ?? route" :route="routeInfo.route" :failed-count="failedTime" />

    <NCard p-3>
      <ReasonsTable class="w-full" :route="route" :reasons="reasons" />
    </NCard>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/named
import { useServerData, computed, useRoute, navigateTo } from '#imports'
import { ROUTE_TYPE, RouteInfo as TRouteInfo } from '~/../src/runtime/devtools/types'

const route = useRoute().query.route as string
if (!route) { navigateTo('/') }
const serverData = useServerData()

const routeInfo = computed(() => {
  const r = serverData.value.routes.find((r) => {
    if (r.route === route) { return r }
    if (r.type === ROUTE_TYPE.WITH_PARAMS && r.paths.find(p => p.path === route)) { return r }
    return undefined
  })
  if (!r) { throw createError("Oops couldn't not find the route information") }

  return r
})

const pathInfo = computed(() => {
  if (routeInfo.value.type === ROUTE_TYPE.WITHOUT_PARAMS) { return null }
  return routeInfo.value.paths.find(p => p.path === route)
})

const reasons = computed(() => {
  if (pathInfo.value) { return pathInfo.value.reasons }
  return (routeInfo.value as TRouteInfo).reasons
})

if (!routeInfo) { throw createError("Oops couldn't not find the route information") }

const failedTime = computed(() => reasons.value?.length ?? 0)
</script>
