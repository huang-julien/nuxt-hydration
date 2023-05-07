<template>
  <div>
    <NSectionBlock :open="state" text="" class="op100">
      <template #text>
        <p>Route: <span>{{ routeInfo.route }}</span></p>
      </template>
    </NSectionBlock>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouteWithParam } from '~/../src/runtime/types'
const props = defineProps<{
    routeInfo: RouteWithParam
}>()

const state = ref(false)
</script>
