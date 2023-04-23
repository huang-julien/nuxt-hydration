<template>
  <div class="m-5"> 
    <table class="w-full text-left"> 
      <thead 
        class="border-b n-border-base"
      >
        <tr>
          <th>
            Route:
          </th>
          <th>
            hydration failed time:
          </th>
        </tr>
      </thead> 
      <tbody>
        <tr
          v-for="(failedTime, route) in routes"
          :key="route"
        >
          <td>
            {{ route }}
          </td>
          <td>
            {{ failedTime }}
          </td>
        </tr>
      </tbody>
    </table>    
  </div>
</template>

<script setup lang="ts">
defineProps<{
    routes: Record<string, number> 
}>()
</script>