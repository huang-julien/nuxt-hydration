<template>
  <NavHeader class="mb-3">
    <template #prepend>
      <TestingInput />
    </template>
  </NavHeader>
  <div class="flex flex-col gap-5">
    <div>
      <div class="mb-3 text-xl">
        Current route
      </div>
      <RouteInfo :path="currentRoute.matched[0].path" :route="currentRoute.fullPath" :failed-count="failedTime" />
    </div>
    <div>
      <div class="mb-3 text-xl">
        All routes
      </div>
      <RouteList :routes="serverData.routes" @click:route="navigateToRoute" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDevtoolsClient } from '@nuxt/devtools-kit/iframe-client'
// eslint-disable-next-line import/named
import { useServerData, computed, navigateTo } from '#imports'
import { ROUTE_TYPE } from '~/../src/runtime/types'

const devtools = useDevtoolsClient()
const currentRoute = computed(() => devtools.value!.host.nuxt.$router.currentRoute.value)
const serverData = useServerData()

const failedTime = computed(() => {
  const route = serverData.value.routes.find((r) => {
    return r.route === currentRoute.value.matched[0].path
  })
  if (!route) { return 0 }
  if (route?.type === ROUTE_TYPE.WITHOUT_PARAMS) {
    return route.failedTime
  }
  return route.paths.find(p => p.path === currentRoute.value.fullPath)?.failedTime ?? 0
})

function navigateToRoute (route: string) {
  navigateTo({
    path: '/route',
    query: {
      route
    }
  })
}
</script>
