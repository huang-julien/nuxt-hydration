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
import { ClientFunctions, ServerFunctions, ServerData } from '../src/runtime/types/rpc'
import { RPC_NAMESPACE } from '~/../src/runtime/utils'
// eslint-disable-next-line import/named
import { ref, provide, RPC_INJECT_KEY, SERVER_DATA_INJECT_KEY } from '#imports'
import 'floating-vue/dist/style.css'

const devtools = useDevtoolsClient()
const serverData = ref<ServerData>({
  routes: []
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

<style>
/* Overrides Floating Vue, waiting for devtools to export theses styles */
body .v-popper--theme-dropdown .v-popper__inner,
body .v-popper--theme-tooltip .v-popper__inner {
  --at-apply: bg-base text-black dark:text-white rounded border border-base shadow;
  box-shadow: 0 6px 30px #0000001a;
  background: #000000;
  opacity: 1;
}

body .v-popper--theme-tooltip .v-popper__arrow-inner,
body .v-popper--theme-dropdown .v-popper__arrow-inner {
  visibility: visible;
  --at-apply: border-white dark:border-hex-121212;
  background: #0000001a;
}

body .v-popper--theme-tooltip .v-popper__arrow-outer,
body .v-popper--theme-dropdown .v-popper__arrow-outer {
  --at-apply: border-base;
}

body .v-popper--theme-tooltip.v-popper--shown,
body .v-popper--theme-tooltip.v-popper--shown * {
  transition: none !important;
}
</style>
