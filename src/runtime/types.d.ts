import { Result } from "html-validate";
import {Hookable} from "hookable"
import { HookResult } from "@nuxt/schema";

declare module '#app' {
    interface RuntimeNuxtHooks {
        "nuxt-hydration:component-hydration": (failed: { path: string }[]) => HookResult
    }
}


export {};

declare global {
    interface Window {
        __NUXT_HYDRATION_HTMLVALIDATOR_REASON__?: Result[]
    }
}

