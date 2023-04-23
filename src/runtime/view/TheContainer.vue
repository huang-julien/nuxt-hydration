<template>
  <div>
    <Transition name="fade">
      <NAlert 
        v-if="state"
        id="alert-hydration"
        title="Oh no !"
        type="error"
      >
        <div>
          Hey ! there might be an issue with hydration ! Check your console or the devtools !
         
          <NButton
            type="error"
            @click="state = false"
          >
            Close
          </NButton>
        </div>
      </NAlert>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { NAlert, NButton } from "naive-ui"
import { useRoute, useState } from '#app';
import { watch, ref } from 'vue'; 

const route = useRoute()
const hydrationFailed = useState('hydration-failed', () => false)
const state = ref(false)

watch(hydrationFailed, () => {
  if(hydrationFailed.value) {
    state.value = true
  
    $fetch('/_hydration_state', {
      method: 'post',
      body: {
        route: route.fullPath,
        hydrationFailed: true
      }
    })
  }
})
</script>

<style>
#nuxt-hydration-container {
  border: rgb(236, 115, 115);
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>