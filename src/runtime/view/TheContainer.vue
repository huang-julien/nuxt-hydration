<template>
  <div>
    <Transition name="fade">
      <div
        v-if="state"
        id="nuxt-hydration-warn"
        class="bg-red "
      >
        Hey ! there might be an issue with hydration ! Check your console or the devtools !

        <button
          @click="state = false"
        >
          Close
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore tsconfig
import { watch, ref } from 'vue'
import { useState } from '#imports'

const hydrationFailed = useState('hydration-failed', () => false)
const state = ref(false)

watch(hydrationFailed, () => {
  if (hydrationFailed.value) {
    state.value = true
  }
})
</script>

<style scoped>
#nuxt-hydration-container {
  background-color: rgb(255, 0, 0, 0.7);
  border-radius: 0.5em;
  color: white;
  position: fixed;
  top: 1em;
  right: 1em;
  padding: 1rem;
}

button {
  border: white 1px solid;
  padding: 0.3em;
  background: transparent;
  color: white;
  border-radius: 0.2em;
  cursor: pointer;
}
</style>
