<template>
  <NSectionBlock :open="state" text="" >
    <template #text>
      <p>Route: <span class="font-bold">{{ routeInfo.route }}</span> -- Hydration failed time : {{ totalFailedTime }} </p>
    </template>
    <template v-if="routeInfo.paths.length">
      <div v-for="path in routeInfo.paths" :key="path.path" class="grid grid-cols-2 pl-5">
        <p>path: <span class="font-bold">{{ path.path }}</span></p>
        <p>
          hydration failed time: {{ path.failedTime }}
          <NButton ml-5 @click="reset(path.path)">
            Reset
          </NButton>
        </p>
      </div>
    </template>
    <p v-else ml-5>
      There's no path available, try to test a page that satisfies {{ routeInfo.route }}
    </p>
  </NSectionBlock>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouteWithParam } from '~/../src/runtime/types'
import useRpc from '~/composables/useRpc'

const props = defineProps<{
  routeInfo: RouteWithParam
}>()

const state = ref(false)
const rpc = useRpc()
const totalFailedTime = computed(() => {
  let count = 0
  props.routeInfo.paths.forEach((p) => {
    count += p.failedTime
  })
  return count
})

function reset (path: string) {
  rpc.value.resetPath(path)
}
</script>
