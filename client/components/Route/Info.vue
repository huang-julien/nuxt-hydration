<template>
  <NCard>
    <div class="grid grid-cols-2 p-3">
      <div>
        <p>Route: {{ route }}</p>
        <p>Path: {{ path }}</p>
        <p>Hydration failed count: {{ failedCount }}</p>
      </div>
      <div>
        <NButton @click="() => rpc.resetRoute(path)">
          Reset
        </NButton>
      </div>
    </div>
  </NCard>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/named
import { useRpc } from '#imports'

withDefaults(defineProps<{
    path: string
    failedCount?: number
    route: string
}>(), {
  failedCount: 0
})

const rpc = useRpc()
</script>
