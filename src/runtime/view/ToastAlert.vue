<template>
  <div class="toast">
    Hey ! Looks like there's an hydration issue when you loaded the app ! Please check your console.
    <button @click="$emit('close')">
      close
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
    (e: 'close'): void
}>()
</script>

<style>
.toast {
    background-color: red;
    color: white;
    border-radius: 10px;
    padding: 10px;
    position: fixed;
    top: 10;
}
</style>