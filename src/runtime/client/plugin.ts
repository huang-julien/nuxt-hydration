import { defineNuxtPlugin, onNuxtReady, useState } from '#app'
import { consola } from 'consola'
import type {LogObject} from 'consola'
import { createApp, ref } from 'vue'
import Container from '../view/Client.vue'
import 'iconify-icon'

export default defineNuxtPlugin({
  name: 'nuxt-hydration-plugin',
  parallel: true,
  setup: (nuxt) => {
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
    }

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
