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
        Route: <span class="font-bold">{{ routeInfo.route }}</span> -- Hydration failed time: {{ routeInfo.reasons.length }}
      </p>
      <div flex gap-5 text-sm>
        <NButton :disabled="isTesting" @click.stop="() => testPath(routeInfo.route)">
          <span v-if="!isTesting">
            Test
          </span>
          <Icon v-else name="line-md:loading-twotone-loop" />
        </NButton>
        <VDropdown @click.stop>
          <NButton :disabled="isTesting">
            <span v-if="!isTesting">
              With query
            </span>
            <Icon v-else name="line-md:loading-twotone-loop" />
          </NButton>
          <template #popper>
            <div p-1 flex items-center>
              <div flex pb-2 items-center>
                ? <ContentEditable
                v-model="query"
                class="border my-auto mt-2 h-fit text-sm px-1 mx-1 rounded min-w-[15px] border-dashed"
                placeholder="query"
              />
              </div>

              <NButton class="ml-auto text-sm" :disabled="isTesting" @click="() => testPath(routeInfo.route, query)">
                  <span v-if="!isTesting">
                    Test
                  </span>
                  <Icon v-else name="line-md:loading-twotone-loop" />
                </NButton>
            </div>
          </template>
        </VDropdown>

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

const query = ref('')

const rpc = useRpc()
const { isTesting, testPath } = useTestHydration()
function reset () {
  rpc.value.resetRoute(props.routeInfo.route)
}

</script>
