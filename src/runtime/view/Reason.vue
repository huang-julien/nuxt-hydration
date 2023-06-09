<template>
  <p>Reason: {{ reason.reason }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getHtmlValidatorReason } from '../client/reason/html-validator'

const reason = computed(() => {
  const reason = getHtmlValidatorReason() || { reason: 'unknown' }
  return reason
})
</script>
