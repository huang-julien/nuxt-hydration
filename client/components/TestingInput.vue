<template>
  <div flex gap-2>
    <NButton :disabled="isTesting" @click="test">
      <span v-if="!isTesting">
        Test
      </span>
      <Icon v-else name="line-md:loading-twotone-loop" />
    </NButton>
    <NTextInput v-model="text">
      <template #icon>
        <NButton rounded-xl p-1 @click="reset">
          <Icon name="maki:cross-11" />
        </NButton>
      </template>
    </NTextInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useTestHydration from '~/composables/useTestHydration'

const text = ref('')

const { isTesting, testPath } = useTestHydration()

function reset () {
  text.value = ''
}

function test () {
  const path = text.value.startsWith('/') ? text.value : '/' + text.value
  testPath(path)
}
</script>
