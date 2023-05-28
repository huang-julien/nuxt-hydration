<template>
  <RouteListItemSimpleRoute v-if="info.type === ROUTE_TYPE.WITHOUT_PARAMS" :route-info="info" />
  <RouteListItemWithParams v-else-if="info.type === ROUTE_TYPE.WITH_PARAMS" :route-info="info" />
</template>

<script setup lang="ts">
import { ROUTE_TYPE, RouteHydrationInfo } from '~/../src/runtime/devtools/types'

defineProps<{
    info: RouteHydrationInfo
}>()
</script>
