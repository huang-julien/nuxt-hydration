<template>
  <NSectionBlock :open="state" text="">
    <template #text>
      <p>Route: <span class="font-bold">{{ routeInfo.route }}</span>  -- Hydration failed time: {{ routeInfo.failedTime }}</p>
    </template>
  </NSectionBlock>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouteInfo } from '~/../src/runtime/types'

const state = ref(false)

defineProps<{
    routeInfo: RouteInfo
}>()
</script>
