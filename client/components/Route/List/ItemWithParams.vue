<template>
  <NSectionBlock :open="state" text="" class="op100">
    <template #text>
      <p>Route: <span class="font-bold">{{ routeInfo.route }}</span> -- Hydration failed time : {{ totalFailedTime }} </p>
    </template>
    <div v-for="path in routeInfo.paths" :key="path.path" class="grid grid-cols-2 pl-5">
      <p>path: <span class="font-bold">{{ path.path }}</span></p>
      <p>
        hydration failed time: {{ path.failedTime }}
        <NButton ml-5 @click="reset(path.path)">
          Reset
        </NButton>
      </p>
    </div>
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
