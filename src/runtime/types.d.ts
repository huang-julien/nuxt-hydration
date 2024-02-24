import { Result } from "html-validate";
import { Hookable } from "hookable"
import { HookResult } from "@nuxt/schema";


export {};

declare global {
    interface Window {
        __NUXT_HYDRATION_HTMLVALIDATOR_REASON__?: Result[]
    }
}

