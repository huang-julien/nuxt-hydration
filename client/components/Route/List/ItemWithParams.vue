<template>
  <NSectionBlock :open="state" text="">
    <template #text>
      <p>Route: <span class="font-bold">{{ routeInfo.route }}</span> -- Hydration failed time : {{ totalFailedTime }} </p>
    </template>
    <template v-if="routeInfo.paths.length">
      <RouteListItemWithParamsItem v-for="path in routeInfo.paths" :key="path.path" class="grid grid-cols-2 pl-5" :route="path" />
    </template>
    <p v-else ml-5>
      There's no path available, try to test a page that satisfies {{ routeInfo.route }}
    </p>
  </NSectionBlock>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouteWithParam } from '~/../src/runtime/types'

const props = defineProps<{
  routeInfo: RouteWithParam
}>()

const state = ref(false)

const totalFailedTime = computed(() => {
  let count = 0
  props.routeInfo.paths.forEach((p) => {
    count += p.failedTime
  })
  return count
})
</script>
