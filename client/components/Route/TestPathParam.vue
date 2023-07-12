<template>
  <div class="flex">
    <div class="flex items-center pb-2">
      <template v-for="(p, index) of routeParts" :key="props.route + p + index">
        <span class="text-lg">/</span>
        <span
          v-if="!p.isParam"
          :placeholder="p.name"
          class="w-fit px-1"
        >
          {{ p.name }}
        </span>
        <ContentEditable
          v-else
          v-model="p.input"
          html-tag="span"
          border-base
          class="border my-auto mt-2 h-fit text-sm px-1 mx-1 rounded min-w-[15px] border-dashed"
          :placeholder="p.name"
        />
      </template>
      ? <ContentEditable
        v-model="query"
        placeholder="query"
        class="border my-auto mt-2 h-fit text-sm px-1 mx-1 rounded min-w-[15px] border-dashed"
      />
    </div>
    <slot :route-parts="routeParts" :is-testing="isTesting" :test-path="testRoute" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useTestHydration from '~/composables/useTestHydration'

const props = defineProps<{
    route: string
}>()

const { testPath, isTesting } = useTestHydration()

function getRoutePortion () {
  const splitted = props.route.substring(1).split('/')
  return splitted.map(s => ({
    isParam: s.startsWith(':'),
    name: s,
    input: ''
  }))
}

const routeParts = ref(getRoutePortion())

const query = ref('')

function testRoute () {
  const parts = routeParts.value.map(part => part.isParam ? part.input : part.name)

  testPath('/' + parts.join('/'), query.value)
}

</script>
