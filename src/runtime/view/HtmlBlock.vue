
<template>
    <div class="wrapper">
        Html mismatch:
        <div v-html="highlightedHtml" />
    </div>
</template>

<script setup lang="ts">
import { codeToHtml, } from "shiki/bundle/web"

const props = defineProps<{
    html: string
}>()

const highlightedHtml = await codeToHtml(props.html, {
    lang: "html",
    themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
    },
})
</script>

<style scoped>
.wrapper {
    border: 2px solid #ff6969; 
    padding: 1rem;
    :deep(.shiki) {
        overflow: auto;
        min-height: 3rem;
    }
}
</style>