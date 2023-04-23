import { hydrationMessages } from '../utils';
import { defineNuxtPlugin, useState } from '#app'
import consola, { LogObject  } from "consola"
import CustomReporter from './consola/reporter'
import { createApp } from 'vue';
import Container from './view/TheContainer.vue';
 
export default defineNuxtPlugin((nuxt) => {
  const hydrationFailed = useState('hydration-failed', () => false)
 

  function onError(logObj: LogObject) { 
    if(hydrationMessages.includes(logObj.args[0])) {
      hydrationFailed.value = true
    
      $fetch('/__hydration_ping', {
        method: 'POST',
        body: {
          route: nuxt.vueApp.$nuxt.$route.path
        }
      })
    }
  }


  const reporter = new CustomReporter()
  reporter.hooks.hook('log:error', onError)
  consola.setReporters([reporter]).wrapConsole()

  // create the container div
  const containerNode = document.createElement('div')
  containerNode.id = 'nuxt-hydration-container' 
  document.body.appendChild(containerNode)

  // create the app
  const app = createApp(Container)
  app.mount(containerNode)
})
