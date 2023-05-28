import { defineNuxtPlugin, useState } from '#app'
import { LogObject, consola } from 'consola'
import { createApp } from 'vue'
import { hydrationMessages } from '../utils'
import Container from '../view/TheContainer.vue'
import { Reason } from '../devtools/types'
import { getHtmlValidatorDetails } from './html-validator'

export default defineNuxtPlugin({
  name: 'nuxt-hydration-plugin',
  parallel: true,
  setup: (nuxt) => {
    const hydrationFailed = useState('hydration-failed', () => false)

    function onError (logObj: LogObject) {
      if (hydrationMessages.includes(logObj.args[0])) {
        hydrationFailed.value = true

        const reason: Reason = {
          reason: 'unknown'
        }
        if (window.__NUXT_HYDRATION_HTMLVALIDATOR_REASON__) {
          reason.reason = 'html-invalid'
          reason.details = getHtmlValidatorDetails(window.__NUXT_HYDRATION_HTMLVALIDATOR_REASON__)
        }

        $fetch('/__hydration_ping', {
          method: 'POST',
          body: {
            route: nuxt._route.matched[0]?.path ?? '/',
            path: nuxt._route.fullPath,
            reason
          }
        })
      }
    }

    // if it is a testing iframe, ping the devtool parent to remove this app
    nuxt.hook('app:suspense:resolve', () => {
      if (window.parent) {
        window.parent.postMessage('__nuxt__hydration', '*')
      }
    })

    consola.addReporter(
      {
        log (logObj) {
          if (logObj.type === 'error') {
            onError(logObj)
          }
        }
      })

    consola.wrapConsole()

    // create the container div
    const containerNode = document.createElement('div')
    containerNode.id = 'nuxt-hydration-container'
    document.body.appendChild(containerNode)

    // create the app
    const app = createApp(Container)
    app.mount(containerNode)
  }
})
