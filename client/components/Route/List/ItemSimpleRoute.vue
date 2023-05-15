<template>
  <NIconTitle text-md transition class="op60" p4>
    <div class="flex w-full justify-between">
      <p>Route: <span class="font-bold">{{ routeInfo.route }}</span>  -- Hydration failed time: {{ routeInfo.failedTime }}</p>
      <NButton @click="reset">Reset</NButton>
    </div>
  </NIconTitle>
</template>

<script setup lang="ts">
import { RouteInfo } from '~/../src/runtime/types'
import useRpc from '~/composables/useRpc'

const props = defineProps<{
    routeInfo: RouteInfo
}>()

const rpc = useRpc()

function reset () {
  rpc.value.resetRoute(props.routeInfo.route)
}
</script>
