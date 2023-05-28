import { Result } from "html-validate";

export {};

declare global {
    interface Window {
        __NUXT_HYDRATION_HTMLVALIDATOR_REASON__?: Result[]
    }
}