import { defineNuxtPlugin, useState } from '#app'
import { LogObject, createConsola } from 'consola'
import { createApp } from 'vue'
import { hydrationMessages } from './utils'
import Container from './view/TheContainer.vue'

export default defineNuxtPlugin((nuxt) => {
  const hydrationFailed = useState('hydration-failed', () => false)

  function onError (logObj: LogObject) {
    if (hydrationMessages.includes(logObj.args[0])) {
      hydrationFailed.value = true

      $fetch('/__hydration_ping', {
        method: 'POST',
        body: {
          route: nuxt._route.matched[0].path
        }
      })
    }
  }

  const consola = createConsola({
    reporters: [
      {
        log (logObj) {
          if (logObj.type === 'error') {
            onError(logObj)
          }
        }
      }
    ]
  })

  consola.wrapAll()

  // create the container div
  const containerNode = document.createElement('div')
  containerNode.id = 'nuxt-hydration-container'
  document.body.appendChild(containerNode)

  // create the app
  const app = createApp(Container)
  app.mount(containerNode)
})
