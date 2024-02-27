
<template>
    <div class="wrapper flex flex-col border border-zinc-600 border-solid rounded-md">
        SSR rendered HTML mismatch:
        <div v-html="highlightedHtml" class="h-full" />
    </div>
</template>

<script setup lang="ts">
import { getHighlighter } from "shiki/bundle/web"
import { computedAsync } from "@vueuse/core";
 
const props = defineProps<{
    html: string
}>()

const highlighter = await getHighlighter({
    langs: ['html', 'css', 'js'],
    themes: ['github-dark', 'github-light'],
})

const highlightedHtml = computedAsync(async () => {
    return await highlighter.codeToHtml(props.html, {
        lang: 'html',
        theme: 'github-dark'
    })
}) 
</script>

<style scoped>
.wrapper {
    padding: 1rem;

    :deep(.shiki) {
        overflow: auto;
        min-height: 3rem;
        height:100%;
    }
}
</style>