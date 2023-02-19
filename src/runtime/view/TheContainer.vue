<template>
  <div>
    <Transition name="fade">
      <ToastAlert 
        v-if="state" 
        @close="() => state = false"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import ToastAlert from './ToastAlert.vue';
import { useState } from '#app';
import { watch, ref } from 'vue'; 

const hydrationFailed = useState('hydration-failed', () => false)
const state = ref(false)

watch(hydrationFailed, () => {
  if(hydrationFailed.value) {
    state.value = true
  }
})
</script>
