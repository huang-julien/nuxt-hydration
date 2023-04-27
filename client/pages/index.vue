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
    <div v-else>
      <RouteList :routes="serverData.routes" />
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { useDevtoolsClient, onDevtoolsClientConnected } from '@nuxt/devtools-kit/iframe-client'
import { ClientFunctions, ServerData, ServerFunctions } from '~/../src/types'
import { RPC_NAMESPACE } from '~/../src/runtime/utils'
import { ref } from '#imports'

const devtools = useDevtoolsClient()
const serverData = ref<ServerData>({
  routes: {}
})

onDevtoolsClientConnected(async (client) => {
  const rpc = client.devtools.extendClientRpc<ServerFunctions, ClientFunctions>(RPC_NAMESPACE, {
    updateData (data) {
      serverData.value = data
    }
  })

  serverData.value = await rpc.getStats()
})

</script>
