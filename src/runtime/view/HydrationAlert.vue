<template>
  <div id="nuxt-hydration-container">
    <Transition name="fade">
      <div v-if="state" id="nuxt-hydration-warn">
        <p class="title">
          <b>nuxt-hydration</b>
        </p>
        <template v-if="hydrationFailed">
          <p>
            Hey ! there might be an issue with hydration ! Check your console or the devtools !
          </p>
          <Reason v-if="hydrationFailed" />
        </template>
        <p v-else>
          Everything's ok !
        </p>
        <div class="actions">
          <button title="toggle mismatched borders" class="rounded" @click="showComponent = !showComponent">
            <svg :style="showComponent && 'color: green;'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z" /></svg>
          </button>
          <button title="close" class="rounded" @click="state = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z" /></svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { USESTATE_SHOW_KEY } from '../client/const'
import Reason from './Reason.vue'
import { useState } from '#imports'

const hydrationFailed = useState('hydration-failed', () => false)
const state = useState('hydration-alert-state', () => false)
const showComponent = useState(USESTATE_SHOW_KEY, () => true)

watch(hydrationFailed, () => {
  if (hydrationFailed.value) {
    state.value = true
  }
})
</script>

<style scoped>
#nuxt-hydration-warn {
  background-color: #fff;
  color: #343a40;
  border-radius: 0.5em;
  position: fixed;
  top: 1em;
  right: 1em;
  padding: 1rem;
  left:1em;
  box-shadow: 0px 0px 15px 6px rgba(0,0,0,0.33);
}

.title {
  font-size: 1.5em;
}

p {
  margin: 0.2em 0;
}

button {
  padding: 0.3em;
  background: transparent;
  border-radius: 10%;
  background-color: #fff;
  color: #343a40;
  border-radius: 0.2em;
  cursor: pointer;
}

button:hover {
  background-color: #e1e1e1;
  transition: all 0.2s ease-in-out;
}

button.rounded{
  border-radius: 50%;
  width: 2em;
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions {
  display: flex;
  gap: 0.5em;
  width: 100%;
}
</style>
