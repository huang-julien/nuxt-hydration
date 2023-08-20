<template>
  <Teleport to="body">
    <UseDraggable ref="draggable" storage-key="hydration-toggle-draggable" style="position: fixed;" :initial-value="stored">
      <button :style="hydrationFailed ? 'color: red;' : 'color: green;'" style="position: fixed;" :class="{pulse: hydrationFailed}" @click="state = !state">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M265.12 60.12a12 12 0 0 0-18.23 0C215.23 97.15 112 225.17 112 320c0 88.37 55.64 144 144 144s144-55.63 144-144c0-94.83-103.23-222.85-134.88-259.88ZM272 412a12 12 0 0 1-11.34-16a11.89 11.89 0 0 1 11.41-8A60.06 60.06 0 0 0 332 328.07a11.89 11.89 0 0 1 8-11.41A12 12 0 0 1 356 328a84.09 84.09 0 0 1-84 84Z" /></svg>
      </button>
    </UseDraggable>
    <HydrationAlert v-if="state" />
  </Teleport>
</template>

<script setup lang="ts">
import { UseDraggable } from '@vueuse/components'
import { ref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import HydrationAlert from './HydrationAlert.vue'
import { useState } from '#imports'

const draggable = ref<typeof UseDraggable | null>(null)

const storageKey = 'hydration-toggle-draggable'

const stored = useLocalStorage(storageKey, { x: 0, y: 0 })

const state = useState('hydration-alert-state', () => false)
const hydrationFailed = useState('hydration-failed', () => false)

watch(hydrationFailed, () => {
  if (hydrationFailed.value) {
    state.value = true
  }
}, { immediate: true })

</script>

<style scoped>

button {
  font-size: 1em;
  padding: 0.3em;
  background: transparent;
  border-radius: 10%;
  background-color: #fff;
  color: #343a40;
  border-radius: 0.2em;
box-shadow: 0 0 0 0 #343a40;
  cursor: pointer;
  border-radius: 50%;
}

button:hover {
  background-color: #e1e1e1;
}

.pulse {
position: relative;
border-radius: 50%;
animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
}

@keyframes pulse {to {box-shadow: 0 0 0 10px rgba(232, 76, 61, 0);}}
</style>
