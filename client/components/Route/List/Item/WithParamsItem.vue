<template>
  <div @click="navigateToRoute(route.path)">
    <div>
      <p>path: <span class="font-bold">{{ route.path }}</span></p>
      <p>
        hydration failed time: {{ route.reasons.length }}
      </p>
    </div>
    <div flex justify-between gap>
      <NButton :disabled="isTesting" @click.stop="() => testPath(route.path)">
        <span v-if="!isTesting">
          Test
        </span>
        <Icon v-else name="line-md:loading-twotone-loop" />
      </NButton>
      <NButton ml-5 @click.stop="reset(route.path)">
        Reset
      </NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PathInfo } from '~/../src/runtime/devtools/types'
import useRpc from '~/composables/useRpc'
import useTestHydration from '~/composables/useTestHydration'
import { navigateToRoute } from '~/utils/navigation'

defineProps<{
    route: PathInfo
}>()

const rpc = useRpc()
const { isTesting, testPath } = useTestHydration()
function reset (path: string) {
  rpc.value.resetPath(path)
}
</script>
