<template>
  <NIconTitle
    hover:cursor-pointer
    text-md
    transition
    class="op60"
    p4
    @click="navigateToRoute(routeInfo.route)"
  >
    <div class="flex w-full justify-between">
      <p>
        Route:
        <span class="font-bold mr-2">{{ routeInfo.route }}</span>
        query:
        <ContentEditable
          v-model="query"
          html-tag="span"
          class="border my-auto mt-2 h-fit text-sm px-1 mx-1 rounded min-w-[15px] border-dashed"
          placeholder="query"
          @click.stop
        /> -- Hydration failed time: {{ routeInfo.reasons.length }}
      </p>
      <div flex gap-5>
        <NButton :disabled="isTesting" @click.stop="() => testPath(routeInfo.route, query)">
          <span v-if="!isTesting">
            Test
          </span>
          <Icon v-else name="line-md:loading-twotone-loop" />
        </NButton>
        <NButton @click.stop="reset">
          Reset
        </NButton>
      </div>
    </div>
  </NIconTitle>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouteInfo } from '~/../src/runtime/types/rpc'
import useRpc from '~/composables/useRpc'
import useTestHydration from '~/composables/useTestHydration'
import { navigateToRoute } from '~/utils/navigation'

const props = defineProps<{
  routeInfo: RouteInfo
}>()

const rpc = useRpc()
const { isTesting, testPath } = useTestHydration()

const query = ref('')

function reset () {
  rpc.value.resetRoute(props.routeInfo.route)
}
</script>
