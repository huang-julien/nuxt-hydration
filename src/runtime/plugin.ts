import { hydrationMessages } from './utils';
import { defineNuxtPlugin, useRoute, useState } from '#app'
import consola, { ConsolaReporterLogObject } from "consola"
import CustomReporter from './consola/reporter'
import { createApp } from 'vue';
import Container from './view/TheContainer.vue';

export default defineNuxtPlugin(() => { 
  
  const hydrationFailed = useState('hydration-failed', () => false)

  function onError(logObj: ConsolaReporterLogObject) {
    if(hydrationMessages.includes(logObj.args[0])) {
      hydrationFailed.value = true
    }
  }

  consola.setReporters([new CustomReporter(onError)]).wrapConsole()

  // create the container div
  const containerNode = document.createElement('div')
  containerNode.id = 'nuxt-hydration-container' 
  document.body.appendChild(containerNode)

  // create the app
  const app = createApp(Container)
  app.mount(containerNode)
})
