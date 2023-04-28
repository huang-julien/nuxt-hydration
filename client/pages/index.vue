<template>
  <NCard>
    <div class="flex items-baseline text-align-bottom">
      <Icon
        name="material-symbols:water-drop-rounded"
        class="text-2xl"
      />
      <h1 class="text-3xl">
        nuxt-hydration
      </h1>
    </div>

    <p v-if="!devtools">
      awaiting devtools connection
    </p>
    <div v-else class="px-2">
      <div class="flex">
        <NButton @click="rpc.reset()">
          Reset
        </NButton>
      </div>
      <RouteList :routes="serverData.routes" />
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { useDevtoolsClient, onDevtoolsClientConnected } from '@nuxt/devtools-kit/iframe-client'
import { BirpcReturn } from 'birpc'
import { ClientFunctions, ServerData, ServerFunctions } from '~/../src/types'
import { RPC_NAMESPACE } from '~/../src/runtime/utils'
import { ref } from '#imports'

const devtools = useDevtoolsClient()
const serverData = ref<ServerData>({
  routes: {}
})
let rpc: BirpcReturn<ServerFunctions, ClientFunctions>
onDevtoolsClientConnected(async (client) => {
  rpc = client.devtools.extendClientRpc<ServerFunctions, ClientFunctions>(RPC_NAMESPACE, {
    updateData (data) {
      serverData.value = data
    }
  })

  serverData.value = await rpc.getStats()
})
</script>
