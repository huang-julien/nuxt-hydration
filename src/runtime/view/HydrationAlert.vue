<template>
  <div id="nuxt-hydration-container" class="n-card n-card-base">
    <Transition name="fade">
      <div v-if="state" id="nuxt-hydration-warn">
        <div class="flex mb-5">
          <p class="text-xl font-bold">
            nuxt-hydration
          </p>
          <div class="flex gap-5 ml-auto">
            <NHButton title="toggle mismatched borders" class="rounded-full aspect-square w-8"
              @click="showComponent = !showComponent">
              <iconify-icon icon="mdi:eye" :style="showComponent && 'color: green;'"></iconify-icon>
            </NHButton>
            <NHButton title="close" class=" rounded-full aspect-square w-8" @click="state = false">
              <iconify-icon icon="akar-icons:cross"></iconify-icon>
            </NHButton>
          </div>
        </div>
        <div v-if="mismatchedComponents.length" class="grid grid-cols-2 gap-5">

          <div>
            <p>
              Hey ! there might be an issue with hydration !
            </p>
            <p>Check your console !</p>
            <p>Component mismatching: <br />
            <div class="mt-5 grid gap-5">
              <NHButton v-for="component in mismatchedComponents" 
              :class="{ 'bg-zinc-700': selected === component }"
                @click="selected = component">
                {{ component.name }}
              </NHButton>
            </div>
            </p>
          </div>


          <Suspense>
            <HtmlBlock v-if="selected" :html="selected.initialHtml" :node="selected.node" />
          </Suspense>

        </div>
        <p v-else>
          Everything's ok !
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useState } from '#imports'
import { ref } from 'vue'
import NHButton from "../components/NHButton.vue"
import { USESTATE_SHOW_KEY } from '../client/const'
import HtmlBlock from './HtmlBlock.vue';
import { useMismatchedComponents, type TMismatchedComponentInfo } from '../composables/component-hydration';

const state = useState('hydration-alert-state', () => false)
const showComponent = useState(USESTATE_SHOW_KEY, () => true)
const mismatchedComponents = useMismatchedComponents()

const selected = ref<TMismatchedComponentInfo | null>(null)
</script>

<style scoped> #nuxt-hydration-warn {
   background-color: #1f1f1f;
   font-family: 'Dm Sans', sans-serif;
   color: rgb(255, 255, 255);
   border-radius: 0.5em;
   position: fixed;
   top: 1em;
   right: 1em;
   padding: 1rem;
   left: 1em;
   box-shadow: 0px 0px 15px 6px rgba(0, 0, 0, 0.33);
 }


 p {
   margin: 0.2em 0;
 }
</style>
