<template>
  <div>
    {{ num }}
  </div>
</template>

<script setup>
let num = 5

if(process.client) {
  num = 6
}
</script>
