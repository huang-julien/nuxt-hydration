<template>
  <table class="w-full text-left">
    <thead
      class="border-b n-border-base"
    >
      <tr>
        <th>
          Route:
        </th>
        <th>
          hydration failed count:
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(failedTime, route) in routes"
        :key="route"
        class="hover:cursor-pointer hover:bg-white/25"
        @click="$emit('click:route', route)"
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
</template>

<script setup lang="ts">
defineProps<{
    routes: Record<string, number>
}>()

defineEmits<{(e: 'click:route', path: string): void }>()
</script>
