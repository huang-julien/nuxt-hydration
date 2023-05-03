<template>
  <div>
    <NuxtLayout>
      <NLoading v-if="!devtools" />
      <div v-else class="px-2">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { useDevtoolsClient, onDevtoolsClientConnected } from '@nuxt/devtools-kit/iframe-client'
import { BirpcReturn } from 'birpc'
import { Ref } from 'vue'
import { ClientFunctions, ServerData, ServerFunctions } from '~/../src/types'
import { RPC_NAMESPACE } from '~/../src/runtime/utils'
// eslint-disable-next-line import/named
import { ref, provide, RPC_INJECT_KEY, SERVER_DATA_INJECT_KEY } from '#imports'

const devtools = useDevtoolsClient()
const serverData = ref<ServerData>({
  routes: {}
})

provide(SERVER_DATA_INJECT_KEY, serverData)

const rpc: Ref<BirpcReturn<ServerFunctions, ClientFunctions>|null> = ref(null)
provide(RPC_INJECT_KEY, rpc)

onDevtoolsClientConnected(async (client) => {
  rpc.value = client.devtools.extendClientRpc<ServerFunctions, ClientFunctions>(RPC_NAMESPACE, {
    updateData (data) {
      serverData.value = data
    }
  })

  serverData.value = await rpc.value.getStats()
})
</script>
