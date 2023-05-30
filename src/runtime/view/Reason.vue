<template>
  <p>Reason: {{ reason }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const reason = computed(() => {
  if (window.__NUXT_HYDRATION_HTMLVALIDATOR_REASON__) { return 'Invalid HTML' }
  return 'unkwown'
})
</script>
