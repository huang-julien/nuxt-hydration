import { defineNuxtPlugin, onNuxtReady, useState } from '#app'
import { consola } from 'consola'
import type {LogObject} from 'consola'
import { createApp, ref } from 'vue'
import { hydrationMessages } from '../utils'
import Container from '../view/Client.vue'

export default defineNuxtPlugin({
  name: 'nuxt-hydration-plugin',
  parallel: true,
  setup: (nuxt) => {
    const hydrationFailed = useState('hydration-failed', () => false)
    const hydrationNodeMismatch = useState<Node | null>('hydration-div', () => null)

    function onError (logObj: LogObject) {
      if (logObj.args && typeof logObj.args[0] === 'string' && (logObj.args[0].includes('Hydration node mismatch') || logObj.args[0].includes('Hydration text content mismatch'))) {
        for(const message of logObj.args) {
          if (message instanceof Node) {
             hydrationNodeMismatch.value = message
            break
          }
        }
      }
      console.log(logObj)
      if (hydrationMessages.includes(logObj.args[0])) {
        hydrationFailed.value = true
      }
    }

    // if it is a testing iframe, ping the devtool parent to remove this app
    nuxt.hook('app:suspense:resolve', async () => {
      const list: { path: string }[] = []
      await nuxt.callHook('nuxt-hydration:component-hydration', list)
      if (list.length > 0) {
        hydrationFailed.value = true
      }
      if (window.parent) {
        window.parent.postMessage('__nuxt__hydration', '*')
      }
    })

    onNuxtReady(() => {
      // create the container div
      const containerNode = document.createElement('div')
      containerNode.id = 'nuxt-hydration-container'
      document.body.appendChild(containerNode)

      // create the app
      const app = createApp(Container)
      app.mount(containerNode)
    })

    consola.addReporter(
      {
        log (logObj) {
          if (logObj.type === 'error' || logObj.type === 'warn') {
            onError(logObj)
          }
        }
      })

    consola.wrapConsole()
  }
})
