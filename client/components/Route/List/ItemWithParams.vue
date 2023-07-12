<template>
  <NSectionBlock :open="state">
    <template #text>
      <div class="flex w-full">
        <p>Route: <span class="font-bold">{{ routeInfo.route }}</span> -- Hydration failed time : {{ totalFailedTime }} </p>
      </div>
    </template>

    <template #actions>
      <VDropdown>
        <NButton class="text-sm mr-5">
          Test a path
        </NButton>
        <template #popper>
          <div p-1>
            <RouteTestPathParam :route="routeInfo.route">
              <template #default="{testPath, isTesting}">
                <NButton class="ml-auto text-sm" :disabled="isTesting" @click="testPath">
                  <span v-if="!isTesting">
                    Test
                  </span>
                  <Icon v-else name="line-md:loading-twotone-loop" />
                </NButton>
              </template>
            </RouteTestPathParam>
          </div>
        </template>
      </VDropdown>
    </template>
    <div v-if="routeInfo.paths.length" class="mt-3">
      <RouteListItemWithParamsItem v-for="path in routeInfo.paths" :key="path.path" class="flex justify-between w-full pl-5 my-2" :route="path" />
    </div>
    <p v-else class="mt-3" ml-5>
      There's no path available, try to test a page that satisfies {{ routeInfo.route }}
    </p>
  </NSectionBlock>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
 import { RouteWithParam } from '~/../src/runtime/types/rpc'

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
