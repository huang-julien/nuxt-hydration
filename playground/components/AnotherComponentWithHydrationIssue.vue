<template>
    <div>
      {{ num }}
      <div>
        this component has some hydration issues...
      </div>
      <p>
        Please drink water
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  let num = 4
  
  if (process.client) {
    num = 9
  }
  </script>
  