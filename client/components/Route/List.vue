<template>
  <NCard>
    <RouteListItem v-for="routeInfo in routes" :key="routeInfo.route" :info="routeInfo" class=" border-b border-base" />
  </NCard>
</template>

<script setup lang="ts">
import { RouteHydrationInfo } from '~/../src/runtime/types'

defineProps<{
  routes: RouteHydrationInfo[]
}>()

defineEmits<{(e: 'click:route', path: string): void }>()
</script>
