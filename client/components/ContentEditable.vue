<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

const model = defineModel<string>({ required: true })

withDefaults(defineProps<{
    placeholder?: string
    htmlTag?: string
  }>(), { htmlTag: 'div' })

const element = ref<HTMLDivElement|null>(null)
const selected = ref(false)

async function validate (e: KeyboardEvent) {
  await nextTick()
  model.value = (e.target as HTMLDivElement).innerText.trim() + e.key || ''
}

defineExpose({ element })
async function onSelect () {
  selected.value = true
  await nextTick()
  element.value?.focus()
}

onMounted(() => {
  if (model.value && element.value) {
    element.value!.innerHTML = model.value
  }
})
</script>

<template>
  <Component
    :is="htmlTag"
    v-if="!selected && !model && placeholder"
    class="text-grey"
    @click="onSelect"
  >
    {{ placeholder }}
  </Component>

  <Component
    :is="htmlTag"
    v-else
    ref="element"
    contenteditable
    spellcheck="false"
    @keypress="validate"
    @blur="selected = false"
  />
</template>
