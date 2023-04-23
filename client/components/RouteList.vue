<template>
  <div>
    <div
      v-for="(failedTime, route) in routes"
      :key="route"
    >
      {{ route }}: {{ failedTime }}
    </div>    
  </div>
</template>

<script setup lang="ts">
defineProps<{
    routes: Record<string, number> 
}>()
</script>