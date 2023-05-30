<template>
  <table>
    <thead>
      <tr>
        <th>
          possible reason
        </th>
        <th>
          details
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(reason, index) in reasons" :key="'reason_' + route + index">
        <td>
          {{ reason.reason }}
        </td>
        <td>
          <ul>
            <li v-for="(detail, key) in reason.details" :key="'reason_' + route + index + key">
              {{ detail.message }}
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { Reason } from '~/../src/runtime/devtools/types'

defineProps<{
    reasons: Reason[],
    route: string
}>()
</script>
