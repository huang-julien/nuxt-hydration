# nuxt-hydration

:warning: This module is still under development :warning:

## Feature

- Make sure you are aware when there's a hydration issue
- `@nuxt/devtools` integration

## integrations
This module can be used alongside other modules to provide a better support to find hydration issues origins
### `@nuxtjs/html-validator`
- helps you to find html issues.

## Setup

1. Add `nuxt-hydration` as a dev dependency to your project
```
yarn add nuxt-hydration --dev # or npm install nuxt-hydration --save-dev
```
2. Add `nuxt-hydration` to the modules
Note: if you wish to have `@nuxtjs/html-validator` integration, `nuxt-hydration` must be declared before.

`nuxt.config.ts`
```ts
export default defineNuxtConfig({
  modules: ['nuxt-hydration', '@nuxtjs/html-validator']
})
```
