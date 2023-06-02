import { BirpcReturn } from 'birpc'
import type { Ref } from 'vue'
import { inject } from '#imports'
import { ClientFunctions, ServerFunctions } from '~/../src/runtime/types/rpc'

export const RPC_INJECT_KEY = Symbol('rpc-injection')

export default function useRpc () {
  return inject<Ref<BirpcReturn<ServerFunctions, ClientFunctions>>>(RPC_INJECT_KEY)!
}
