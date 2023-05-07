<template>
  <div class="grid grid-cols-2 p-4">
    <NIconTitle text-base class=" ">
      <p>Route: <span class="font-bold">{{ routeInfo.route }}</span></p>
    </NIconTitle>
    <p>Hydration failed time: {{ routeInfo.failedTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { RouteInfo } from '~/../src/runtime/types'

const props = defineProps<{
    routeInfo: RouteInfo
}>()
</script>
