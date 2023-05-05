<template>
  <NavHeader class="mb-3" />
  <div class="flex flex-col gap-5">
    <div>
      <div class="mb-3 text-xl">
        Current route
      </div>
      <RouteInfo :path="currentRoutePath.value.matched[0].path" :route="currentRoutePath.value.fullPath" :failed-count="failedTime" />
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

const devtools = useDevtoolsClient()
const currentRoutePath = computed(() => devtools.value!.host.nuxt.$router.currentRoute)
const serverData = useServerData()
const failedTime = computed(() => serverData.value.routes[currentRoutePath.value.value.matched[0].path])

function navigateToRoute (route: string) {
  navigateTo({
    path: '/route',
    query: {
      route
    }
  })
}
</script>
