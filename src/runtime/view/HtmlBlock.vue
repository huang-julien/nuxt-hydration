
<template>
    <div class="wrapper flex flex-col border border-zinc-600 border-solid rounded-md">
        SSR rendered HTML mismatch:
        <div v-html="highlightedHtml" class="h-full" />
    </div>
</template>

<script setup lang="ts">
import { getHighlighter } from "shiki/bundle/web"
import { computedAsync } from "@vueuse/core";
// @ts-ignore
import beautify from "js-beautify/js/src/html/index"

const props = defineProps<{
    html: string
}>()

const highlighter = await getHighlighter({
    langs: ['html', 'css', 'js'],
    themes: ['github-dark', 'github-light'],
})

const highlightedHtml = computedAsync(async () => {
    return await highlighter.codeToHtml(beautify(props.html, {
        "indent_size": "2",
        "indent_char": " ",
        "max_preserve_newlines": "1",
        "preserve_newlines": true,
        "keep_array_indentation": false,
        "break_chained_methods": false,
        "indent_scripts": "normal",
        "brace_style": "expand",
        "space_before_conditional": true,
        "unescape_strings": false,
        "jslint_happy": false,
        "end_with_newline": true,
        "wrap_line_length": "160",
        "indent_inner_html": false,
        "comma_first": false,
        "e4x": false,
        "indent_empty_lines": false
    }), {
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