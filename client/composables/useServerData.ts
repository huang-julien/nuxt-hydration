import type { Ref } from 'vue'
import { inject } from '#imports'
import { ServerData } from '~/../src/runtime/types'

export const SERVER_DATA_INJECT_KEY = Symbol('server-data')

export default function useServerData () {
  return inject<Ref<ServerData>>(SERVER_DATA_INJECT_KEY)!
}
