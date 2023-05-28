<template>
  <NSectionBlock :open="state">
    <template #text>
      <p>Route: <span class="font-bold">{{ routeInfo.route }}</span> -- Hydration failed time : {{ totalFailedTime }} </p>
    </template>
    <template v-if="routeInfo.paths.length">
      <RouteListItemWithParamsItem v-for="path in routeInfo.paths" :key="path.path" class="flex justify-between w-full pl-5 my-2" :route="path" />
    </template>
    <p v-else ml-5>
      There's no path available, try to test a page that satisfies {{ routeInfo.route }}
    </p>
  </NSectionBlock>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouteWithParam } from '~/../src/runtime/devtools/types'

const props = defineProps<{
  routeInfo: RouteWithParam
}>()

const state = ref(false)

const totalFailedTime = computed(() => {
  let count = 0
  props.routeInfo.paths.forEach((p) => {
    count += p.reasons.length
  })
  return count
})
</script>
