<template>
  <div class="flex gap-3">
    <slot name="prepend" />
    <NButton class="ml-auto" @click="rpc.reset()">
      Reset all
    </NButton>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/named
import { useRpc } from '#imports'

const rpc = useRpc()
</script>
