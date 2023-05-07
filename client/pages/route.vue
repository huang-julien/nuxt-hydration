<template>
  <div>
    <NavHeader class="mb-3">
      <template #prepend>
        <NButton class="rounded-3xl text-2xl p-1" @click="navigateTo('/')">
          <Icon name="material-symbols:chevron-left" />
        </NButton>
      </template>
    </NavHeader>
    <div class="mb-3 text-xl">
      <h1>
        Route:
      </h1>
      <p>
        {{ routePath }}
      </p>
    </div>
    <RouteInfo :path="currentRoutePath.value.matched[0].path" :route="currentRoutePath.value.fullPath" :failed-count="failedTime" />
  </div>
</template>

<script setup lang="ts">
import { useDevtoolsClient } from '@nuxt/devtools-kit/iframe-client'
// eslint-disable-next-line import/named
import { useServerData, computed, useRoute, navigateTo } from '#imports'

const routePath = useRoute().query.route
if (!routePath) { navigateTo('/') }
const devtools = useDevtoolsClient()
const currentRoutePath = computed(() => devtools.value!.host.nuxt.$router.currentRoute)
const serverData = useServerData()
const failedTime = computed(() => serverData.value.routes[currentRoutePath.value.value.fullPath])
</script>
